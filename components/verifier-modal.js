import React, {useState} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import { Icon, CircularProgress, Grid, Box, Paper, Modal, Typography, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
  return {
    top: `0`,
    left: `100%`,
    height: '100vh',
    outline: 'none',
    transform: `translate(-100%, 0)`,
    display: 'flex',
    flexDirection: 'column',
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

// TODO: modal transitoon
const VerifierModal = ({credential, open, handleClose}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [isVerified, setIsVerified] = useState();

  console.log('credential', credential);

  setTimeout(() => {
    setIsVerified(true);
  }, 3000);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Box p={3} bgcolor={false ? 'success.main' : 'background.default'}>
          <Typography variant="h6" gutterBottom>
            Laboratory Lubricant Analyst
          </Typography>
          <Typography variant="subtitle1">
            Issued to Charlie C. Starling
          </Typography>
        </Box>
        <Box p={3}>
          <Typography variant="body2" gutterBottom>
            Issuer: International Council for Machinery Lubrication
          </Typography>

          <Typography variant="body2" gutterBottom>
            Issue date: 2020-02-19T15:19:29.821072+00:00
          </Typography>

          <Typography variant="body2" gutterBottom>
            Expiration date: 11/15/2021
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
                  <Icon>
                    <ErrorIcon color="danger" />
                  </Icon>
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
        </Box>

        <Box p={3} style={{
          marginTop: 'auto'
        }}>
          <Button variant="contained" color="primary" fullWidth>
            Verify another credential
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default VerifierModal;
