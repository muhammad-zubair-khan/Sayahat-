import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Footer from "../../Footer/Footer";

const Aboutus = () => {
  return (
    <>
      <div style={{ background: " rgb(0 0 0)", height: "75px" }}>
        <Navbar />
      </div>
      <img
        style={{ height: "50vh", objectFit: "cover" }}
        src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
        alt="Girl in a jacket"
        className="img-fluid w-100"
      />
      <div className='container py-5'>
        <div className='row'>
          <h2 className='text-black fw-bold'>About Sayahat:</h2>
          <p className='text-black'>Sayahat is a travel and tourism management system that is used to book a tour from anywhere in the world by a single dynamic website which will help the user to know all about the places and tour details in a single website. The admin can add packages to the website from certain travel agents and hotels by creating a tour page. Then the users can sign in and book each project, they can be confirmed by the admin on their manage booking page. The user can see the confirmation on their booking page. It is the easiest platform for all travelers which can be easily booked and know all the details. It is a dynamic and responsive web design The user of the tourism management system has access to all the information, including location, events, etc. The major goal is to assist in managing guests, hotels, food, and transportation.</p>

          <h3 className='text-black fw-bold'>Objective:</h3>
          <p className='text-black'>The main objective of the project on travel website is to manage the details of Travel, Tour, Hotel and Facility. It manages all the information about Travel, Customer, Facility. The purpose of project is to build an application program to reduce the manual work for managing the Travel, Tour, Customer. It tracks all the details about the Hotel, Facility.
            The aim of this project is to create a reliable application to help the tourists to travel the country and help our country and its people to generate revenue/income by doing so.
          </p>
          <ol className='text-black ps-5'>
            <li>To promote the tourism industry of Pakistan.</li>
            <li>To make an application that generates revenue for Pakistanis guides, hotels, and tourism destinations of Pakistan.</li>
            <li>To assist tourists (both internal and external) traveling to Pakistan.</li>
            <li>To improve quality of life for the local population.</li>
            <li>To promote understanding of different cultures.</li>
          </ol>

          <h3 className='text-black fw-bold'>Vision:</h3>
          <p className='text-black'>The major goal of the tour and travel management system is to give customers the greatest accommodations and travel options so they can reserve hotels, vacation packages, and bus tickets for trips. Our tour and travel management system were created to give users a search platform to locate the trip destinations of their choice. This is instead of to provide the best traveling services to the customers and travel agents. We have expanded tours and travel administration strategy to provide an exploration platform where a tourist can find their trip spots according to their choices.
            <br /> <br />
            This strategy helps to encourage safe and interesting travel so that people can enjoy their vacations in their preferred locations. Additionally, this method promotes the growth of tourism among other communities and cultures in order to enrich the traveler’s adventure and sense of accomplishment. We develop this system to establish and broaden the framework of tourism, which offers positive possibilities for visitors and locals to engage and enhances knowledge of other cultures, traditional ways of life, traditional knowledge, and traditional morals. Additionally, this technology offers a better approach to connect with diverse events.
          </p>



        </div>
      </div>

      <div className="card text-white">
        <img style={{ height: "50vh" }} src="https://cf.bstatic.com/static/img/content-title/worldmap/f2a50226965b22a7839b84893900094996ae6a38.png" className='img-fluid' alt="Girl in a jacket" />
        <div className="card-img-overlay">
          <p className="card-text text-white container text-center pt-5 mt-5">Travelling beyond one's own country or region for personal, business-related, or professional reasons is known as tourism and affects society, culture, and the economy. It is a multifaceted commercial activity that has a high capacity for job creation due to its labor-intensive nature, revenue generation through tax collection, typically from the hotel sectors, earnings of massive foreign exchange and the prelation of cross-cultural apprehension and cooperation, business opportunities for entrepreneurs, and national economic development. This industry contributes to rapid and widespread economic growth, the reduction of poverty, and the upkeep of peace. It is also referred to be the greatest voluntary transfer of funds from wealthy to developing countries. Global tourism has grown in importance in many economies throughout the world over the past several decades. By offering part-time work, tourism may also be a source of income for many other individuals, including children, parents, pensioners, and others. By facilitating intermediation and creating a conduit across cultures, the role of international tourism is crucial in promoting world peace. The following two methods are used by destination nations to enhance the level of family wages at the micro level. First, it encourages efficiency through increased competition among tourism-related businesses, and second, it supports the use of economies of scale in local businesses. The growth of tourism raises household income and creates jobs in both the official and informal sectors of the destination nation. It may be a sector that both promotes economic growth and helps to alleviate severe family poverty. Higher exports and trade growth are likely to benefit the nations with a larger outbound business travel market.
          </p>
        </div>
      </div>

      <div className='container py-4'>
        <div className='row'>
          <h3 className='text-black fw-bold pb-1'>What Sayahat Offers:</h3>
          <b className='text-black'>Incredible Selection</b>
          <p className='text-black'>Whether you want to stay in a chic city apartment, a luxury beach resort, or a cozy B&B in the countryside, Booking.com gives you amazing diversity and variety of choice – all in one place.</p>
          <b className='text-black'>Low Rates</b>
          <p className='text-black'>Sayahat guarantees to offer you the best available rates. And with our promise to price match, you can rest assured that you’re always getting a great deal.</p>
          <b className='text-black'>Instant Confirmation</b>
          <p className='text-black'>At Sayahat, every reservation is instantly confirmed. When you find your perfect stay, a few clicks are all it takes.</p>
          <b className='text-black'>No Reservation Fees</b>
          <p className='text-black'>We don’t charge you any booking fees or add any administrative charges. And in many cases, your booking can be canceled free of charge.</p>
          <b className='text-black'>Secure Booking</b>
          <p className='text-black'>We facilitate hundreds of thousands of transactions every day through our secure platform and work to the highest standards to guarantee your privacy.</p>
          <b className='text-black'>24/7 Support</b>
          <p className='text-black'>Whether you’ve just booked or are already enjoying your trip, our Customer Experience Team is available around the clock to answer your questions and advocate on your behalf in more than 40 languages.</p>
        </div>
      </div>

      <div className='container-fluid bg-dark text-center'>
        <h1 className='pt-5 text-white'>Save time, save money!</h1>
        <h5 className='text-white pb-2'>Sign up and we'll send the best deals to you</h5>
        <div className='container d-flex justify-content-center pb-5'>
          <div className='row g-2'>
            <div className=' col-md-8'>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your email address" aria-label="email" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className=' col-md-4'>
              <button type="button" className="btn btn-primary h-75">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Aboutus