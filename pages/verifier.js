import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

import VerifiableCredential from '@docknetwork/sdk/verifiable-credential';
import VerifierModal from '../components/verifier-modal';
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Container from '@material-ui/core/Container';

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
    minHeight: '250px',
    width: '100%',
  },
  textInput: {
    border: 0,
    borderRadius: 3,
    margin: '20px 0 0 0',
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
    maxWidth: drawerWidth,
    width: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
    maxWidth: drawerWidth,
  },
}));

const Index = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    json: null,
    text: ''
  });

  const handleChange = event => {
    // TODO: if it is a URL fetch it first.

    let parsedJSON;
    const text = event.target.value;
    if (text) {
      try {
        parsedJSON = JSON.parse(text);
      } catch (e) {
        // TODO: show error that json is invalid
      }
    } else {
      setOpen(false);
    }

    const newState = {
      json: parsedJSON,
      text,
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
      <u>Choose JSON file</u> (or drag & drop your file)
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
        placeholder="Credential URL or JSON"
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
            />
            <br />
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              type="submit"
              disabled={!state.json}
            >
              Verify
            </Button>
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
