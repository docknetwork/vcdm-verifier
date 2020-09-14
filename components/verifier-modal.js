import React, { useState, useEffect } from 'react';
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
  Button,
} from '@material-ui/core';

// Import Dock SDK utils
import { DockResolver, MultiResolver, UniversalResolver } from '@docknetwork/sdk/resolver';
import { verifyCredential } from '@docknetwork/sdk/utils/vc';
import dock from '@docknetwork/sdk';

// Create the resolver
const universalResolverUrl = 'https://uniresolver.io';
const resolver = new MultiResolver({
  dock: new DockResolver(dock), // Prebuilt resolver
}, new UniversalResolver(universalResolverUrl));

// Hardcoded testnet node address for now, but provide config options later
const nodeAddress = 'wss://danforth-1.dock.io'; // ws://localhost:9944

async function verifyJSONObject(credential) {
  // Ensure we are connected to the node
  // if we cant connect, try verify anyway
  // not all credentials need a node connection to verify
  try {
    if (!dock.api || !dock.api.isConnected) {
      delete dock.api;
      await dock.init({
        address: nodeAddress
      });
    }
  } catch (e) {
    console.error('Connecting to node failed', e);
  }

  const verifyResult = await verifyCredential(credential, {
    resolver,
    compactProof: true,
    forceRevocationCheck: true,
    schemaApi: { dock },
    revocationApi: { dock }
  });

  if (verifyResult.verified) {
    return verifyResult;
  }
  throw verifyResult.error.errors;
}

function getSubjectString(credential) {
  let subject = 'No Subject';

  if (credential.credentialSubject) {
    const subjectKeys = Object.keys(credential.credentialSubject);
    subjectKeys.splice(subjectKeys.indexOf('id'), 1);

    if (subjectKeys.length) {
      subject = credential.credentialSubject[subjectKeys[0]];
      if (subject !== 'string') {
        subject = subject.name || JSON.stringify(subject);
      }
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
              {getSubjectString(credential)}
            </Typography>
            <Typography noWrap variant="subtitle1">
              Issued to {credential.credentialSubject && credential.credentialSubject.id}
            </Typography>
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

            <Typography variant="body2" noWrap gutterBottom>
              Expiration date: {credential.expirationDate || 'N/A'}
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
                    {error.stack || error.name}
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
