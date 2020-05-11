import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import {
  Icon,
  CircularProgress,
  Grid,
  Box,
  Paper,
  Typography,
  Button
} from '@material-ui/core';

import dock from '@docknetwork/sdk';
import { UniversalResolver } from '@docknetwork/sdk/resolver';
import {verifyCredential} from "@docknetwork/sdk/utils/vc";

// Use universal resolver
const universalResolverUrl = 'https://uniresolver.io';
const resolver = new UniversalResolver(universalResolverUrl);

async function signAndVerify(credential) {
  const verifyResult = await verifyCredential(credential, resolver, true, true, { dock });
  console.log('verifyResult', verifyResult)
  if (verifyResult.verified) {
    return verifyResult;
  } else {
    throw verifyResult.error.errors;
  }
}

function getSubject(credential) {
  let subject = 'No Subject';

  const subjectKeys = Object.keys(credential.credentialSubject);
  subjectKeys.splice(subjectKeys.indexOf('id'), 1);

  if (subjectKeys.length) {
    subject = credential.credentialSubject[subjectKeys[0]];
  }

  return subject;
}

const VerifierModal = ({credential, handleClose}) => {
  const [isVerified, setIsVerified] = useState();
  const [verificationErrors, setVerificationErrors] = useState();

  async function startVerification(credential) {
   console.log('startVerification', credential);
    try {
      await signAndVerify(credential);
      setIsVerified(true);
    } catch (errors) {
      console.error('Verification failed: ', errors)
      setVerificationErrors(errors.length ? errors : [errors]);
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

  return (
    <>
      {credential && (
        <>
          <Box p={3} bgcolor={false ? 'success.main' : 'background.default'}>
            <Typography variant="h6" gutterBottom>
              {getSubject(credential)}
            </Typography>
            <Typography noWrap variant="subtitle1">
              Issued to {credential.credentialSubject.id}
            </Typography>
          </Box>
          <Box p={3}>
            <Typography variant="body2" noWrap gutterBottom>
              Issuer: {credential.issuer}
            </Typography>

            <Typography variant="body2" noWrap gutterBottom>
              Type: {JSON.stringify(credential.type)}
            </Typography>

            <Typography variant="body2" noWrap gutterBottom>
              Proof type: {credential.proof.type}<br />
              Proof date: {credential.proof.created}
            </Typography>

            <Typography variant="body2" noWrap gutterBottom>
              Issue date: {credential.issuanceDate}
            </Typography>

            <Typography variant="body2" noWrap gutterBottom>
              Expiration date: {credential.expirationDate || "N/A"}
            </Typography>

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
                    transform: 'translate(-5px, 0)'
                  }} />
                ) : (
                  isVerified === false ? (
                    <ErrorIcon color="error" style={{
                      width: '54px',
                      height: '54px',
                      transform: 'translate(-5px, 0)'
                    }} />
                  ) : (
                    <div style={{
                      paddingBottom: '5px',
                      paddingTop: '4px'
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
              verificationErrors.map(error => (
                <Box
                  bgcolor="error.light"
                  color="error.dark"
                  p={2}>
                  <Typography
                    component="pre"
                    variant="body2"
                    gutterBottom
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word'
                    }}>
                    {error.stack || error.name}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
          {isVerified && (
            <Box p={3} style={{
              marginTop: 'auto'
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
