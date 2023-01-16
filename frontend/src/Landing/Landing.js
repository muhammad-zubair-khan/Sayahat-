import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./Landing.css";
import MyCard from "../MyCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import videoplayback from "../Assets/videoplayback.mp4";
import ReactPlayer from "react-player";
import CardSlider from "../CardSlider";
import "../CardSlider.css";
import TopDes from "../TopDes";
import Footer from "../Footer/Footer";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { SearchContext } from "../Context/SearchContext";
import { getAllVacationProduct } from "../Redux/Actions/vacationProductAction";
import VillaIcon from "@mui/icons-material/Villa";
import Tab from "../Components/Tab/Tab";
const Landing = ({ type }) => {
  const { dispatch } = useContext(SearchContext);
  useEffect(() => {
    dispatch(getAllVacationProduct());
  }, [dispatch]);

  return (
    <>
      <div className="fh5co-hero">
        <div className="fh5co-overlay"></div>
        <div className="fh5co-cover" data-stellar-background-ratio="0.5">
          <div className="desc">
            <div className="container">
              <div className="row">
                <div
                  className="desc2 animate-box col-md-12 col-sm-12 col-lg-12 my-5"
                  // style={{ position: "relative" }}
                >
                  <div>
                    <h2
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontFamily: "unset",
                        letterSpacing: "4px",
                      }}
                    >
                      Time To Travel
                    </h2>
                    <p
                      style={{
                        fontSize: "25px",
                        color: "rgb(195, 191, 191)",
                        textAlign: "center",
                        letterSpacing: "4px",
                      }}
                    >
                      Discover places near you
                    </p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <Tab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------Special Offers & Discount----------------------------- */}
      <div
        className="tours"
        style={{
          backgroundColor: "black",
          marginTop: "0",
          border: "1px solid",
          paddingBottom: "60px",
        }}
      >
        <Container className="mt-5 mb-3">
          <h3 style={{ color: "white" }}>
            <VillaIcon /> Tour Packages
          </h3>
        </Container>

        {/* ---------------CARDS----START */}
        <MyCard />
        {/* ---------------CARDS----END */}
        <Container>
          {/* -----ABOUT-US-START----------- */}
          <Grid container className="mt-5">
            <Grid xs={12} lg={6} className="mt-3">
              <Box style={{ textAlign: "center", padding: "52px 04px" }}>
                <h3 style={{ color: "white" }}>
                  What You Know About Pakistan?
                </h3>
                <p
                  style={{
                    textAlign: "justify",
                    marginTop: "10px",
                    color: "#dddddd",
                  }}
                >
                  Pakistan is one of the most fascinating nations you might
                  travel to, with a vibrant culture, a sizable population, and a
                  fascinatingly wide range of natural magnificence. Here are
                  some of Pakistan's most distinctive features, all of which
                  enrich and beautify the world. Pakistan, officially the
                  Islamic Republic of Pakistan, is a country in South Asia. It
                  is the world's fifth-most populous country, with a population
                  of almost 243 million people, and has the world's
                  second-largest Muslim population{" "}
                </p>
              </Box>
            </Grid>
            <Grid xs={12} lg={6} style={{ padding: "30px" }}>
              <Box>
                {/* <video width="100%" autoPlay={true} loop={true}>
                  <source src={videoplayback} />
                </video> */}
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  style={{ width: "100%" }}
                  playing={true}
                  url={videoplayback}
                />
              </Box>
            </Grid>
          </Grid>
          {/* -----ABOUT-US-END----------- */}

          {/* ---HOLIDAY_PLANS_START------ */}

          <Box className="mt-5" style={{ textAlign: "center" }}>
            <h3 style={{ color: "white" }}>Perfect Hotels Deals</h3>
            <p style={{ color: "#dddddd" }}>
              No vis fastidii accumsan, ignota postulant ea mea. Vis et prima
              integre, ei vis ridens moderatius reformidans cu vim doctus
              accumsan ignota.
            </p>
          </Box>

          <CardSlider />

          {/* ---HOLIDAY_PLANS_END------ */}

          {/* -----ARTICLES--- */}
          <Grid container className="mt-5">
            <Grid xs={12} lg={12}>
              <div style={{ position: "relative", textAlign: "center" }}>
                <Link to="/artciles">
                  <img
                    src="https://i.dawn.com/primary/2019/01/5c2c5a5cdbc6a.jpg"
                    alt=""
                    width="80%"
                    style={{ filter: "brightness(0.5)" }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "50%",
                      fontSize: "29px",
                      color: "white",
                      width: " 100%",
                    }}
                  >
                    CUSTOMS AND CUISINE OF PAKISTAN
                  </p>
                </Link>
              </div>
            </Grid>
          </Grid>
          {/* -----ARTICLES--- */}

          {/* ----TOP DESTINATION-START---- */}
          <TopDes />
          {/* ----TOP DESTINATION-END---- */}
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
