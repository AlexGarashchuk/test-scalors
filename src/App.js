import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Button, ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";
import "./App.css";

import devices from "./data/device.json";
import projects from "./data/project.json";
import users from "./data/user.json";
import ModalWindow from "./MadalWindow.js";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
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

function App() {
  const classes = useStyles();
  const [currentProjects, setCurrentProjects] = useState(projects);
  const [currentDevices, setCurrentDevices] = useState(devices);
  const [currentUsers, setCurrentUsers] = useState(users);
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const [modalData, setModalData] = useState({
    id: "",
    projectName: "",
    devices: [],
    users: [],
  });

  const deleteProject = (itemId) => {
    setCurrentProjects(currentProjects.filter(({ id }) => id !== itemId));
  };

  const handleOpen = (item) => {
    let projectDevices = currentDevices.filter((i) => i.projectId === item.id);
    let projectUsers = currentUsers.filter((i) => i.projectId === item.id);

    setModalData({
      id: item.id,
      projectName: item.title,
      devices: projectDevices,
      users: projectUsers,
    });
    setOpenModalWindow(true);
  };

  const handleClose = () => {
    setOpenModalWindow(false);
  };

  const handleChange = (e) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });
  };

  const saveUpdatedData = (id, devices, users) => {
    const newState = [...currentProjects];
    newState.find((i) => i.id === id).title = modalData.projectName;
    setCurrentProjects(newState);
    setCurrentDevices(devices);
    setCurrentUsers(users);
    handleClose();
  };

  return (
    <div className="App">
      <h1>List of items</h1>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project name</TableCell>
              <TableCell align="right">Devices</TableCell>
              <TableCell align="right">Users</TableCell>
              <TableCell align="right">Date range</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProjects.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  <ListItem>{item.title}</ListItem>
                </TableCell>
                <TableCell align="right">
                  {currentDevices
                    .filter((i) => i.projectId === item.id)
                    .map((device, idx) => (
                      <ListItem
                        key={idx}
                        href="#simple-list"
                        button
                        component="a"
                      >
                        <ListItemText primary={device.serialNumber} />
                      </ListItem>
                    ))}
                </TableCell>
                <TableCell align="right">
                  {currentUsers
                    .filter((i) => i.projectId === item.id)
                    .map((user, idx) => (
                      <ListItem
                        key={idx}
                        href="#simple-list"
                        button
                        component="a"
                      >
                        <ListItemText
                          primary={`${user.firstName} ${user.lastName}`}
                        />
                      </ListItem>
                    ))}
                </TableCell>
                <TableCell align="right">
                  {new Date(item.beginDate).toLocaleDateString()} -{" "}
                  {new Date(item.expirationDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleOpen(item)} type="button">
                    Open Modal
                  </Button>

                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteProject(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openModalWindow && (
        <ModalWindow
          modalData={modalData}
          handleChange={handleChange}
          handleClose={handleClose}
          saveUpdatedData={saveUpdatedData}
          openModalWindow={openModalWindow}
        />
      )}
    </div>
  );
}

export default App;
