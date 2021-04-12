import React from "react";
import { Button as MuiButton } from "@material-ui/core";
const Button = (props) => {
  const {
    text,
    size = "large",
    color = "primary",
    variant = "contained",
    onClick,
    ...other
  } = props;
  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      {...other}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
