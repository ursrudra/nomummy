import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export const useForm = (initialFValues) => {
  const [values, setValues] = useState(initialFValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleChange,
  };
};

export function Form({ children }) {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off">
      {children}
    </form>
  );
}
