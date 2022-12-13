import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../Redux/Actions/vacationProductAction";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { TextareaAutosize } from "@mui/material";

const AddNewCitites = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [productVacationPicture, setProductVacationPicture] = useState("");
  const category = useSelector((state) => state.Vacationcategory);

  // const { loading } = useSelector((state) => state.newVacation);
  // console.log(loading);

  const onChangeFile = (e) => {
    setProductVacationPicture(e.target.files[0]);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    // console.log(name);

    myForm.set("category", categoryId);
    // console.log(categoryId);

    myForm.set("description", description);
    // console.log(categoryId);

    myForm.append("productVacationPicture", productVacationPicture);

    dispatch(createProduct(myForm));

    history.push('/all-cities')
  };

  return (
    <>
      <Sidebar>
        <Header />
        <div className="dashboard">
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Add New City</h1>

              <div>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="City Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                {/* <AccountTreeIcon /> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Province
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    label="Select Province"
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {createCategoryList(category.categories).map(
                      (item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>

              <div>
                  <TextareaAutosize
                    placeholder="Description here..."
                    required
                    id="outlined-required"
                    style={{ width: 1200, height: 100 }}
                    className="text-area"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

              {/* {productPictures.length > 0
                ? productPictures.map((pic, item) => (
                    <div key={item}>{pic.name}</div>
                  ))
                : null} */}

              <div id="createProductFormFile">
                {/* <input
                  type="file"
                  // filename="productVacationPicture"
                  name="productVacationPicture"
                  onChange={onChangeFile}
                  // name="products"
                  // accept="image/*"
                  // accept="image/*"
                /> */}
                <TextField
                  id="outlined-basic"
                  required
                  // label="Outlined"
                  variant="outlined"
                  type="file"
                  onChange={onChangeFile}
                  name="productVacationPicture"
                  inputProps={{
                    multiple: false,
                  }}
                />
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                variant="contained"
                color="primary"
                // disabled={loading ? false : true}
                
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default AddNewCitites;
