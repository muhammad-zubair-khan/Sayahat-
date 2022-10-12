import React from "react";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./Landing.css";
import MyCard from "../MyCard";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import videoplayback from "../Assets/videoplayback.mp4";
import CardSlider from "../CardSlider";
import "../CardSlider.css";
import { TopDes } from "../TopDes";
import Footer from "../Footer/Footer";

const Landing = () => {
  return (
    <>
      <div className="fh5co-hero">
        <div className="fh5co-overlay"></div>
        <div className="fh5co-cover" data-stellar-background-ratio="0.5">
          <div className="desc">
            <div className="container">
              <div className="row">
                <div className="col-sm-5 col-md-5">
                  <div className="tabulation animate-box">
                    {/* <!-- Nav tabs --> */}
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation">
                        <a
                          href="#flights"
                          aria-controls="flights"
                          role="tab"
                          data-toggle="tab"
                          className="active"
                        >
                          Flights
                        </a>
                      </li>
                      <li role="presentation">
                        <a
                          href="#hotels"
                          aria-controls="hotels"
                          role="tab"
                          data-toggle="tab"
                        >
                          Hotels
                        </a>
                      </li>
                      <li role="presentation">
                        <a
                          href="#packages"
                          aria-controls="packages"
                          role="tab"
                          data-toggle="tab"
                        >
                          Packages
                        </a>
                      </li>
                    </ul>

                    {/* <!-- Tab panes --> */}
                    <div className="tab-content">
                      <div
                        role="tabpanel"
                        className="tab-pane active"
                        id="flights"
                      >
                        <div className="row">
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">From:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Los Angeles, USA"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">To:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="to-place"
                                placeholder="Tokyo, Japan"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt alternate">
                            <div className="input-field">
                              <label for="date-start">Check In:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="date-start"
                                placeholder="mm/dd/yyyy"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt alternate">
                            <div className="input-field">
                              <label for="date-end">Check Out:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="date-end"
                                placeholder="mm/dd/yyyy"
                              />
                            </div>
                          </div>
                          {/* <div className="col-sm-12 mt">
                            <section>
                              <label for="className">Room:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  Economy
                                </option>
                                <option value="economy">Economy</option>
                                <option value="first">First</option>
                                <option value="business">Business</option>
                              </select>
                            </section>
                          </div> */}

                          <div className="col-xxs-12  col-xs-6 col-md-6 mt">
                            <section>
                              <label for="className">Adult:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  1
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </section>
                          </div>
                          <div className="col-xxs-12 col-xs-6 col-md-6 mt">
                            <section>
                              <label for="className">Children:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  1
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </section>
                          </div>
                          <div className="col-xs-12">
                            <input
                              type="submit"
                              className="btn btn-primary btn-block"
                              value="Search Flight"
                            />
                          </div>
                        </div>
                      </div>

                      <div role="tabpanel" className="tab-pane" id="hotels">
                        <div className="row">
                          <div className="col-xxs-12 col-xs-12 mt">
                            <div className="input-field">
                              <label for="from">City:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Los Angeles, USA"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt alternate">
                            <div className="input-field">
                              <label for="date-start">Return:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="date-start"
                                placeholder="mm/dd/yyyy"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt alternate">
                            <div className="input-field">
                              <label for="date-end">Check Out:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="date-end"
                                placeholder="mm/dd/yyyy"
                              />
                            </div>
                          </div>
                          <div className="col-sm-12 mt">
                            <section>
                              <label for="className">Rooms:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  1
                                </option>
                                <option value="economy">1</option>
                                <option value="first">2</option>
                                <option value="business">3</option>
                              </select>
                            </section>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <section>
                              <label for="className">Adult:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  1
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </section>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <section>
                              <label for="className">Children:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  1
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </section>
                          </div>
                          <div className="col-xs-12">
                            <input
                              type="submit"
                              className="btn btn-primary btn-block"
                              value="Search Hotel"
                            />
                          </div>
                        </div>
                      </div>

                      <div role="tabpanel" className="tab-pane" id="packages">
                        <div className="row">
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">City:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Los Angeles, USA"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">Destination:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="to-place"
                                placeholder="Tokyo, Japan"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt alternate">
                            <div className="input-field">
                              <label for="date-start">Departs:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="date-start"
                                placeholder="mm/dd/yyyy"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt alternate">
                            <div className="input-field">
                              <label for="date-end">Return:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="date-end"
                                placeholder="mm/dd/yyyy"
                              />
                            </div>
                          </div>
                          <div className="col-sm-12 mt">
                            <section>
                              <label for="className">Rooms:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  1
                                </option>
                                <option value="economy">1</option>
                                <option value="first">2</option>
                                <option value="business">3</option>
                              </select>
                            </section>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <section>
                              <label for="className">Adult:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  1
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </section>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <section>
                              <label for="className">Children:</label>
                              <select className="cs-select cs-skin-border">
                                <option value="" disabled selected>
                                  1
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            </section>
                          </div>
                          <div className="col-xs-12">
                            <input
                              type="submit"
                              className="btn btn-primary btn-block"
                              value="Search Packages"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="desc2 animate-box">
								<div className="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
									<h3>Fly to Hong Kong via Los Angeles, USA</h3>
									<span className="price">$599</span>
									<p><Link className="btn btn-primary btn-lg" href="#">Get Started</Link></p>
								</div>
							</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------Special Offers & Discount----------------------------- */}
      <Container>
        <div className="mt-5">
          <h3>Special Offers & Discount</h3>
          <p>
            Lorem Ipsum is simply dummy text the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>

          {/* ---------------CARDS----START */}
          <MyCard />
          {/* ---------------CARDS----END */}
        </div>

        {/* -----ABOUT-US-START----------- */}
        <Grid container className="mt-5">
          <Grid xs={12} lg={6}>
            <Box style={{ textAlign: "center", padding: "52px 04px" }}>
              <h3>What You Know About Pakistan?</h3>
              <p style={{ textAlign: "justify", marginTop: "10px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                urna lectus, lacinia ut magna eu, congue dictum libero.
                Curabitur est elit, scelerisque nec congue quis, rutrum non
                enim. Fusce hendrerit aliquam ipsum, et finibus ligula. Aliquam
                vitae pellentesque neque. Nulla ac augue dictum, tincidunt nibh
                a, venenatis libero. Vestibulum euismod leo ex, sit amet ornare
                ex scelerisque blandit. Quisque blandit orci quis varius
                tincidunt. Nullam gravida egestas scelerisque. Cras feugiat
                ligula vitae varius finibus. Vivamus fringilla ultricies leo
                eget suscipit. Morbi imperdiet velit eu ipsum euismod finibus.{" "}
              </p>
            </Box>
          </Grid>
          <Grid xs={12} lg={6} style={{ padding: "30px" }}>
            <Box>
              <video width="100%" controls loop={true}>
                <source src={videoplayback} />
              </video>
            </Box>
          </Grid>
        </Grid>
        {/* -----ABOUT-US-END----------- */}

        {/* ---HOLIDAY_PLANS_START------ */}

        <Box className="mt-5" style={{ textAlign: "center" }}>
          <h3>Perfect Holiday Plan</h3>
          <p>
            No vis fastidii accumsan, ignota postulant ea mea. Vis et prima
            integre, ei vis ridens moderatius reformidans cu vim doctus accumsan
            ignota.
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
                  style={{}}
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
      <Footer />
    </>
  );
};

export default Landing;
