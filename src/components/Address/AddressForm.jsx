import { Grid } from "@material-ui/core";
import React from "react";
import { useForm, Form } from "../../hooks/useForm";
import Controls from "../controls/Controls";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];
const favItems = [
  { id: "apple", title: "Apple" },
  { id: "banana", title: "Banana" },
  { id: "orange", title: "Orange" },
];
const initialFValues = {
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  favFood: "",
  hireDate: new Date(),
  isPermanent: false,
};
const AddressForm = () => {
  const { values, handleChange } = useForm(initialFValues);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            onChange={handleChange}
            value={values.fullName}
          />
          <Controls.Input
            onChange={handleChange}
            label="Mobile"
            name="mobile"
            value={values.mobile}
          />
          <Controls.Input
            onChange={handleChange}
            label="Email"
            name="email"
            value={values.email}
          />
          <Controls.Input
            onChange={handleChange}
            label="City"
            name="city"
            value={values.city}
          />
        </Grid>
        <Controls.RadioGroup
          name="gender"
          label="Gender"
          value={values.gender}
          items={genderItems}
          onChange={handleChange}
        />
        <Controls.Select
          name="favFood"
          value={values.favFood}
          label="Fav Food"
          options={favItems}
          onChange={handleChange}
        />

        <Controls.DatePicker
          name="hireDate"
          value={values.hireDate}
          label="Hire Date"
          onChange={handleChange}
        />
        <Controls.CheckBox
          name="isPermanent"
          value={values.isPermanent}
          label="Is Permanent"
          onChange={handleChange}
        />
        <Controls.Button text="submit" onClick={() => {}} type="submit" />
        <Controls.Button
          text="reset"
          onClick={() => {}}
          type="reset"
          variant="secondary"
        />
      </Grid>
    </Form>
  );
};

export default AddressForm;
