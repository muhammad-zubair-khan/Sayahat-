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
import { addCar } from "../../Redux/Actions/carAction";
import { createPackage } from "../../Redux/Actions/packageAction";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const CitiesManagementScreen = (props) => {
  const history = useHistory();
  //Hotel States
  let [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pool, setPool] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [hotTub, setHotTub] = useState("");
  const [fullyRefundable, setFullyRefundable] = useState("");
  // const [reserveNow, setReserveNow] = useState("");

  //Car States
  const [carName, setCarName] = useState("");
  const [passenger, setPassenger] = useState("");
  const [fare, setFare] = useState("");
  const [type, setType] = useState("");
  const [mileage, setMileage] = useState("");
  const [payAt, setPayAt] = useState("");
  const [shuttle, setShuttle] = useState("");
  const [refund, setRefund] = useState("");
  const [discount, setDiscount] = useState("");
  const [desc, setDesc] = useState("");

  //Paclage States
  const [packageName,setPackageName] = useState("");
  const [packageDescription,setPackageDescription] = useState("");
  const [duration,setDuration] = useState("");
  const [refundable,setRefundable] = useState("");
  const [product,setProduct] = useState("");

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

  // }

  //Hotel Functions

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

    myForm.set("Breakfast", breakfast);
    console.log(breakfast);

    myForm.set("Hottub", hotTub);
    console.log(hotTub);

    myForm.set("FullyRefundable", fullyRefundable);
    console.log(fullyRefundable);

    // myForm.set("ReserveNow", reserveNow);
    // console.log(reserveNow);

    myForm.append("hotelImage", hotelImage);
    console.log(hotelImage);

    dispatch(createHotel(myForm));
    // console.log(createProduct(myForm));
    history.push(`/hotel/${props.match.params.slug}`);
  };
  //car functions
  const [carImage, setCarImage] = useState([]);
  const [carimagesPreview, setCarImagesPreview] = useState([]);
  const onChangeFileCar = (e) => {
    setCarImage(e.target.files[0]);
  };
  const onValueChange = (event) => {
    setPayAt(event.target.value);
  };
  const onValueChangeRefund = (event) => {
    setRefund(event.target.value);
  };

  const createCarSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", carName);
    console.log(carName);

    myForm.set("description", desc);
    console.log(desc);

    myForm.set("category", category);
    console.log(category);

    myForm.set("passenger", passenger);
    console.log(passenger);

    myForm.set("fare", fare);
    console.log(fare);

    myForm.set("type", type);
    console.log(type);

    myForm.set("mileage", mileage);
    console.log(mileage);

    myForm.set("refund", refund);
    console.log(refund);

    myForm.set("payAt", payAt);
    console.log(payAt);

    myForm.set("shuttle", shuttle);
    console.log(shuttle);

    myForm.set("discount", discount);
    console.log(discount);

    myForm.append("carImage", carImage);
    console.log(carImage);

    dispatch(addCar(myForm));
    // console.log(createProduct(myForm));
    history.push(`/car/${props.match.params.slug}`);
  };

  //Package Functions
  const [packageImage, setPackageImages] = useState([]);
  const [packageImagesPreview, setPackageImagesPreview] = useState([]);
 
  //Hotel Functions
  const onChangeFilePackage = (e) => {
    setPackageImages(e.target.files[0]);
  };

  const createPackageSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", packageName);
    console.log(packageName);

    myForm.set("description", packageDescription);
    console.log(packageDescription);

    myForm.set("city", city);
    console.log(city);

    myForm.set("product", product);
    console.log(product);

    myForm.set("duration", duration);
    console.log(duration);

    myForm.set("refundable", refundable);
    console.log(refundable);

    myForm.append("packageImage", packageImage);
    console.log(packageImage);

    dispatch(createPackage(myForm));
    // console.log(createProduct(myForm));
    history.push(`/package/${props.match.params.slug}`);
  };
  return (
    <>
      <Sidebar>
        <Header />

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
                <div>
                  <Link to={`/hotel/${props.match.params.slug}`}>
                    <Button variant="contained">View All Hotels</Button>
                  </Link>
                  <h1 style={{ marginLeft: "20rem" }}>Add New Hotel</h1>
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="City"
                    value={city = props.match.params.slug}
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
               
                <div style={{ display: "flex" }}>
                  <span style={{marginRight: "81px"}}>Pool:</span>
                  <input
                    type="radio"
                    value="Yes"
                    checked={pool === "Yes"}
                    onChange={(e) => setPool(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Yes
                  <input
                    type="radio"
                    value="No"
                    checked={pool === "No"}
                    onChange={(e) => setPool(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  No
                </div>

                <div style={{ display: "flex" }}>
                  <span style={{marginRight: "47px"}}>Breakfast:</span>
                  <input
                    type="radio"
                    value="Yes"
                    checked={breakfast === "Yes"}
                    onChange={(e) => setBreakfast(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Yes
                  <input
                    type="radio"
                    value="No"
                    checked={breakfast === "No"}
                    onChange={(e) => setBreakfast(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  No
                </div>

                <div style={{ display: "flex" }}>
                  <span >FullyRefundable:</span>
                  <input
                    type="radio"
                    value="Yes"
                    checked={fullyRefundable === "Yes"}
                    onChange={(e) => setFullyRefundable(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Yes
                  <input
                    type="radio"
                    value="No"
                    checked={fullyRefundable === "No"}
                    onChange={(e) => setFullyRefundable(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  No
                </div>

                <div style={{ display: "flex" }}>
                  <span style={{marginRight: "59px"}}>HotTub:</span>
                  <input
                    type="radio"
                    value="Yes"
                    checked={hotTub === "Yes"}
                    onChange={(e) => setHotTub(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Yes
                  <input
                    type="radio"
                    value="No"
                    checked={hotTub === "No"}
                    onChange={(e) => setHotTub(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  No
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
                onSubmit={createCarSubmitHandler}
              >
                {/* <h1>Add New Car</h1> */}
                <div>
                  <Link to={`/car/${props.match.params.slug}`}>
                    <Button variant="contained">View All Cars</Button>
                  </Link>
                  <h1 style={{ marginLeft: "20rem" }}>Add New Car</h1>
                </div>
                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Car Name"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
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
                    value={passenger}
                    onChange={(e) => setPassenger(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Fare"
                    value={fare}
                    onChange={(e) => setFare(e.target.value)}
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
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Mileage"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                  />
                </div>

                {/* <FormControl>
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
                </FormControl> */}
                <div style={{ display: "flex" }}>
                  <span>Pay at:</span>
                  <input
                    type="radio"
                    value="Now"
                    checked={payAt === "Now"}
                    onChange={onValueChange}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Now
                  <input
                    type="radio"
                    value="Later"
                    checked={payAt === "Later"}
                    onChange={onValueChange}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Later
                </div>
                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Shuttle"
                    value={shuttle}
                    onChange={(e) => setShuttle(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex" }}>
                  <span>Refund:</span>
                  <input
                    type="radio"
                    value="Non-refundable"
                    checked={refund === "Non-refundable"}
                    onChange={onValueChangeRefund}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Non-refundable
                  <input
                    type="radio"
                    value="Free cancellation"
                    checked={refund === "Free cancellation"}
                    onChange={onValueChangeRefund}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Free cancellation
                </div>
                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
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
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div id="createProductFormFile">
                  <TextField
                    id="outlined-basic"
                    required
                    // label="Outlined"
                    variant="outlined"
                    type="file"
                    onChange={onChangeFileCar}
                    name="carImage"
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
        {packageHidden ? (
          <div className="dashboard">
            <span className="package-arrow package-up"></span>
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={createPackageSubmitHandler}
              >
                <div>
                  <Link to={`/package/${props.match.params.slug}`}>
                    <Button variant="contained">View All Packages</Button>
                  </Link>
                  <h1 style={{ marginLeft: "20rem" }}>Add New Package</h1>
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="City"
                    value={city = props.match.params.slug}
                    onChange={(e) => setCity(e.target.value)}
                    // disabled
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Package Name"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Refundable"
                      value={refundable}
                      onChange={(e) => setRefundable(e.target.value)}
                  />
                </div>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={product}
                      label="City"
                      onChange={(e) => setProduct(e.target.value)}
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
                  <TextareaAutosize
                    placeholder="Description here..."
                    required
                    id="outlined-required"
                    style={{ width: 1200, height: 100 }}
                    className="text-area"
                      value={packageDescription}
                      onChange={(e) => setPackageDescription(e.target.value)}
                  />
                </div>
                <div id="createProductFormFile">
                  <TextField
                    id="outlined-basic"
                    required
                    // label="Outlined"
                    variant="outlined"
                    type="file"
                    onChange={onChangeFilePackage}
                    name="packageImage"
                    inputProps={{
                      multiple: false,
                    }}
                  />
                </div>
                <div id="createProductFormImage">
                  {packageImagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="package Preview" />
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
