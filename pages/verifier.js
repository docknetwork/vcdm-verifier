import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

import VerifiableCredential from '@docknetwork/sdk/verifiable-credential';
import VerifierModal from '../components/verifier-modal';
import SideModal from '../components/side-modal';
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Container from '@material-ui/core/Container';

// import heroSVG from '../assets/hero.svg';

    // height: 740px;
    // background-image: url(https://uploads-ssl.webflow.com/5e97941…/5e97d8c…_hero-group.svg);
    // background-position: 100% 100%;
    // background-size: contain;
    // background-repeat: no-repeat;
    // background-attachment: scroll;

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  content: {
    justifyContent: 'center',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    paddingTop: '100px',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  dropzone: {
    transition: 'all 0.2s ease-in-out',
    background: theme.palette.background.paper,
    height: '400px',
    width: '100%',
  },
  textInput: {
    border: 0,
    borderRadius: 3,
    color: 'black'
  },
  dropzoneText: {
    padding: '2.5% 5%',
    fontSize: 12
  },
  submitButton: {
    float: 'right'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

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

  function handleTextareaClick(e) {
    e.stopPropagation();
  }

  const DropzoneContent = (
    <>
      <u>Choose JSON file</u> (you can also drag & drop your file).
      <br />
      <TextField
          name="json"
          onChange={handleChange}
          onClick={handleTextareaClick}
          fullWidth
          required
          multiline={true}
          rowsMax={10}
          rows={1}
          value={state.text}
          className={classes.textInput}
          placeholder={"Credential URL or JSON"}
      />
    </>
  );

  return (
    <>
      <div className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}>
        <Container maxWidth="md">
          <form onSubmit={handleVerify}>
          <DropzoneArea
             acceptedFiles={['application/json']}
              filesLimit={1}
              dropzoneText={DropzoneContent}
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
              showAlerts={true}
              rows={1}
              dropzoneClass={classes.dropzone}
          >



          </DropzoneArea>

          <br />

          <Button
            className={classes.submitButton}
            variant={'outlined'}
            type={'submit'}
            disabled={!state.json}
          >
            Verify
          </Button>
          <br />

        </form>
        </Container>
        </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <VerifierModal {...{handleClose, credential: open && state.json}} />
      </Drawer>
    </>
  );
};

export default Index;
