import {
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup as MuiRadioGroup,
} from "@material-ui/core";
import React from "react";

const RadioGroup = (props) => {
  const { label, name, value, onChange, items } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => {
          return (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<Radio />}
              label={item.title}
            />
          );
        })}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
