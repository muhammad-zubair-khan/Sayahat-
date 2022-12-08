import React from "react";
import ReusableModel from "../Modal/ResuableModel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Row, Col } from "react-bootstrap";

const UpdateVacationCategoryModal = (props) => {
  const {
    size,
    handleClose,
    onSubmit,
    show,
    modalTitle,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
  } = props;
  return (
    <ReusableModel
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      size={size}
      modalTitle={modalTitle}
    >
      <Grid>
        <Grid item>
          <h6>Expanded Categories</h6>
        </Grid>
      </Grid>

      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <TextField
                style={{ margin: "9px 3px", width: "-webkit-fill-available" }}
                autoComplete="off"
                required
                id="outlined-required"
                label="Category Name"
                variant="outlined"
                value={item.name}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>

            <Col>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item.parentId}
                  label="Select Category"
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
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
            </Col>

            {/* <Col>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Type
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item.type}
                  onChange={(e) => handleCategoryInput('type',e.target.value,index,'expanded')}
                >
                  <MenuItem value="store">store</MenuItem>
                  <MenuItem value="product">product</MenuItem>
                  <MenuItem value="page">page</MenuItem>
                </Select>
              </FormControl>
            </Col> */}
          </Row>
        ))}

      <Grid>
        <Grid item>
          <h6>Checked Categories</h6>
        </Grid>
      </Grid>

      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <TextField
                style={{ margin: "9px 3px", width: "-webkit-fill-available" }}
                autoComplete="off"
                required
                id="outlined-required"
                label="Category Name"
                variant="outlined"
                value={item.name}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>

            <Col>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item.parentId}
                  label="Select Category"
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
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
            </Col>

            {/* <Col>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Type
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item.type}
                  onChange={(e) => handleCategoryInput('type',e.target.value,index,'checked')} 
                >
                  <MenuItem value="store">store</MenuItem>
                  <MenuItem value="product">product</MenuItem>
                  <MenuItem value="page">page</MenuItem>
                </Select>
              </FormControl>
            </Col> */}
          </Row>
        ))}

      {/* <input
                style={{ margin: "8px", width: "-webkit-fill-available" }}
                required
                type="file"
                name="categoryImage"
                onChange={handleCategoryImage}
              /> */}
    </ReusableModel>
  );
};

export default UpdateVacationCategoryModal;
