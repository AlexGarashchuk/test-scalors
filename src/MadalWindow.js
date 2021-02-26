import React from "react";
import Backdrop from "@material-ui/core/Backdrop";

import { Modal, Button, TextField, FormControl } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "50%",
  },
  form: {
    display: "flex",
    marginTop: 15,
    flexDirection: "column",
    height: "80%",
    minHeight: "300px",
    "& .MuiFormControl-root": {
      margin: "10px 0",
    },
  },
  btnWrp: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      padding: "5px 35px",
      margin: "0 10px",
    },
  },
}));

function ModalWindow(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.openModalWindow}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <div>Edit Item</div>
          <FormControl className={classes.form}>
            <TextField
              id="standard-basic"
              label="Project Name"
              variant="outlined"
              value={props.modalData.projectName}
              name="projectName"
              onChange={props.handleChange}
            />
            <TextField
              id="standard-basic"
              label="Device"
              variant="outlined"
              name="device"
              value={props.modalData.device}
              onChange={props.handleChange}
            />
          </FormControl>

          <div className={classes.btnWrp}>
            <Button variant="contained" color="secondary" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.saveUpdatedData(props.modalData.id)}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalWindow;
