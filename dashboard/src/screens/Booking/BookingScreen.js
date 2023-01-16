import { Link, useHistory } from "react-router-dom";
// import MetaData from "../../../components/layouts/MetaData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookedCar, getAllBookedCars } from "../../Redux/Actions/bookCarAction";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import axios from "axios";
import "./BookingScreen.css";
import {
  deleteBookedPackage,
  getAllBookedPackages,
} from "../../Redux/Actions/bookPackageAction";
import { deleteBookedHotel, getAllBookedHotels } from "../../Redux/Actions/bookHotelAction";

const BookingScreen = () => {
  const history = useHistory();
  let unreadCount = 0;
  const dispatch = useDispatch();
  const { bookedCars } = useSelector((state) => state.allBookedCars);
  const { bookedPackages } = useSelector((state) => state.allBookedPackages);
  const { bookedHotels } = useSelector((state) => state.allBookedHotels);
  useEffect(() => {
    dispatch(getAllBookedCars());
    dispatch(getAllBookedPackages());
    dispatch(getAllBookedHotels());
  }, [dispatch]);

  const deleteHotelHandler = (id) => {
    dispatch(deleteBookedHotel(id));
    history.go(0);
  };
  const deleteCarHandler = (id) => {
    dispatch(deleteBookedCar(id));
    history.go(0);
  };
  const deletePackageHandler = (id) => {
    dispatch(deleteBookedPackage(id));
    history.go(0);
  };

  const rows = [];
  bookedCars &&
    bookedCars.forEach((item) => {
      rows.splice(0, 0, {
        id: item._id,
        user: item.user,
        firstName: item.CarContactInfo.firstName,
        price: item.price,
        paidAt: item.paidAt,
        view: item.view,
      });
      if (item.view === "unread") {
        unreadCount = unreadCount + 1;
      }
    });

  const rows1 = [];
  bookedPackages &&
    bookedPackages.forEach((item) => {
      rows1.splice(0, 0, {
        id: item._id,
        user: item.user,
        firstName: item.contactInfo.firstName,
        price: item.price,
        paidAt: item.paidAt,
        view: item.view,
      });
      if (item.view === "unread") {
        unreadCount = unreadCount + 1;
      }
    });

  const rows2 = [];
  bookedHotels &&
    bookedHotels.forEach((item) => {
      rows2.splice(0, 0, {
        id: item._id,
        user: item.user,
        firstName: item.hotelContactInfo.firstName,
        price: item.price,
        paidAt: item.paidAt,
        view: item.view,
      });
      if (item.view === "unread") {
        unreadCount = unreadCount + 1;
      }
    });
  const changeView = (id) => {
    const changeViewUrl = `http://localhost:5000/api/admin/bookedCars/update`;
    try {
      axios.patch(`${changeViewUrl}/${id}`);
    } catch (err) {
      alert(err);
    }
  };
  const changeHotelView = (id) => {
    const changeHotelViewUrl = `http://localhost:5000/api/admin/bookedHotel/update`;
    try {
      axios.patch(`${changeHotelViewUrl}/${id}`);
    } catch (err) {
      alert(err);
    }
  };
  const changePackageView = (id) => {
    const changePackageViewUrl = `http://localhost:5000/api/admin/bookedPackage/update`;
    try {
      axios.patch(`${changePackageViewUrl}/${id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {/* <MetaData title={`Contact Us - Admin Dashboard`} /> */}
      <div className="dashboard container-fluid">
        <div className="productListContainer">
          <h1 id="productListHeading">All Cars Bookings</h1>
          <h6>Unread Message(s): {unreadCount}</h6>
          <table className="table" style={{ border: "1px solid #d6d6d6" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Name</th>
                <th>Price</th>
                <th>Paid At</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.id.substring(0, 15)}...
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.user.substring(0, 15)}...
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.firstName}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.price}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.paidAt}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/car/booking/details/${item.id}`,
                        params: { id: item.id },
                      }}
                    >
                      <Button onClick={() => changeView(item.id)}>
                        <LaunchIcon />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button onClick={() => deleteCarHandler(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 id="productListHeading">All Packages Bookings</h1>
          {/* <h6>Unread Message(s): {unreadCount}</h6> */}
          <table className="table" style={{ border: "1px solid #d6d6d6" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Name</th>
                <th>Price</th>
                <th>Paid At</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows1.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.id.substring(0, 15)}...
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.user.substring(0, 15)}...
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.firstName}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.price}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.paidAt}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/package/booking/details/${item.id}`,
                        params: { id: item.id },
                      }}
                    >
                      <Button onClick={() => changePackageView(item.id)}>
                        <LaunchIcon />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button onClick={() => deletePackageHandler(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 id="productListHeading">All Hotels Bookings</h1>
          {/* <h6>Unread Message(s): {unreadCount}</h6> */}
          <table className="table" style={{ border: "1px solid #d6d6d6" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Name</th>
                <th>Price</th>
                <th>Paid At</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows2.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.id.substring(0, 15)}...
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.user.substring(0, 15)}...
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.firstName}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.price}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    {item.paidAt}
                  </td>
                  <td
                    style={{
                      fontWeight: `${item.view === "unread" ? "bolder" : ""}`,
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/hotel/booking/details/${item.id}`,
                        params: { id: item.id },
                      }}
                    >
                      <Button onClick={() => changeHotelView(item.id)}>
                        <LaunchIcon />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button onClick={() => deleteHotelHandler(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingScreen;
