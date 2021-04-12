import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";
import ImageAvatar from "../components/Avatar/Avatar";
import { Link, NavLink } from "react-router-dom";
import { Edit, Update, VerifiedUserRounded } from "@material-ui/icons";
import UploadImage from "../components/UploadImage/UploadImage";
import Addresses from "../components/Address/Addresses";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  },
  paper1: {
    padding: theme.spacing(4, 8),
    marginTop: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1, 2),
      marginTop: theme.spacing(1),
    },
  },
  row: {
    width: "100%",
  },
  col: {
    padding: theme.spacing(2, 10, 2, 0),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1.5, 1),
    },
    width: "60%",
  },
  btn: {
    width: "50%",
  },
  table: {
    marginBottom: theme.spacing(4),
  },
  title: {
    padding: theme.spacing(0, 0, 2, 0),
  },
  link: {
    padding: theme.spacing(2, 1),
    textDecoration: "none",
  },
}));

export default function Profile({ edit }) {
  const classes = useStyles();
  const { user, updateProfile, updateEmail } = useAuth();
  const { displayName, phoneNumber, email, emailVerified, photoURL } = user;
  const [editEmail, setEditEmail] = useState(false);
  const [input, setInput] = useState(null);
  const [emailInput, setEmail] = useState(null);
  const needToAdd = "- not added -";
  return edit ? (
    <div className={classes.root}>
      <Addresses />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <UploadImage url={photoURL} />
          {/*<ImageAvatar url={photoURL} size="xl" />*/}
          <ListItem>
            <ListItemText primary="Account" secondary="Rudra Kishore" />
          </ListItem>
          <Paper className={classes.paper} elevation={0}></Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper1}>
            <div className="page-profile">
              <div className="profile-card">
                <div className={classes.title}>
                  <Typography variant="h6">Profile Details</Typography>
                </div>
                <Divider />
                <table className={classes.table}>
                  <tbody>
                    <tr className={classes.row}>
                      <td className={classes.col}>Full Name</td>
                      <td className={classes.col} width="50%">
                        <input
                          type="text"
                          name="displayName"
                          defaultValue={displayName || ""}
                          onChange={(e) =>
                            setInput({ [e.target.name]: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Mobile Number</td>
                      <td className={classes.col}>
                        {phoneNumber || needToAdd}
                      </td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Email ID</td>
                      <td className={classes.col}>
                        {editEmail ? (
                          <input
                            type="text"
                            defaultValue={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        ) : (
                          email || needToAdd
                        )}
                        <IconButton onClick={() => setEditEmail(!editEmail)}>
                          <Edit />
                        </IconButton>

                        <IconButton onClick={() => updateEmail(emailInput)}>
                          <Update />
                        </IconButton>
                      </td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Gender</td>
                      <td className={classes.col}>MALE</td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Date of Birth</td>
                      <td className={classes.col}>09/05/1993</td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Location</td>
                      <td className={classes.col}>Bangalore</td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Alternate Mobile</td>
                      <td className={classes.col}></td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Hint Name</td>
                      <td className={classes.col}>- not added -</td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={() => updateProfile(input)}
                >
                  UPDATE
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <ImageAvatar url={photoURL} size="xl" />
          <ListItem>
            <ListItemText primary="Account" secondary="Rudra Kishore" />
          </ListItem>
          <Paper className={classes.paper} elevation={0}>
            <NavLink to="/seller/profile/address" className={classes.link}>
              Address
            </NavLink>
            <NavLink to="/seller/profile/address" className={classes.link}>
              Address 1
            </NavLink>
            <NavLink to="/seller/profile/address" className={classes.link}>
              Address 2
            </NavLink>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper1}>
            <div className="page-profile">
              <div className="profile-card">
                <div className={classes.title}>
                  <Typography variant="h6">Profile Details</Typography>
                </div>
                <Divider />
                <table className={classes.table}>
                  <tbody>
                    <tr className={classes.row}>
                      <td className={classes.col}>Full Name</td>
                      <td className={classes.col} width="50%">
                        {displayName || needToAdd}
                      </td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Mobile Number</td>
                      <td className={classes.col}>
                        {phoneNumber || needToAdd}
                      </td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Email ID</td>
                      <td className={classes.col}>{email || needToAdd}</td>
                      {emailVerified && <VerifiedUserRounded />}
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Gender</td>
                      <td className={classes.col}>MALE</td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Date of Birth</td>
                      <td className={classes.col}>09/05/1993</td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Location</td>
                      <td className={classes.col}>Bangalore</td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Alternate Mobile</td>
                      <td className={classes.col}></td>
                    </tr>
                    <tr className={classes.row}>
                      <td className={classes.col}>Hint Name</td>
                      <td className={classes.col}>- not added -</td>
                    </tr>
                  </tbody>
                </table>
                <Link to="/seller/profile/edit">EDIT</Link>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
