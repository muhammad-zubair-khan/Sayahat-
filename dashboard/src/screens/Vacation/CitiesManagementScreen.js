import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./CitiesManagementScreen.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVacationProduct,
  getVacationProductsBySlug,
} from "../../Redux/Actions/vacationProductAction";
import { createHotel, getHotelBySlug } from "../../Redux/Actions/hotelAction";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from "@mui/material/FormLabel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const CitiesManagementScreen = (props) => {
  const history = useHistory();
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pool, setPool] = useState("");

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.vacationProduct);
  console.log(products);
  //   useEffect(() => {
  //     const { match } = props;
  //   console.log(props);
  // }, [dispatch, props]);
  useEffect(() => {
    const { match } = props;
    console.log(props);
    dispatch(getAllVacationProduct());
    dispatch(getHotelBySlug(match.params.slug));
  }, [dispatch, props]);

  const [hotelHidden, setHotelHidden] = useState(true);
  const handleShowHotel = () => {
    setHotelHidden((is) => !is);
    setCarHidden(false);
    setPackageHidden(false);
  };
  const [carHidden, setCarHidden] = useState(false);
  const handleShowCar = () => {
    setCarHidden((is) => !is);
    setHotelHidden(false);
    setPackageHidden(false);
  };
  const [packageHidden, setPackageHidden] = useState(false);
  const handleShowPackage = () => {
    setPackageHidden((is) => !is);
    setHotelHidden(false);
    setCarHidden(false);
  };
  const [hotelImage, setHotelImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  // const createHotelImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setHotelImages([]);
  //   setImagesPreview([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setHotelImages((old) => [...old, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  const onChangeFile = (e) => {
    setHotelImages(e.target.files[0]);
  };

  const createHotelSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    console.log(name);

    myForm.set("description", description);
    console.log(description);

    myForm.set("city", city);
    console.log(city);

    myForm.set("category", category);
    console.log(category);

    myForm.set("pool", pool);
    console.log(pool);

    myForm.append("hotelImage", hotelImage);
    console.log(hotelImage);

    dispatch(createHotel(myForm));
    // console.log(createProduct(myForm));
    history.push(`/all-hotels/${props.match.params.slug}`);
  };
  return (
    <>
      <Sidebar>
        <Header />
        <Link
          to={`/all-hotels/${props.match.params.slug}`}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "36px",
          }}
        >
          <Button variant="contained">View All Hotels</Button>
        </Link>
        <Grid
          container
          spacing={2}
          className="mt-4"
          style={{ justifyContent: "center" }}
        >
          <Grid style={{ margin: "9px 10px" }}>
            <Item>
              <Button onClick={handleShowHotel}>Hotels</Button>
            </Item>
          </Grid>
          <Grid style={{ margin: "9px 10px" }}>
            <Item>
              <Button onClick={handleShowCar}>Cars</Button>
            </Item>
          </Grid>
          <Grid style={{ margin: "9px 10px" }}>
            <Item>
              <Button onClick={handleShowPackage}>Packages</Button>
            </Item>
          </Grid>
        </Grid>

        {hotelHidden ? (
          <div className="dashboard">
            <span className="hotel-arrow hotel-up"></span>
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={createHotelSubmitHandler}
              >
                <h1>Add New Hotel</h1>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    // disabled
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Hotel Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="City"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {products &&
                        products.map((data, index) => {
                          return (
                            <MenuItem value={data._id} key={index}>
                              {data.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Box>
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Pool"
                      value={pool}
                      onChange={(e) => setPool(e.target.value)}
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Breakfast"
                    />
                    <FormControlLabel control={<Checkbox />} label="Hot tub" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="FullyRefundable"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Reserve Now, pay later"
                    />
                  </FormGroup>
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
                <div id="createProductFormFile">
                  <TextField
                    id="outlined-basic"
                    required
                    // label="Outlined"
                    variant="outlined"
                    type="file"
                    onChange={onChangeFile}
                    name="hotelImage"
                    inputProps={{
                      multiple: false,
                    }}
                  />
                </div>
                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  // disabled={loading ? false : true}
                >
                  Add
                </Button>
              </form>
            </div>
          </div>
        ) : null}
        {carHidden ? (
          <div className="dashboard">
            <span className="car-arrow car-up"></span>
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                //   onSubmit={createProductSubmitHandler}
              >
                <h1>Add New Car</h1>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Car Name"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    id="outlined-number"
                    fullWidth
                    label="Passengers"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Fare"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Mileage"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Pay at
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Now"
                      control={<Radio />}
                      label="Now"
                    />
                    <FormControlLabel
                      value="Later"
                      control={<Radio />}
                      label="Later"
                    />
                  </RadioGroup>
                </FormControl>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Shuttle"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Refund
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Non-refundable"
                      control={<Radio />}
                      label="Non-refundable"
                    />
                    <FormControlLabel
                      value="Free cancellation"
                      control={<Radio />}
                      label="Free cancellation"
                    />
                  </RadioGroup>
                </FormControl>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Discount"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <TextareaAutosize
                  // fullWidth
                    placeholder="Description here..."
                    required
                    id="outlined-required"
                    style={{ width: 1200, height: 100 }}
                    className="text-area"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div id="createProductFormFile">
                  <input
                    type="file"
                    // name="productPictures"
                    // name="products"
                    // accept="image/*"
                    accept="image/*"
                    // onChange={createHotelImagesChange}
                    multiple
                  />
                </div>
                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  // disabled={loading ? false : true}
                >
                  Add
                </Button>
              </form>
            </div>
          </div>
        ) : null}
        {packageHidden ? (
          <div className="dashboard">
            <span className="package-arrow package-up"></span>
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                //   onSubmit={createProductSubmitHandler}
              >
                <h1>Add New Package</h1>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Package Name"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <TextareaAutosize
                    placeholder="Description here..."
                    required
                    id="outlined-required"
                    style={{ width: 1200, height: 100 }}
                    className="text-area"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div id="createProductFormFile">
                  <input
                    type="file"
                    // name="productPictures"
                    // name="products"
                    // accept="image/*"
                    accept="image/*"
                    // onChange={createHotelImagesChange}
                    multiple
                  />
                </div>
                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  // disabled={loading ? false : true}
                >
                  Add
                </Button>
              </form>
            </div>
          </div>
        ) : null}
      </Sidebar>
    </>
  );
};

export default CitiesManagementScreen;
