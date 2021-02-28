import React, { useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";

import {
  Modal,
  Button,
  TextField,
  FormControl,
  Chip,
  Paper,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: "10px 0",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
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
  const {
    modalData,
    saveUpdatedData,
    openModalWindow,
    handleClose,
    handleChange,
  } = props;
  const classes = useStyles();
  const [chipDataDevices, setChipDataDevises] = React.useState([]);
  const [chipDataUsers, setChipDataUsers] = React.useState([]);

  useEffect(() => {
    setChipDataDevises(modalData.devices);
    setChipDataUsers(modalData.users);
  }, [modalData.devices, modalData.users]);

  const handleDeleteDevices = (chipToDelete) => () => {
    setChipDataDevises(
      chipDataDevices.filter(
        (chip) => chip.serialNumber !== chipToDelete.serialNumber
      )
    );
  };

  const handleDeleteUsers = (chipToDelete) => () => {
    setChipDataUsers(
      chipDataUsers.filter((chip) => chip.firstName !== chipToDelete.firstName)
    );
  };

  const saveUpdatedCurrentData = () => {
    saveUpdatedData(modalData.id, chipDataDevices, chipDataUsers);
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openModalWindow}
        onClose={handleClose}
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
              value={modalData.projectName}
              name="projectName"
              onChange={handleChange}
            />
            {chipDataDevices.length > 0 && (
              <Paper component="ul" className={classes.root}>
                {chipDataDevices &&
                  chipDataDevices.map((i, idx) => (
                    <li key={idx}>
                      <Chip
                        label={i.serialNumber}
                        onDelete={
                          modalData.label === "React"
                            ? undefined
                            : handleDeleteDevices(i)
                        }
                        className={classes.chip}
                      />
                    </li>
                  ))}
              </Paper>
            )}
            {chipDataUsers.length > 0 && (
              <Paper component="ul" className={classes.root}>
                {chipDataUsers &&
                  chipDataUsers.map((i, idx) => (
                    <li key={idx}>
                      <Chip
                        label={`${i.firstName} ${i.lastName}`}
                        onDelete={
                          modalData.label === "React"
                            ? undefined
                            : handleDeleteUsers(i)
                        }
                        className={classes.chip}
                      />
                    </li>
                  ))}
              </Paper>
            )}
          </FormControl>

          <div className={classes.btnWrp}>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={saveUpdatedCurrentData}
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
