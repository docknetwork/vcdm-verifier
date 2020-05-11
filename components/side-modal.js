import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Slide } from '@material-ui/core';

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
    maxWidth: 400,
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

export default SideModal;
