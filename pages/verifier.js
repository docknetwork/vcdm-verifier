import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

import VerifiableCredential from '@docknetwork/sdk/verifiable-credential';
import VerifierModal from '../components/verifier-modal';
import SideModal from '../components/side-modal';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  container: {
    justifyContent: 'center',
    height: '0',
    position:'relative',
    width: '90%'
  },
  dropzone: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: 'auto',
    height: '4em',
    width: '100%',
  },
  textInput: {
    border: 0,
    borderRadius: 3,
    color: 'black',
    width: '80%',
    position: 'absolute',
    top: '10em',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  dropzoneText: {
    padding: '5%',
    fontSize: 12
  },
  submitButton: {
    float: 'right'
  }
});

const exampleCredential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "https://example.com/credentials/1872",
  "type": [
    "VerifiableCredential",
    "AlumniCredential"
  ],
  "issuanceDate": "2020-04-15T09:05:35Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": "Example University"
  },
  "issuer": "https://gist.githubusercontent.com/lovesh/312d407e3a16be0e7d5e43169e824958/raw",
  "proof": {
    "type": "EcdsaSecp256k1Signature2019",
    "created": "2020-04-15T09:22:48Z",
    "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..MEQCIHiIBMBw1szt6Y_ksb0rRiEZuAkG3BNXdt6UC_LpFlOfAiAkQktaxOPtfuiTXMsWRv92qvwFubs4Sn5hH4E_arwohA",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://gist.githubusercontent.com/lovesh/67bdfd354cfaf4fb853df4d6713f4610/raw"
  }
};


const Index = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    json: exampleCredential,
    text: JSON.stringify(exampleCredential, null, 2)
  });
  const handleChange = event => {
    // TODO: if it is a URL fetch it first.
    const newState = {
      json: JSON.parse(event.target.value),
      text: event.target.value,
    };

    setState(newState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleVerify(e) {
    e.preventDefault();

    setOpen(true);
  }

  return (
    <>
      <form onSubmit={handleVerify}>
        <div className={classes.container}>
          <DropzoneArea
              acceptedFiles={[".json"]}
              filesLimit={1}
              dropzoneText={<><u>Choose JSON file</u> (you can also drag & drop your file).<br/></>}
              dropzoneParagraphClass={classes.dropzoneText}
              onDrop={async ([file]) => {
                var reader = new FileReader();
                reader.onload = function(e) {
                  var contents = JSON.parse(e.target.result);
                  console.log(contents);
                  setState({json: contents, text: JSON.stringify(contents, null, 2)});
                  handleVerify(e)
                };
                reader.readAsText(file);
              }}
              showPreviews={false}
              showPreviewsInDropzone={false}
              showAlerts={false}
              rows={1}
              dropzoneClass={classes.dropzone}
          />

          <br />

          <TextField
              name="json"
              onChange={handleChange}
              fullWidth
              required
              multiline={true}
              rowsMax={10}
              rows={1}
              value={state.text}
              className={classes.textInput}
              placeholder={"Credential URL or JSON"}
          />

          <Button
            className={classes.submitButton}
            variant={'outlined'}
            type={'submit'}
            disabled={!state.json}
          >
            Verify
          </Button>
          <br />
        </div>


      </form>
      <SideModal {...{open, handleClose}}>
        <VerifierModal {...{handleClose, credential: open && state.json}} />
      </SideModal>
    </>
  );
};

export default Index;
