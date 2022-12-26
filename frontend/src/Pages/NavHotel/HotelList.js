import React from 'react'
import Footer from '../../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
import SecNav from '../../Navbar/SecNav'

const HotelList = () => {
  let hotels = [
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    },
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    },
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    },
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    },
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    },
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    },
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    },
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    },
    {
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      city: 'Lahore',
      name: 'Avari Hotel',
      price: 69
    }
  ]
  return (
    <>
      <div style={{ background: "rgb(0, 0, 0)", height: "75px" }}>
        <Navbar />
      </div>
      <SecNav />
      <div className="container text-center my-5">
        <div className="row">
          <div className="col-md-3">
            <i className="fa-solid fa-shield-halved text-primary fs-3"></i>
            <p className='text-dark mt-2 fw-bold '>FLEXIBLE BOOKINGS</p>
            <small>Plans change. Thats why we offer free cancellation on most hotels & rental cars.</small>
          </div>
          <div className="col-md-3">
            <i className="fa-solid fa-hand-holding-dollar text-primary fs-3"></i>
            <p className='text-dark mt-2 fw-bold '>BOOK WITH CONFIDENCE</p>
            <small>Priceline members always get our best price.</small>
          </div>
          <div className="col-md-3">
            <i className="fa-solid fa-phone text-primary fs-3"></i>
            <p className='text-dark mt-2 fw-bold '>UNLOCK SPECIAL DISCOUNTS</p>
            <small>1 in 4 people save 20% or more over the phone. Call Now.</small>
          </div>
          <div className="col-md-3">
            <i className="fa-solid fa-circle-question text-primary fs-3"></i>
            <p className='text-dark mt-2 fw-bold '>HELP 24/7</p>
            <small>We are always here for you reach us 24 hours a day, 7 days a week.</small>
          </div>
        </div>

        <div className='row my-5 g-2'>
          <div style={{ height: '250px' }} className='col-md-6'>
            <div className="card h-100">
              <img src="https://images.unsplash.com/photo-1671540675978-472b34f36c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className="card-img h-100" alt="..." />
              <div className="card-img-overlay">
                <h2 className="card-title text-white text-start fw-bold">Sign up for Email-only Coupons</h2>
                <p className="card-text text-white text-start fs-5">Exclusive access to coupons, special offers and promotions.</p>
                <button type="button" className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
          <div style={{ height: '250px' }} className='col-md-6'>
            <div className="card h-100">
              <img src="https://images.unsplash.com/photo-1671540675978-472b34f36c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className="card-img h-100" alt="..." />
              <div className="card-img-overlay">
                <h2 className="card-title text-white text-start fw-bold">Sign up for Email-only Coupons</h2>
                <p className="card-text text-white text-start fs-5">Exclusive access to coupons, special offers and promotions.</p>
                <button type="button" className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <h1 className='text-start text-primary fw-bold'>Don't miss these hotel deals</h1>
          <div className="container text-center">
            <div className="row">
              {hotels.map((hotel) => {
                return (
                  <div className="col-md-4">
                    <div className="card">
                      <img src={hotel.image} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <p className="card-text text-start">{hotel.city}</p>
                        <div className='row'>
                          <h3 className="card-title text-start fw-bold text-dark col-md-6">{hotel.name}</h3>
                          <h3 className="card-title text-end text-primary fw-bold col-md-6">From ${hotel.price}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>

        <div className='row my-5'>
          <h4 className='text-start text-primary fw-bold'>Top Hotel Deals in the Pakistan</h4>
          <div class="container">
            <div className="row">
              <div className="col">
                <ul className='list-unstyled text-start text-dark lh-lg'>
                  <li>Lahore Hotel</li>
                  <li>Karachi Hotel</li>
                  <li>Islamabad Hotel</li>
                  <li>Multan Hotel</li>
                  <li>Peshawar Hotel</li>
                  <li>Faisalabad Hotel</li>
                  <li>Gujranwala Hotel</li>
                  <li>Rawalpindi Hotel</li>
                  <li>Hyderabad Hotel</li>
                  <li>Skardu Hotel</li>
                </ul>
              </div>
              <div className="col">
              <ul className='list-unstyled text-start text-dark lh-lg'>
                  <li>Lahore Hotel</li>
                  <li>Karachi Hotel</li>
                  <li>Islamabad Hotel</li>
                  <li>Multan Hotel</li>
                  <li>Peshawar Hotel</li>
                  <li>Faisalabad Hotel</li>
                  <li>Gujranwala Hotel</li>
                  <li>Rawalpindi Hotel</li>
                  <li>Hyderabad Hotel</li>
                  <li>Skardu Hotel</li>
                </ul>
              </div>
              <div className="col">
              <ul className='list-unstyled text-start text-dark lh-lg'>
                  <li>Lahore Hotel</li>
                  <li>Karachi Hotel</li>
                  <li>Islamabad Hotel</li>
                  <li>Multan Hotel</li>
                  <li>Peshawar Hotel</li>
                  <li>Faisalabad Hotel</li>
                  <li>Gujranwala Hotel</li>
                  <li>Rawalpindi Hotel</li>
                  <li>Hyderabad Hotel</li>
                  <li>Skardu Hotel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HotelList