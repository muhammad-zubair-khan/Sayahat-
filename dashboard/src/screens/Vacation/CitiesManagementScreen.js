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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVacationProductsBySlug } from '../../Redux/Actions/vacationProductAction'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const CitiesManagementScreen = (props) => {
  const dispatch = useDispatch()
    const {products} = useSelector((state) => state.vacationProduct)
    console.log(products)
    useEffect(() => {
      const { match } = props;
    console.log(props);
  }, [dispatch, props]);
   
  const [hotelHidden, setHotelHidden] = useState(true);
  const handleShowHotel = () => {
    setHotelHidden((is) => !is);
    setCarHidden(false)
    setPackageHidden(false)
  };
  const [carHidden, setCarHidden] = useState(false);
  const handleShowCar = () => {
    setCarHidden((is) => !is);
    setHotelHidden(false)
    setPackageHidden(false)
  };
  const [packageHidden, setPackageHidden] = useState(false);
  const handleShowPackage = () => {
    setPackageHidden((is) => !is);
    setHotelHidden(false)
    setCarHidden(false)
  };

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const createHotelImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <Sidebar>
        <Header />
        <Link to="/all-hotels">
          <h4>View All Hotels</h4>
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
                //   onSubmit={createProductSubmitHandler}
              >
                <h1>Add New Hotel</h1>

                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="City"
                      value={props.match.params.slug}
                    //   onChange={(e) => setName(e.target.value)}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Hotel Name"
                    //   value={name}
                    //   onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Pool" />
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
                    style={{ width: 1000, height: 100 }}
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
                    onChange={createHotelImagesChange}
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
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Pool" />
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
                    style={{ width: 1000, height: 100 }}
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
                    onChange={createHotelImagesChange}
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
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Pool" />
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
                    style={{ width: 1000, height: 100 }}
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
                    onChange={createHotelImagesChange}
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
