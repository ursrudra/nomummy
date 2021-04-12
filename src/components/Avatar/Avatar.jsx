import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "inline-block",
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    margin: 0,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  xlarge: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

export default function ImageAvatar({ size, url }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="Remy Sharp"
        src={url}
        className={
          size === "sm"
            ? classes.small
            : size === "md"
            ? classes.medium
            : size === "lg"
            ? classes.large
            : classes.xlarge
        }
      />
    </div>
  );
}
