import {
    Button,
    Grid,
    Container,
    TextField,
    AppBar,
    Toolbar,
  } from "@mui/material";
  import Modal from "react-bootstrap/Modal";
  import React, { useState } from "react";
  import { MultiStepForm, Step } from "react-multi-form";
  import ContactDetails from "./ContactDetails/ContactDetails";
  import ActivityDetails from "./ActivityDetails/ActivityDetails";
  import PaymentDetails from "./PaymentDetails/PaymentDetails";
  import { Link, useHistory, useLocation, useParams } from "react-router-dom";
  import "./PaymentDetails/PaymentDetails.css";
  import useFetch from "../../hook/useFetch";
  import { ImageUrl } from "../../Redux/UrlConfig";
  import Navbar from "../../Navbar/Navbar";
  import logo from "../../Assets/logo/logo-black.png";
  import Footer from "../../Footer/Footer";
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { getPackageDetailById } from "../../Redux/Actions/packageAction";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

  const PackageCheckout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [destination, setDestination] = useState(
      location.state.state.destination
    );
    const [dates, setDates] = useState(location.state.state.dates);
    const [options, setOptions] = useState(location.state.state.options);
    const [time,setTimes] = useState(location.state.state.time)
    const packages = useSelector((state) => state.addPackageReducer);
    const { id } = useParams();
    // const { data, loading, error } = useFetch(
    //   `http://localhost:5000/api/hotel/${id}`
    // );
    // console.log(data);
    useEffect(() => {
        dispatch(getPackageDetailById(id));
      }, [dispatch, id]);
    const history = useHistory();
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
      setShow(false);
      // navigate(0);
    };
  
    const isEmail = (email) =>
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
        email
      );
    const handleShow = () => {
      if (!isEmail(email)) {
        setShow(false);
      } else if (isEmail(email)) {
        setActive(active + 1);
        setShow(true);

      }
    };
  const {user} = useSelector((state)=> state.auth)
    const [active, setActive] = useState(1);
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
  
// const procedeToPayment = () =>{
//   history.push('/process/payment')
// }

    const createFormSubmitHandler = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      
      myForm.set("firstName", firstName);
      
      myForm.set("lastName", lastName);
  
      const errors = {};
  
      if (!isEmail(email)) {
        errors.email = "Invalid email!";
      } else if (isEmail(email)) {
        myForm.set("email", email);
      }
      setErrors(errors);
  
      myForm.set("phone", phone);
  
      if(user.token){
      axios.post("http://localhost:5000/api/checkout/contactdetails", myForm)
        .then(function (response) {
          console.log(response);
        });
      // console.log(myForm);
    }
    };
    // const setEmail = (e) => {
    //   setValues((values) => ({ ...values, email: e.target.value }));
    // };
  
    const createForm2SubmitHandler = (e) => {
      e.preventDefault();
      const myForm = new FormData();
  
      myForm.set("firstName", firstName);
  
      myForm.set("lastName", lastName);
  
    };
    // const createForm3SubmitHandler = (e) => {
    //   e.preventDefault();
    //   const myForm = new FormData();
  
    //   myForm.set("firstName", firstName);
  
    //   myForm.set("lastName", lastName);

    // };
    if (Object.keys(packages.package).length === 0) {
      return null;
    }

    async function onToken(token){
      console.log(token)

      const PackageDetails = {

      }
    }
    return (
      <>
        <AppBar style={{ background: "white" }}>
          <Toolbar>
            <Link to="/">
              <img src={logo} style={{ width: "18%" }} alt="logo" />
            </Link>
          </Toolbar>
        </AppBar>
        {/* <Container maxWidth="lg"> */}
        <Grid container style={{ margin: "106px 43px" }}>
          <Grid lg={7}>
            <div style={{ margin: "21px 45px" }}>
              <MultiStepForm activeStep={active}>
                <Step label="Contact details" style={{ padding: "0px 20px" }}>
                  {/* <ContactDetails /> */}
                  <div className="container text-center mt-5">
                    <h4 style={{ color: "black" }} className="my-3">
                      We'll use this information to send you confirmation and
                      updates about your booking
                    </h4>
                    <h5 style={{ color: "black" }} className="mt-3">
                      Already have an account?
                      <span>
                        <Link to="/login">Log in</Link>
                      </span>
                    </h5>
                    <form
                      encType="multipart/form-data"
                      onSubmit={createFormSubmitHandler}
                      style={{ margin: "0 auto" }}
                    >
                      <div className="my-3 inputField">
                        <TextField
                          autoComplete="off"
                          fullWidth
                          required
                          id="outlined-required"
                          label="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="my-3 inputField">
                        <TextField
                          autoComplete="off"
                          fullWidth
                          required
                          id="outlined-required"
                          label="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="my-3 inputField">
                        <TextField
                          autoComplete="off"
                          fullWidth
                          required
                          id="outlined-required"
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}

                        />
                      </div>
                      {Object.entries(errors).map(([key, error]) => (
                        <span
                          key={`${key}: ${error}`}
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            display: "flex",
                            marginLeft: "7px",
                          }}
                        >
                          {error}
                        </span>
                      ))}
                      <div className="my-3 inputField">
                        <TextField
                          autoComplete="off"
                          type="number"
                          fullWidth
                          required
                          id="outlined-required"
                          label="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      {/* {active !== 1 && (
                  <Button onClick={() => setActive(active - 1)}>Previous</Button>
                )} */}
                      {active !== 3 && (
                        <Button
                          variant="contained"
                          type="submit"
                          style={{ float: "right" }}
                          className="send-button"
                          disabled={
                            !firstName || !lastName || !email || !phone
                          }
                          onClick={handleShow}
                        >
                          Next
                        </Button>
                      )}
                    </form>
                  </div>
                </Step>
                <Step label="Activity details">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <img src={ImageUrl(packages.package.packageImages[0].img)} style={{width:"30%"}} alt="" />
                      <b>{packages.package.name}</b>
                    </span>
                    <span>
                      <b>PKR {packages.package.price}</b>
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "14px 19px",
                    }}
                  >
                    {/* <span>Pick-up Time: {pickupTime}</span>
                      <span>Drop-off Time: {dropoffTime}</span> */}
                    <span className="siTaxiOp mb-1">Pickup Time {time}</span>
                    <span >{packages.package.carPickupDetails}</span>
                   
                    <p style={{ marginTop: "10px" }}>
                      Total Price: <span>PKR {packages.package.price}</span>{" "}
                    </p>
                  </div>
  
                  <div className="container mt-2">
                    <b>Adult 1</b>
                    <form
                      encType="multipart/form-data"
                      onSubmit={createForm2SubmitHandler}
                      // className="col-md-6 mt-5"
                      style={{ margin: "0 auto" }}
                    >
                      <div className="my-3 inputField">
                        <TextField
                          autoComplete="off"
                          fullWidth
                          required
                          id="outlined-required"
                          label="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="my-3 inputField">
                        <TextField
                          autoComplete="off"
                          fullWidth
                          required
                          id="outlined-required"
                          label="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
  
                      {options.adult >= 2 && (
                        <>
                          Adult 2
                          <div className="my-3 inputField">
                            <TextField
                              autoComplete="off"
                              fullWidth
                              required
                              id="outlined-required"
                              label="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="my-3 inputField">
                            <TextField
                              autoComplete="off"
                              fullWidth
                              required
                              id="outlined-required"
                              label="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                      {console.log(options)}
                      {options.adult >= 3 && (
                        <>
                          Adult 3
                          <div className="my-3 inputField">
                            <TextField
                              autoComplete="off"
                              fullWidth
                              required
                              id="outlined-required"
                              label="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="my-3 inputField">
                            <TextField
                              autoComplete="off"
                              fullWidth
                              required
                              id="outlined-required"
                              label="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </>
                      )}
  
                      {/* <Button
                          id="createProductBtn"
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={!firstName || !lastName}
                          className="send-button"
                        >
                          <div class="alt-send-button">
                            <i class="fa fa-paper-plane"></i>
                            <span class="send-text">SEND</span>
                          </div>
                        </Button> */}
                      {active !== 1 && (
                        <Button
                          variant="contained"
                          onClick={() => setActive(active - 1)}
                          style={{ float: "left" }}
                        >
                          Previous
                        </Button>
                      )}
                      {active !== 3 && (
                        <Button
                          variant="contained"
                          type="submit"
                          style={{ float: "right" }}
                          className="send-button"
                          disabled={!firstName || !lastName}
                          onClick={() => {
                            setActive(active + 1) 
                          }}
                        >
                          Next
                        </Button>
                      )}
                    </form>
                  </div>
                </Step>
                <Step label="Payment details">
                  <div className="container text-center mt-5">
                    <div id="Checkout" className="inline">
                      <h1>Payment Details</h1>
                      <div className="card-row">
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAeCAMAAABdem3zAAAAA3NCSVQICAjb4U/gAAABvFBMVEUAAADQ0NDa2tra2trZ2dnY2Nja2trt7e3t7e0mM3onNHspNXkqN30rN30sOH4tN3ovO4AwPIAyPoE1QYM3Q4Q4Q4U4RIU5RYY8R4g9SIhCTYtDToxGUY5HUo5JU49JVJBOWJJQW5RSXJVTXZZVX5dXYZhYYplaY5pfaJ1kbaBlbqFoaZFocaNpcqNqc6RtdqZvd6dzcpV0fKp2f6x5ga18g698hK99hK99hbB+hrCAh7GDi7OHjrWIj7aJkLeNk7mNlLqOlbqRl7yUmr6WnL6YnsCbocKepMSjqMekqceprsqrsMysscytss2uss2xts+xttC0uNG1udK1utK2utK3u9O6vdS7v9W8wNa9wda9wdfBxNnDx9rEx9vFyNzFydvHy93Kzd/Mz+DR0+LS1OPT1uTVnV/V1+XX2ebY2NjZuJbZ2+faoVza3Ojc3+rf4evf4ezi5O7j5e7n6fHp6/Lq6/Lr7PPsmC3snTfs7fPunjnu7/Tu7/Xw8fbx8vfy8/f09fj09fn19vn29/r3z5332LH39/r42LD42bL42bP5+fv76tX77dz7+/v7+/387dv9/f7+9ev//v3///9+dhG/AAAACXRSTlMAGxuq7e7u+vsOT6YMAAABbklEQVQ4y+WUV1cTYRQAlwSIsxoLltgLKgZ7AwV777FiL9gT1x4FGxpb0Gg0On/YBx83D+wz8z7nu+fe800QpNKtpTHSmk4FQUt7pu4YqWfaW4L0BBOQSQdt9SRCvS0omYjSOBZ+fB0d/f5T/VQoDHi6cF4b1/Zt6d9fUZ+cLFyMvfDny6vhN3/1EOwegW4/LAHgpb6bBpNr8ZE2PBz+rQvIvrgJ2+2DdaeOba7pXoBbceHAxHvfHIRNHoHjLobLqlZnkIeDcaHIlAeuh6Jb4bb9EG58rh6G4nTWNNnSHFYNZcnrcsKK1d4Qpl63MY9lrmRmE6GHcCdc0Q7mqt5ZAfM9C7uKvfA0LlyASSzUt7Daz+pIyGw7+c+JuPAxCxzV+7DHrq5tOzqhbxA6crlcSE+TS+dhVk0vwRk7AFhb64a76lIWva7EhKEoKqvvo6jqs6sD526UNYoeq5ajR78a4/k/JM5M4pAlTGUqSBrjf5znrWNE0ZcCAAAAAElFTkSuQmCC"
                          alt=""
                          className="card-images"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAeCAMAAABdem3zAAAAA3NCSVQICAjb4U/gAAACc1BMVEUAAADQ0NDa2tra2trZ2dnY2Nja2trt7e3t7e3MAADMAQHMBATNCQnOCwvODAzODg7PDwnPERHRGxvSFgfSHh7SHx/SIB7THhDTJCTTJibTJyfUKSnVIAXVLS3VMDDWMjLWNTXWNjbXIQDXLyLXNS7XNzfXOzvYLxbYPT3YPj7Y2NjZOy/ZRUXaSEjaSUnbLQDbLgDbS0vbTU3cSj/cU1PdNADdSjTdVVXdVlbeNwDeW1vfYmLgUDPgZWXgZmbgaGjhXkvhamrhbW3ia2Lib2/jXDfja1njdXXkeHjkeXnke3vlgIDlgYHmg4PmhITmhobnh4fniIjni4voVgDojIzokJDqXADqaiTqlpbqmJjqmZnqmprrnJzrn5/tpqbuqqrura3urq7vsbHvsrLvs7PwbADwbQDwtLTwtbXwt7fxvLzycgDyjULyvr7yv7/zdQDzmVvzn2fzxMTzxcXzx8f2fwD21tb3gQD3x6/3ybL32Nj4hAD43t7439/44OD5iQD54eH54uL65ub65+f76+v7+/v88vL89PT99/f9+Pj9+fn+lwD+/f3/mQD/mgT/nQv/nw//oRT/oRX/oRb/ohj/qCf/qSn/qSr/qy3/rDH/rjX/rjb/sT7/sj//s0L/tEX/tUf/tUj/tkn/t0v/uVD/uVH/u1X/vFj/vVr/vl7/v2H/w2n/xGz/x3P/yHb/yXr/zob/z4j/0Iv/1Zj/1pr/153/2J7/26X/3q7/4LL/4LP/4bX/4bb/5cD/5sL/58P/58T/58X/6sz/7NH/7dL/8d7/8t//9OX/9eb/9ef/9ur/9+v/+vT/+/X//Pj//fz///90HdR0AAAACXRSTlMAGxuq7e7u+vsOT6YMAAABmElEQVQ4y2NgYGJm0SISsDAzMTAwsrG3XiAStLKzMTIwc1wgAbAzM7C2kqKhlZVB6wJJQItSDS3R5orSmo7pPUD2+d2r506bvWzLKdwaOr14OSFAMuXCzqm9ENC//hwODc2KnHDAVdCLALNOYNXQLo9QzylgGoykY+YZbBqckNSrpKamdSPpWINFQw03kgZhJSUlSyQNfUcxNfjzyfFISUDUi5WCQO+EOZOgGmZswNSgY3VBpyPOxJZf1d4uWdxZW9k45+SBtStWTVowffH8o/MxNUgHNsY0entmxrW5R6VnhNb6NlVu6p247uCOs3sOH941DYuG9MTa3JCiGp+S+CzdrrziBOuK5b1L9x8/tG3vko0bsWjQafCKaIhNqon0qyvzqApyKZMtPLZl8/bTR1Zv3Xd6JRYnBeiJChkJGqppWIgoKKi7mTnIVC9YPHnhnHlTJiyaM3EDgWANz87OLicQrCgRx6VvYJBPIOJQk4ZNWD3BpIGS+DhdCSc+0pM3JAOpkpCBaJOnSS5mSC7ISCwqgYUriYUxAINRRW57ksG5AAAAAElFTkSuQmCC"
                          alt=""
                          className="card-images"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAeCAMAAABdem3zAAAAA3NCSVQICAjb4U/gAAACi1BMVEUAAAAAAAAAdKIAdqcGdqoDeqkDeKoDe6sFeqoFeqwCeqoGe6wGeasGeqwGe6wFeqwFeqwFeqsGe6oFeawEeqwEeqwFe6wHeaoFe6oFeasFe6wFeawHe6wIfKwJfKwKfa0Lfa0Mfq0Of64Pf64QgK8RgK8Sga8TgbAUgrAVgrAWg7EXg7EYhLEZhLIahbIbhbIdhrMfh7QgiLQhiLQjirUkirUli7YnjLYojLcqjbcsj7gtj7kukLkvkLkwkbkxkboykrozkro0k7s1k7s2lLs3lLw4lbw5lbw6lr07lr08l709l75Amb9Bmr9Dm8BFnMBHncFIncFJnsJKnsJLn8JMn8NNoMNOocRPocRQosRRosVUpMZVpMZWpcZXpcdYpsdZp8dap8dbqMheqclgqslhq8pjrMpkrMtnrsxpr8xqr81tsc5vss5wss9xs89ztNB0tdB1ttF6uNJ8udN9utN+utR/u9SAu9SBvNWCvNWDvdWEvdWGvtaHv9aIv9eKwNeMwdiPw9mQw9mRxNqTxdqUxtuVx9uWx9yXyNyYyNyZyd2ayd2byt2cyt6dy96fzN+gzN+hzd+izeCjzuCkzuCn0OGp0eKq0eKr0uOs0+Ot0+Ov1OSw1eSy1uWz1uW01+W32Oa62ui72+i82+i+3Om/3enC3urE3+vF4OvH4ezI4uzJ4u3K4+3L4+3N5O7O5e7P5e/R5u/S5/DT5/DV6PHW6fHX6fHY6vHa6/Lb7PPc7PPd7fPe7fTf7vTg7vTi7/Xj8PXk8fbm8vbn8vfo8/fp8/fq9Pjr9Pjs9fjt9fnu9vnv9vnw9/rx9/ry+Prz+Pv0+fv1+fv2+vz4+/z5+/37/P38/f7+/v7///+B6xdgAAAAHHRSTlMAARYaJ0FIT1pcYG6YmZyssrPDys3T2tvt9PX+1nJQbwAAAnFJREFUOMtjYOAWESMWiAqwMzBwyZAEOBn4SdMgzCBImgYJUjVI0UeDkoGBrq6BgZ6MhgECqAA56nJ6ICZIWN3AQAeuoevIrvOHDuy6ZLl1366ru3ft2nVl167dJ08cOXHo/P6Dl3Yd33Nm15mdJw+thGnQO2ei2nzDRaZp405Zmd2KxhYWW2TMTeUmJOWv0NOPKVJ1uNEi4329LByuoXKaabvZNZcQw8u5IUANrYuX7pA5eNSxJCk/OPfGBe2ZKotbnAw6kTSs8Axslpnh0mtRr74YqME7LGaHjI6G4uakfOfGG21q3c5hLf7TNDMQGhqUMjN9vFz6O2TCjgA11M+Zs13m4oXIvKT8bOs+i7DMNJks/xuhcggNKQ3b+vfGpS65kLTqVNyRpLi4uP1xl6d09jRPPF+blHC29WB+SsX5PXF1cA0lE/1lWiZOnFg2saZrIgxkgojiyr6JZTLxQFZ5ycSJpRTHdOAmMMiM2Agk103esGnTxiWzwELTVwOJyes29aFqiFtrCQR+x05FuVpaWqcfA3I8FlQDyandjpaWh5KtLI3RNCxTA8ZypHewb7vNrvWKk2QW7wiIzU3YteusXtXWrQvllm+diK5BRl6+4JyW2omJ2qkRiqtknN2VF+UCxWbmKCi5b3GU1fRE16B+4cK5RCe3pH6z6bP3nZOZsyYoMzftwsWrp4+skZt/4kA1mqfjVqgAgcORw/Z23kejg86r7JxXm1AIFOqzVdFLAEoahaNqiDgMBplZQGKNjC6QbD0MA3vmAomN5XTLcaQASQZe0jSIM3CQpoGPgZFHmgT1QkwMDAzMrOxEAjYWBgYAvI9h1MHdhQIAAAAASUVORK5CYII="
                          alt=""
                          className="card-images"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAeCAMAAABdem3zAAAAA3NCSVQICAjb4U/gAAACLlBMVEUAAADQ0NDa2tra2trZ2dnY2Nja2trt7e3t7e3vzbDvzbEBAQECAgIDAwMTExMUFBQWFhYYGBgZGRkeHh4jIyMmJiYnJycpKSksLCwtLS0uLi4wMDAzMzM0NDQ3Nzc6Ojo8PDw/Pz9CQkJDQ0NHR0dJSUlKSkpMTExOTk5PT09RUVFWVlZYWFhcXFxgYGBiYmJjY2Nra2tsbGxtbW1wcHBxcXF0dHR1dXV2dnZ3d3d4eHh8fHx9fX1+fn6AgICBgYGCgoKDg4OLi4uMjIyPj4+VlZWWlpabm5udnZ2enp6fn5+hoaGjo6OoqKirq6usrKyvr6+wsLCysrKzs7O4uLi7u7u8vLy9vb2/v7/AwMDBwcHExMTGxsbHx8fJycnLy8vQ0NDR0dHS0tLU1NTW1tbY2NjZ2dnb29vd3d3f39/h4eHi4uLn5+fo6Ojp6enr6+vs7Ozt7e3v7+/x8fHy8vL1giD1giH1gyP1hCT1iS31ii71izD1jDL2kTv2kjz2kz/2lED2lkP2lkT2l0X2mUn2pmH2pmL3m033n1X3oVf3pF73pV739/f4q2n4q2r4rWz4r3D4r3H4sXT4s3f5uoT5u4b5vov5+fn6xJb6yJ36yqD6zKT6+vr7zqj70a372Ln7+/v83sT838b84Mj84sv848785M/85dD89O78/Pz959X96Nb969z9/f3+8+r+9e7+9u/+9/H++PP++vb++vf+/Pn+/Pr+/fz+/v7////OeAUcAAAAC3RSTlMAGxuq7e7u+vv7+w/+RoMAAAGnSURBVDjLY2BgYmZJJRKwMDMxMDCysS/YSSRYwM7GyMDMsZMEwM7MwLqAFA0LWBlSd5IEUumkwc7A0HPBTuvcTAN13535FuqWJTsXdrdP2+IZuHOnR6iNgYHVDgMDsySEBin3QE2NnWJpKk6x8T1iDsku6UvKSktL+4Kld84RzBb3Co9ZyRPnJYikIXHnAr5ssTR9hYCVIfIg8UmlILBCOMFfa6e4jWvQWh5/e0kUDTuFMsTSpvvI6gUog8QngzVsdDRVC9spbu7st5bbmL8ASUNEipEi0ElRRQEyhYL+K/2Tl5cD1U/cmSMgsXOneHRe3krenSpuCA26ckp2xTu1s2xFZSJ3JqiJqKbvXNrbOWPrzp0m3jt36sjJyS2Q35ms0rNz53wSg3VRI2kaVlc1kKRhVU0pSRoWVZaSpGF2RSkpGjZNAMcM0RoW15aSomE9JOKJ1bB1VnUpCRq2z6srLSVew+ZZyMoJalgzpbq0lGgNG+Z2lGKAplQcxcy6uV3lpVhAKyuWgmzLwqktpTgAJzNaUblt2cz+xnocoLmNiw1YuJJYGAMAEKBGzN/0FVAAAAAASUVORK5CYII="
                          alt=""
                          className="card-images"
                        />
                      </div>
                      <form
                        encType="multipart/form-data"
                        // onSubmit={createForm3SubmitHandler}
                        style={{ margin: "0 auto" }}
                      >
                        {active !== 1 && (
                          <Button
                            variant="contained"
                            onClick={() => setActive(active - 1)}
                            style={{ float: "left" }}
                          >
                            Previous
                          </Button>
                        )}
                       
                        <StripeCheckout
                        amout={packages.package.price * 100}
                        token={onToken}
                        currency="pkr"
                        stripeKey="pk_test_51MMadlEdXSlragr6SwgB9qHwwXKyE5CKq8RYenOPqKkYzEY69AqjcwjOozCiMG0bFrmdA6f8AE7U2xllOaAV9VBD00pe7Iwpmb"
                      >
                         {active === 3 && (
                          <Button
                            variant="contained"
                            style={{ float: "right" }}
                            className="send-button"
                            // disabled={!firstName || !lastName}
                            // onClick={() => {
                            //   alert(
                            //     "Payment Successfully Done! you'll  recieved a confirmation email shortly"
                            //   );
                            // }}
                            // onClick={procedeToPayment}
                          >
                            Pay Now
                          </Button>
                        )}
                      </StripeCheckout>
                      </form>
                    </div>
                  </div>
                </Step>
              </MultiStepForm>
            </div>
          </Grid>
          <Grid
            lg={5}
            style={{ padding: "57px 78px", backgroundColor: "#f5f5f5" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <span>
                <img
                  src={ImageUrl(packages.package.packageImages[0].img)}
                  style={{ width: "30%" }}
                  alt=""
                />
                <b>{packages.package.name}</b>
              </span>
              <span>
                <b>PKR {packages.package.price}</b>
              </span>
            </div>
            <div
              style={{
                marginLeft: "36px",
                marginBottom: "30px",
                marginTop: "15px",
                color: "#929292",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <span>Pick-up Time: <span className="siTaxiOp">{pickupTime}</span></span>
                <span>Drop-off Time: <span className="siTaxiOp">{dropoffTime}</span></span> */}
              {/* <span>{data.hotel.address}</span> */}
              <span>{packages.package.title}</span>
              <hr />
            </div>
            <div>
            <b>Pick-up Time: {time}</b>
            </div>
            <div
              style={{
                // marginLeft: "36px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <b>Total Price</b>
              <b>PKR {packages.package.price}</b>
            </div>
          </Grid>
        </Grid>
        <Footer />
        {/* </Container> */}
      </>
    );
  };
  
  export default PackageCheckout;
  