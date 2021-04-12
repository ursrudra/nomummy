import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "100%",
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography variant="caption" align="center">
        &copy; nomummy.com
      </Typography>
    </footer>
  );
};

export default Footer;
