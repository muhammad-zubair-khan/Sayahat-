import React from 'react'
import Footer from '../../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
import "./StyleTours.css";
import { Link } from "react-router-dom";

function Tours() {
  let readMore = () => {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  };

  let tourCard = [
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      city: 'Lahore',
      image: 'https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
  ]
  return (
    <>
      <Navbar />
      <div className="bgCity"></div>
      <div className="container-fluid position-absolute top-100 introText">
        {/* Start of introduction of city */}
        <div className="row ms-4 mt-5">
          <div className="col-10 ms-5">
            <h1 className="lhrH1">Punjab</h1>
            <p className="lhrIntro mt-5">
              Punjabi is one of the four provinces of Pakistan. Located in centraleastern region of the country, Punjab is the second-largest province of Pakistan by land area and the largest province by population.
            </p>

            <h4 className="text-dark">History</h4>
            <p className="text-dark">
              Forming the bulk of the transnational Punjab region between Pakistan and India, it is bounded locally by Sindh to the south, Balochistan to the west, Khyber Pakhtunkhwa to the northwest, the Islamabad Capital Territory to the north, and the Pakistani-administered territory of Azad Jammu and Kashmir to the northeast. On its eastern side, it is bounded by the India Pakistan border, sharing an international boundary with the Indian states of Punjab and Rajasthan to the east and southeast, respectively, and a disputed boundary with the Indian-administered territory of Jammu and Kashmir to the northeast. The province's capital is Lahore—a cultural, modern, historical, economic, and cosmopolitan centre of Pakistan. Other major cities include Faisalabad, Rawalpindi, Gujranwala, Multan, and Sialkot. Punjab is also the world's fifth-most populous subnational entity, and the most populous outside of China and India.<span id="dots"></span>
              <span id="more">
                {" "}
                <br />
                <br />
                The major native language spoken in the Punjab is Punjabi, representing the largest language spoken in the country. Punjabi is recognized as the provincial language of Punjab but is not given any official recognition in the Constitution of Pakistan at the national level.
                <br />
                <br />
                Punjab's landscape consists mostly consists of fertile alluvial plains of the Indus River and its four major tributaries in Pakistan, the Jhelum, Chenab, Ravi, and Sutlej rivers which traverse Punjab north to south the fifth of the "five waters" of Punjab, the Beas River, lies exclusively in the Indian state of Punjab. The landscape is amongst the most heavily irrigated on earth and canals can be found throughout the province. Punjab also includes several mountainous regions, including the Sulaiman Mountains in the southwest part of the province, the Margalla Hills in the north near Islamabad, and the Salt Range which divides the most northerly portion of Punjab, the Pothohar Plateau, from the rest of the province. Sparse deserts can be found in southern Punjab near the border with Rajasthan and near the Sulaiman Range. Punjab also contains part of the Thal and Cholistan deserts. In the South, Punjab's elevation reaches 2,327 metres (7,635 ft)[citation needed] near the hill station of Fort Munro in Dera Ghazi Khan.
              </span>
            </p>
            <div className="d-flex justify-content-center">
              <button className="btnRead" onClick={() => readMore()} id="myBtn">
                Read more
              </button>
            </div>
          </div>
        </div>
        {/* End of introduction of city */}

        {/* Start of cities cards */}
        <div className="container text-center mt-5">
          <div className="row g-2">
            {tourCard.map((card) => {
              return (
                <div className="col-2">
              <div class="card text-bg-dark border-0">
                <img src="https://images.unsplash.com/photo-1601399681546-ff2983a355c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="card-img opacity-50" alt="..." />
                <div className="card-img-overlay d-flex align-items-center justify-content-center">
                  <div><h1 className="card-title text-black">Lahore</h1>
                    <Link to="/lahore"><button type="button" className="btn btn-primary moreBtn">View Details</button></Link>
                  </div>
                </div>
              </div>
            </div>
              );
            })}
          </div>
        </div>
        {/* End of cities cards */}
        <Footer />
      </div>
    </>
  )
}

export default Tours
