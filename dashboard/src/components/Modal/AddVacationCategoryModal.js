import React from "react";
import ReusableModel from "./ResuableModel";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    onSubmit,
  } = props;
  return (
    <ReusableModel
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      onSubmit={onSubmit}
    >
      <TextField
        style={{ margin: "9px 3px" }}
        autoComplete="off"
        required
        id="outlined-required"
        label="Category Name"
        variant="outlined"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={parentCategoryId}
          label="Select Category"
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          {categoryList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      {/* 
      <input
        style={{ marginTop: "8px", width: "-webkit-fill-available" }}
        required
        type="file"
        name="categoryImage"
        onChange={handleCategoryImage}
      /> */}
    </ReusableModel>
  );
};

export default AddCategoryModal;
