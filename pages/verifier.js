import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const defaultCert = {
  test: true
};

const VerifierModal = ({json, open, handleClose}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  console.log('json', json)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        hello world
      </div>
    </Modal>
  );
};

const Index = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    json: JSON.stringify(defaultCert),
    object: defaultCert
  });
  const handleChange = event => {
    const newState = {
      json: event.target.value,
    };

    try {
      newState['object'] = JSON.parse(event.target.value);
    } catch (e) {
      newState['object'] = null;
    }

    setState({
      ...state,
      ...newState,
    });
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
          rowsMax={4}
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

      <VerifierModal {...{open, handleClose, json: state.object}} />
    </>
  );
};

export default Index;
