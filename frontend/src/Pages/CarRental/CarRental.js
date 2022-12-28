import React, { useEffect } from 'react'
import Navbar from '../../Navbar/Navbar'
import Footer from "../../Footer/Footer";
import Search from "../Search/Search";
import CarList from "../Cars/CarList/CarList";
import { Container, Grid } from '@mui/material';
import SecNav from '../../Navbar/SecNav';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../../Redux/Actions/carAction';
import { ImageUrl } from '../../Redux/UrlConfig';

const CarRental = () => {
  const dispatch = useDispatch()
  const {cars} = useSelector((state)=> state.carsReducer)

  useEffect(() => {
    dispatch(getAllCars())
   },[]);
  // let hotels = [
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     city: 'Lahore',
  //     name: 'Nissan GTR',
  //     price: 69
  //   }
  // ]
  return (
    <>
    <div style={{ background: "rgb(0, 0, 0)", height: "75px" }}>
        <Navbar />
      </div>
      <SecNav/>
      <div className="container text-center my-5">
        {/* start of info of contact about car */}
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
        {/* end of info of contact about car */}

        {/* start of email sign up */}
        <div className='row my-5 g-2'>
          <div style={{ height: '250px' }} className='col-md-6'>
            <div className="card h-100">
              <img src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60" className="card-img h-100" alt="..." />
              <div className="card-img-overlay">
                <h2 className="card-title text-white text-start fw-bold">Sign up for Email-only Coupons</h2>
                <p className="card-text text-white text-start fs-5">Exclusive access to coupons, special offers and promotions.</p>
                <button type="button" className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
          <div style={{ height: '250px' }} className='col-md-6'>
            <div className="card h-100">
              <img src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60" className="card-img h-100" alt="..." />
              <div className="card-img-overlay">
                <h2 className="card-title text-white text-start fw-bold">Sign up for Email-only Coupons</h2>
                <p className="card-text text-white text-start fs-5">Exclusive access to coupons, special offers and promotions.</p>
                <button type="button" className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
        {/* end of email sign up */}

        {/* start of cars card */}
        <div className='row'>
          <h1 className='text-start text-primary fw-bold'>Don't miss these car deals</h1>
          <div className="container text-center">
            <div className="row">
              {cars.map((car) => {
                return (
                  <div className="col-md-4 my-3">
                    <div className="card h-100">
                      <div style={{display:'flex',justifyContent:'center'}}>
                      <img src={ImageUrl(car.carImages[0].img)}  className="card-img-top h-75 w-50 mt-3" alt="..." />

                      </div>
                      <div className="card-body">
                        <p className="card-text text-start">{car.city}</p>
                        <div className='row'>
                          <h5 className="card-title text-start fw-bold text-dark col-md-6">{car.name}</h5>
                          <h6 className="card-title text-end text-primary fw-bold col-md-6">From PKR {car.fare}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
        {/* end of car card */}

        {/* start of car list */}
        <div className='row my-5'>
          <h4 className='text-start text-primary fw-bold'>Top Car Deals in the Pakistan</h4>
          <div class="container">
            <div className="row">
              <div className="col">
                <ul className='list-unstyled text-start text-dark lh-lg'>
                  <li>Suzuki Alto</li>
                  <li>Toyota Yaris</li>
                  <li>Toyota Corolla</li>
                  <li>Suzuki Cultus</li>
                  <li>Suzuki WagonR</li>
                  <li>Honda City and Civic</li>
                  <li>Kia Sportage</li>
                  <li>Changan Alsvin</li>
                  <li>Suzuki Bolan</li>
                  <li>Honda BR-V</li>
                </ul>
              </div>
              <div className="col">
                <ul className='list-unstyled text-start text-dark lh-lg'>
                <li>Suzuki Alto</li>
                  <li>Toyota Yaris</li>
                  <li>Toyota Corolla</li>
                  <li>Suzuki Cultus</li>
                  <li>Suzuki WagonR</li>
                  <li>Honda City and Civic</li>
                  <li>Kia Sportage</li>
                  <li>Changan Alsvin</li>
                  <li>Suzuki Bolan</li>
                  <li>Honda BR-V</li>
                </ul>
              </div>
              <div className="col">
                <ul className='list-unstyled text-start text-dark lh-lg'>
                <li>Suzuki Alto</li>
                  <li>Toyota Yaris</li>
                  <li>Toyota Corolla</li>
                  <li>Suzuki Cultus</li>
                  <li>Suzuki WagonR</li>
                  <li>Honda City and Civic</li>
                  <li>Kia Sportage</li>
                  <li>Changan Alsvin</li>
                  <li>Suzuki Bolan</li>
                  <li>Honda BR-V</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* end of car list */}

      </div>
      <Footer />
    </>
  )
}

export default CarRental