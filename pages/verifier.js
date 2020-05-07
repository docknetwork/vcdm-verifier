import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { DropzoneArea } from 'material-ui-dropzone';

import VerifiableCredential from '@docknetwork/sdk/verifiable-credential';
import VerifierModal from '../components/verifier-modal';

function fromJSON(json) {
  const credentialId = 'http://example.edu/credentials/1986';
  const cert = new VerifiableCredential(credentialId); // TODO: remove temp id when we support create with no ID

  cert.id = json.id; // TODO: use setId

  json.type.forEach(type => {
    cert.addType(type);
  });

  (json.credentialSubject || json.subject).forEach(subject => {
    cert.addSubject(subject);
  });

  json['@context'].forEach(context => {
    cert.addContext(context);
  });

  cert.setStatus(json.credentialStatus || json.status);
  cert.setIssuanceDate(json.issuanceDate);
  cert.setExpirationDate(json.expirationDate);

  if (json.proof) {
    cert.proof = json.proof; // TODO: setProof
  }

  if (json.issuer) {
    cert.issuer = json.issuer; // TODO: setIssuer
  }

  return cert;
}

const holderDID = 'did:dock:5FXqofpV7dsuki925U1dSzDvBuQbaci5yWTQGVWRQ7bdQP5p';
const issuerDID = 'did:dock:5FXqofpV7dsuki925U1dSzDvBuQbaci5yWTQGVWRQ7bdQP5p';

// Sample credential data
const sampleCertData = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1'
  ],
  credentialSubject: [{
    id: holderDID,
    alumniOf: 'Example University'
  }],
  credentialStatus: {
    id: 'rev-reg:dock:0x1dde82a39cf9e5b4aa8c967e012e9dccd2d28d9f5e41e5ed26247fcbd18c59ed',
    type: 'CredentialStatusList2017'
  },
  id: 'http://example.edu/credentials/1986',
  type: [ 'VerifiableCredential', 'AlumniCredential' ],
  issuanceDate: '2020-03-18T19:23:24Z',
  expirationDate: '2021-03-18T19:23:24Z',
  proof: { // this proof is invalid and fails verification
    type: 'Sr25519Signature2020',
    created: '2020-05-07T17:33:24Z',
    jws:
     'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..rW2_kqbptNvGBBoyCegMztzDDj1u9sQ5rmHKhqSl-bk18--qAkmJfEIRi28Qew_88PcspWU71L_8IiTWkQPCAg',
    proofPurpose: 'assertionMethod',
    verificationMethod: `${issuerDID}#keys-1`
  },
  issuer: issuerDID
};

// TODO: support VerifiableCredential.fromjson method
const sampleCert = fromJSON(sampleCertData);

const Index = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    json: JSON.stringify(sampleCertData, null, 2),
    object: sampleCert
  });
  const handleChange = event => {
    const newState = {
      json: event.target.value,
    };

    try {
      newState['object'] = fromJSON(JSON.parse(event.target.value));
    } catch (e) {
      newState['object'] = null;
    }

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
      <Typography variant="h5">
        Drop a Verifiable Credential to verify it
      </Typography>

      <br />
      <br />

      <form onSubmit={handleVerify}>
        <DropzoneArea
            acceptedFiles={[".json"]}
            filesLimit={1}
            dropzoneText={""}
            // onChange={handleChange(file)}
            onDrop={async ([file]) => {
              var reader = new FileReader();
              reader.onload = function(e) {
                var contents = JSON.parse(e.target.result);
                console.log(contents);
                setState({json: contents, object: null});
                handleVerify(e)
              };
              reader.readAsText(file);
            }}
            showPreviews={false}
            showPreviewsInDropzone={false}
            showAlerts={false}



        />

        <br />
        <br />
      </form>

      <VerifierModal {...{open, handleClose, credential: open && state.json}} />
    </>
  );
};

export default Index;
