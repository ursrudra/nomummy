import {
  FormControlLabel,
  Checkbox as MuiCheckBox,
  FormControl,
} from "@material-ui/core";
import React from "react";

const CheckBox = (props) => {
  const { value, onChange, name, label } = props;

  const convertToDefaultEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckBox
            checked={value}
            onChange={(e) =>
              onChange(convertToDefaultEventParam(name, e.target.checked))
            }
            name={name}
            color="primary"
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default CheckBox;
