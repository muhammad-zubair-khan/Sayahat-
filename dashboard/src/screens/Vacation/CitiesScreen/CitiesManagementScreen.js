import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./CitiesManagementScreen.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllVacationProduct } from "../../../Redux/Actions/vacationProductAction";
import {
  createHotel,
  getHotelBySlug,
} from "../../../Redux/Actions/hotelAction";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addCar } from "../../../Redux/Actions/carAction";
import { createPackage } from "../../../Redux/Actions/packageAction";
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
  const [hotelType, setHotelType] = useState("");
  const [hotelTitle, setHotelTitle] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [featuredHotel, setFeaturedHotel] = useState(false);
  const [hotelImages, setHotelImages] = useState([]);

  //Car States
  let [carCity, setCarCity] = useState("");
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
  const [gear, setGear] = useState("");
  const [featuredCar, setFeaturedCar] = useState(false);
  const [carTitle, setCarTitle] = useState("");
  const [carImages, setCarImages] = useState([]);

  //Package States
  let [packageCity, setPackageCity] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [refundable, setRefundable] = useState("");
  const [product, setProduct] = useState("");
  const [featuredPackage, setFeaturedPackage] = useState(false);
  const [packageType, setPackageType] = useState("");
  const [carPickupDetails, setCarPickupDetails] = useState("");
  const [packageImages, setPackageImages] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);

  const addTags = (e) => {
    if (e.key === "Enter" && tagValue) {
      setTags([...tags, tagValue]);
      setTagValue("");
    }
  };
  const deleteTags = (val) => {
    let remainTag = tags.filter((t) => t !== val);
    setTags(remainTag);
  };

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.vacationProduct);

  useEffect(() => {
    const { match } = props;
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

  const createHotelSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("city", city);
    myForm.set("type", hotelType);
    myForm.set("distance", distance);
    myForm.set("address", address);
    myForm.set("title", hotelTitle);
    myForm.set("cheapestPrice", cheapestPrice);
    myForm.set("category", category);
    myForm.set("pool", pool);
    myForm.set("Breakfast", breakfast);
    myForm.set("Hottub", hotTub);
    myForm.set("featured", featuredHotel);
    myForm.set("FullyRefundable", fullyRefundable);
    Array.from(hotelImages).forEach((item) => {
      myForm.append("hotelImages", item);
    });

    dispatch(createHotel(myForm));
    history.push(`/hotel/${props.match.params.slug}`);
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
    myForm.set("description", desc);
    myForm.set("category", category);
    myForm.set("passenger", passenger);
    myForm.set("price", fare);
    myForm.set("type", type);
    myForm.set("mileage", mileage);
    myForm.set("refund", refund);
    myForm.set("payAt", payAt);
    myForm.set("shuttle", shuttle);
    myForm.set("discount", discount);
    myForm.set("title", carTitle);
    myForm.set("city", carCity);
    myForm.set("gear", gear);
    myForm.set("featured", featuredCar);
    Array.from(carImages).forEach((item) => {
      myForm.append("carImages", item);
    });

    dispatch(addCar(myForm));
    history.push(`/car/${props.match.params.slug}`);
  };

  const createPackageSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", packageName);
    myForm.set("description", packageDescription);
    myForm.set("city", packageCity);
    myForm.set("price", price);
    myForm.set("product", product);
    myForm.set("type", packageType);
    myForm.set("duration", duration);
    myForm.set("refundable", refundable);
    myForm.set("featured", featuredPackage);
    myForm.set("carPickupDetails", carPickupDetails);
    Array.from(tags).forEach((item) => {
      myForm.append("startTime", item);
    });

    Array.from(packageImages).forEach((item) => {
      myForm.append("packageImages", item);
    });

    dispatch(createPackage(myForm));
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
                    value={(city = props.match.params.slug)}
                    onChange={(e) => setCity(e.target.value)}
                    // disabled
                  />
                </div>
                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Hotel Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Hotel Title"
                    value={hotelTitle}
                    onChange={(e) => setHotelTitle(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Type"
                    value={hotelType}
                    onChange={(e) => setHotelType(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Price"
                    value={cheapestPrice}
                    onChange={(e) => setCheapestPrice(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Distance From Center"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                      {/* {destinations &&
                        destinations.map((data, index) => {
                          return (
                            <MenuItem value={data._id} key={index}>
                              {data.name}
                            </MenuItem>
                          );
                        })} */}
                    </Select>
                  </FormControl>
                </Box>

                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: "81px" }}>Pool:</span>
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
                  <span style={{ marginRight: "47px" }}>Breakfast:</span>
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
                  <span>FullyRefundable:</span>
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
                  <span style={{ marginRight: "59px" }}>HotTub:</span>
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

                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: "59px" }}>Featured Hotel:</span>
                  <input
                    type="radio"
                    value="true"
                    checked={featuredHotel === "true"}
                    onChange={(e) => setFeaturedHotel(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Yes
                  <input
                    type="radio"
                    value="false"
                    checked={featuredHotel === "false"}
                    onChange={(e) => setFeaturedHotel(e.target.value)}
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
                {/* <div id="createProductFormFile">
                  <input
                    id="outlined-basic"
                    required
                    variant="outlined"
                    type="file"
                    onChange={onChangeFile}
                    name="hotelImage"
                    inputProps={{
                      multiple: true,
                    }}
                  />
                </div> */}
                <div id="createProductFormFile">
                  <input
                    type="file"
                    // name="hotelImage"
                    // accept="image/*"
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) => setHotelImages(e.target.files)}
                    multiple
                  />
                </div>
                <div id="createProductFormImage">
                  {Array.from(hotelImages).map((item) => {
                    return (
                      <img
                        src={item ? URL.createObjectURL(item) : null}
                        alt="Hotel Preview"
                      />
                    );
                  })}
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
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="City"
                    value={(carCity = props.match.params.slug)}
                    onChange={(e) => setCarCity(e.target.value)}
                    // disabled
                  />
                </div>
                <div>
                  <TextField
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Fare"
                    value={fare}
                    onChange={(e) => setFare(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Title"
                    value={carTitle}
                    onChange={(e) => setCarTitle(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Gear"
                    value={gear}
                    onChange={(e) => setGear(e.target.value)}
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
                    autoComplete="off"
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
                    autoComplete="off"
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

                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: "59px" }}>Featured Car:</span>
                  <input
                    type="radio"
                    value="true"
                    checked={featuredCar === "true"}
                    onChange={(e) => setFeaturedCar(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Yes
                  <input
                    type="radio"
                    value="false"
                    checked={featuredCar === "false"}
                    onChange={(e) => setFeaturedCar(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  No
                </div>

                <div>
                  <TextField
                    autoComplete="off"
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
                  <input
                    id="outlined-basic"
                    required
                    type="file"
                    onChange={(e) => setCarImages(e.target.files)}
                    multiple
                  />
                </div>
                <div id="createProductFormImage">
                  {Array.from(carImages).map((item) => {
                    return (
                      <img
                        src={item ? URL.createObjectURL(item) : null}
                        alt="Car Preview"
                      />
                    );
                  })}
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
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="City"
                    value={(packageCity = props.match.params.slug)}
                    onChange={(e) => setPackageCity(e.target.value)}
                    // disabled
                  />
                </div>

                <div>
                  <TextField
                    autoComplete="off"
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
                    autoComplete="off"
                    type="number"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <TextField
                    autoComplete="off"
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
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Package Type"
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: "59px" }}>Featured Package:</span>
                  <input
                    type="radio"
                    value="true"
                    checked={featuredPackage === "true"}
                    onChange={(e) => setFeaturedPackage(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  Yes
                  <input
                    type="radio"
                    value="false"
                    checked={featuredPackage === "false"}
                    onChange={(e) => setFeaturedPackage(e.target.value)}
                    style={{ width: "auto", margin: "0px 13px" }}
                  />
                  No
                </div>

                <div>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Refundable"
                    value={refundable}
                    onChange={(e) => setRefundable(e.target.value)}
                  />
                </div>

                <div className="tagInput">
                  {tags.map((item, index) => {
                    return (
                      <button key={index}>
                        {item}
                        <span onClick={() => deleteTags(item)}>X</span>
                      </button>
                    );
                  })}

                  <TextField
                    autoComplete="off"
                    fullWidth
                    id="outlined-required"
                    placeholder="select Time"
                    onChange={(e) => setTagValue(e.target.value)}
                    onKeyDown={addTags}
                    value={tagValue}
                  />
                </div>

                <div>
                  <TextareaAutosize
                    placeholder="Car Pickup description..."
                    required
                    id="outlined-required"
                    style={{ width: 1200, height: 100 }}
                    className="text-area"
                    value={carPickupDetails}
                    onChange={(e) => setCarPickupDetails(e.target.value)}
                  />
                </div>

                {/* <div>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={timeLists}
                    // onChange={(e)=> setTimeLists(e.target.value)}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.time}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.time}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="startTime"
                        placeholder="select"
                        onChange={(e)=> console.log(e.target.value)}
                      />
                    )}
                  />
                </div> */}
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
                  <input
                    required
                    type="file"
                    onChange={(e) => setPackageImages(e.target.files)}
                    multiple
                  />
                </div>
                <div id="createProductFormImage">
                  {Array.from(packageImages).map((item) => {
                    return (
                      <img
                        src={item ? URL.createObjectURL(item) : null}
                        alt="Package Preview"
                      />
                    );
                  })}
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
