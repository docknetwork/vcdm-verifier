import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';

import {
  Icon,
  CircularProgress,
  Grid,
  Box,
  Paper,
  Modal,
  Typography,
  Button
} from '@material-ui/core';




// TODO: split into side-modal.js
function getModalStyle() {
  return {
    top: `0`,
    left: `100%`,
    height: '100vh',
    outline: 'none',
    transform: `translate(-100%, 0)`,
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

const SideModal = ({children, open, handleClose}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade direction="up" in={open}>
        <div style={modalStyle} className={classes.paper}>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};








import dock from '@docknetwork/sdk';
import { UniversalResolver } from '@docknetwork/sdk/resolver';

// Use universal resolver
const universalResolverUrl = 'https://uniresolver.io';
const resolver = new UniversalResolver(universalResolverUrl);

async function signAndVerify(credential) {
  const verifyResult = await credential.verify(resolver, true, true, { dock });
  console.log('verifyResult', verifyResult)
  if (verifyResult.verified) {
    return verifyResult;
  } else {
    throw verifyResult.error.errors;
  }
}

// TODO: modal transitoon
const VerifierModal = ({credential, open, handleClose}) => {
  const [isVerified, setIsVerified] = useState();
  const [verificationErrors, setVerificationErrors] = useState();

  console.log('credential', credential);

  async function startVerification(credential) {
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
    <SideModal {...{open, handleClose}}>
      {credential && (
        <>
          <Box p={3} bgcolor={false ? 'success.main' : 'background.default'}>
            <Typography variant="h6" gutterBottom>
              Alumni Of {credential.subject[0].alumniOf}
            </Typography>
            <Typography noWrap variant="subtitle1">
              Issued to {credential.subject[0].id}
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
              Expiration date: {credential.expirationDate}
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
    </SideModal>
  );
};

export default VerifierModal;
