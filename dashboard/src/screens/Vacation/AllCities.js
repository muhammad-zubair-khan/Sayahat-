import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { TextareaAutosize } from "@mui/material";
import { getAllVacationProduct } from '../../Redux/Actions/vacationProductAction'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AllCities = () => {
  const [city, setCity] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

    const dispatch = useDispatch()
    const {products} = useSelector((state) => state.vacationProduct)
    console.log(products)
    useEffect(() => {
      dispatch(getAllVacationProduct())
    }, [])
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
            <Header/>
            <div className="dashboard">
            <span className="hotel-arrow hotel-up"></span>
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                //   onSubmit={createProductSubmitHandler}
              >
                <h1>Add New Hotel</h1>

                <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="City"
          onChange={handleChange}
        >
          {products && products.map((data,index)=>{
            return (
              <MenuItem value={data.name} key={index}>
                {data.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
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
            <div className="row container-fluid d-flex">
          {products &&
            products.map((data, index) => {
              return (
                <>
                  <div className="col-md-4 my-3">
                    <Link to={`${data.slug}`}>
                      <div className="wrapper">
                        <img
                          src={data.productVacationPicture}
                          style={{
                            width: "100%",
                            height: "300px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          alt=""
                        />
                        <h3 className="wrapper-text">{data.name}</h3>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
        </div>

        </Sidebar>
    </>
  )
}

export default AllCities