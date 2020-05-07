import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import VerifierModal from '../components/verifier-modal';


import VerifiableCredential from '@docknetwork/sdk/verifiable-credential';

const holderDID = 'did:dock:5FXqofpV7dsuki925U1dSzDvBuQbaci5yWTQGVWRQ7bdQP5p';
const issuerDID = 'did:dock:5FXqofpV7dsuki925U1dSzDvBuQbaci5yWTQGVWRQ7bdQP5p';

// Sample credential data
const credentialId = 'http://example.edu/credentials/1986';
const credentialContext = 'https://www.w3.org/2018/credentials/examples/v1';
const credentialType = 'AlumniCredential';
const credentialSubject = { id: holderDID, alumniOf: 'Example University' };
const credentialStatus = {
  id: 'rev-reg:dock:0x1dde82a39cf9e5b4aa8c967e012e9dccd2d28d9f5e41e5ed26247fcbd18c59ed',
  type: 'CredentialStatusList2017'
};
const credentialIssuanceDate = '2020-03-18T19:23:24Z';
const credentialExpirationDate = '2021-03-18T19:23:24Z';

// Sample cert (logic debug)
const sampleCert = new VerifiableCredential(credentialId);
sampleCert.addContext(credentialContext);
sampleCert.addType(credentialType);
sampleCert.addSubject(credentialSubject);
sampleCert.setStatus(credentialStatus);
sampleCert.setIssuanceDate(credentialIssuanceDate);
sampleCert.setExpirationDate(credentialExpirationDate);
sampleCert.proof = {
  type: 'Sr25519Signature2020',
  created: '2020-05-07T17:33:24Z',
  jws:
   'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..rW2_kqbptNvGBBoyCegMztzDDj1u9sQ5rmHKhqSl-bk18--qAkmJfEIRi28Qew_88PcspWU71L_8IiTWkQPCAg',
  proofPurpose: 'assertionMethod',
  verificationMethod: `${issuerDID}#keys-1`
 };
sampleCert.issuer = issuerDID;

// TODO: support VerifiableCredential.fromjson method
// { '@context':
//    [ 'https://www.w3.org/2018/credentials/v1',
//      'https://www.w3.org/2018/credentials/examples/v1' ],
//   credentialSubject:
//    [ { id: 'did:dock:5EZvZ91igZtG8sUwFAqHvHPyHemJ4D2pbs1HqmgGhucRziaU',
//        alumniOf: 'Example University' } ],
//   credentialStatus:
//    { id:
//       'rev-reg:dock:0x1dde82a39cf9e5b4aa8c967e012e9dccd2d28d9f5e41e5ed26247fcbd18c59ed',
//      type: 'CredentialStatusList2017' },
//   id: 'http://example.edu/credentials/1986',
//   type: [ 'VerifiableCredential', 'AlumniCredential' ],
//   issuanceDate: '2020-03-18T19:23:24Z',
//   expirationDate: '2021-03-18T19:23:24Z' }


// Default certificate data (logic debug)
const defaultCert = sampleCert.toJSON();

const Index = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    json: JSON.stringify(defaultCert, null, 2),
    object: sampleCert
  });
  const handleChange = event => {
    const newState = {
      json: event.target.value,
    };

    try {
      newState['object'] = JSON.parse(event.target.value);
      newState['object'] = sampleCert; // TODO: convert the json into VerifiableCredential object
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
        Enter some JSON and verify it
      </Typography>

      <br />
      <br />

      <form onSubmit={handleVerify}>
        <TextField
          name="json"
          label="JSON Credential"
          variant="outlined"
          placeholder="JSON Object..."
          onChange={handleChange}
          fullWidth
          required
          multiline
          rowsMax={16}
          rows={4}
          value={state.json}
        />

        <br />
        <br />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!state.object}
        >
          Verify
        </Button>
      </form>

      {open && (
        <VerifierModal {...{open, handleClose, credential: state.object}} />
      )}
    </>
  );
};

export default Index;
