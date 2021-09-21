import React, { useState, useEffect } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import axios from 'axios';

import {
  CircularProgress,
  Grid,
  Box,
  Typography,
  Button,
} from '@material-ui/core';


async function verifyJSONObject(json) {
  const verifyResult = await axios.post(`api/verify/`, json);

  if (!verifyResult) {
    throw new Error('No presentation or credential provided');
  }

  if (verifyResult.data.verified) {
    return verifyResult;
  }

  if (verifyResult.data.results) {
    throw verifyResult.data.results.error || verifyResult.data.results;
  }

  throw "Invalid credential";
}

function getSubjectString(credential) {
  let subject = 'No Subject';
  const credentialSubject = credential.credentialSubject && (
    credential.credentialSubject.length ? credential.credentialSubject[0] : credential.credentialSubject
  );

  if (credentialSubject) {
    const subjectKeys = Object.keys(credentialSubject);
    subjectKeys.splice(subjectKeys.indexOf('id'), 1);

    if (subjectKeys.length) {
      subject = credentialSubject[subjectKeys[0]];
      if (subject !== 'string') {
        subject = subject.name || JSON.stringify(subject);
      }
    } else if (credentialSubject.id) {
      subject = credentialSubject.id;
    }
  }

  return subject;
}

const VerifierModal = ({ credential, handleClose }) => {
  const [isVerified, setIsVerified] = useState();
  const [verificationErrors, setVerificationErrors] = useState();

  async function startVerification(credential) {
    try {
      await verifyJSONObject(credential);
      setIsVerified(true);
    } catch (errors) {
      console.error('Verification failed: ', errors);
      if (errors) {
        setVerificationErrors(errors.length ? errors : [errors]);
      }
      setIsVerified(false);
    }
  }

  useEffect(() => {
    if (credential) {
      setIsVerified(null);
      setVerificationErrors(null);
      startVerification(credential);
    }
  }, [credential]);

  const isPresentation = credential && credential.verifiableCredential;
  return (
    <>
      {credential && (
        <>
          <Box p={3} bgcolor={false ? 'success.main' : 'background.default'}>
            <Typography variant="h6" gutterBottom>
              {isPresentation ? 'Presentation' : getSubjectString(credential)}
            </Typography>
            {!isPresentation && credential.credentialSubject && credential.credentialSubject.id && (
              <Typography noWrap variant="subtitle1">
                Issued to {credential.credentialSubject && credential.credentialSubject.id}
              </Typography>
            )}
          </Box>
          <Box p={3}>
            {credential.issuer && (
              <Typography variant="body2" noWrap gutterBottom>
                Issuer: {JSON.stringify(credential.issuer)}
              </Typography>
            )}

            {credential.type && (
              <Typography variant="body2" noWrap gutterBottom>
                Type: {JSON.stringify(credential.type)}
              </Typography>
            )}

            {credential.proof && (
              <Typography variant="body2" noWrap gutterBottom>
                Proof type: {credential.proof.type}<br />
                Proof date: {credential.proof.created}
              </Typography>
            )}

            {credential.issuanceDate && (
              <Typography variant="body2" noWrap gutterBottom>
                Issue date: {credential.issuanceDate}
              </Typography>
            )}

            {credential.expirationDate && (
              <Typography variant="body2" noWrap gutterBottom>
                Expiration date: {credential.expirationDate}
              </Typography>
            )}

            <br />

            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center">
              <Grid item xs={2}>
                {isVerified === true ? (
                  <CheckCircleIcon color="primary" style={{
                    width: '54px',
                    height: '54px',
                    transform: 'translate(-5px, 0)',
                  }} />
                ) : (
                  isVerified === false ? (
                    <ErrorIcon color="error" style={{
                      width: '54px',
                      height: '54px',
                      transform: 'translate(-5px, 0)',
                    }} />
                  ) : (
                    <div style={{
                      paddingBottom: '5px',
                      paddingTop: '4px',
                    }}>
                      <CircularProgress thickness={4} size={45} />
                    </div>
                  )
                )}
              </Grid>
              <Grid item xs={10}>
                {isVerified === true ? (
                  <Typography variant="body1">
                    Verified
                  </Typography>
                ) : (
                  isVerified === false ? (
                    <Typography variant="body1">
                      Credential is not valid
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      Verifying the credential...
                    </Typography>
                  )
                )}
              </Grid>
            </Grid>

            <br />

            {isVerified === false && (
              verificationErrors.map((error, index) => (
                <Box
                  bgcolor="error.light"
                  color="error.dark"
                  p={2}
                  key={index}>
                  <Typography
                    component="pre"
                    variant="body2"
                    gutterBottom
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                    }}>
                    {error.stack || error.name || error.error}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
          {isVerified && (
            <Box p={3} style={{
              marginTop: 'auto',
            }}>
              <Button
                endIcon={<ArrowForwardIcon />}
                variant="contained"
                onClick={handleClose}
                fullWidth>
                Verify another credential
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default VerifierModal;
