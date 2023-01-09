import { Link } from "react-router-dom";
// import MetaData from "../../../components/layouts/MetaData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookedCars } from "../../Redux/Actions/bookCarAction";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./MessageScreen.css";
import { getAllBookedPackages } from "../../Redux/Actions/bookPackageAction";
import { getAllBookedHotels } from "../../Redux/Actions/bookHotelAction";

const MessageScreen = () => {
  const history = useHistory();
  let unreadCount = 0;
  // let unreadCount = 0;
  const dispatch = useDispatch();
  const { bookedCars } = useSelector((state) => state.allBookedCars);
  console.log("car>>",bookedCars);
  const { bookedPackages } = useSelector((state) => state.allBookedPackages);
  console.log("packages>>",bookedPackages);
  const { bookedHotels } = useSelector((state) => state.allBookedHotels);
  console.log("hotels>>",bookedHotels);

  useEffect(() => {
    dispatch(getAllBookedCars());
    dispatch(getAllBookedPackages());
    dispatch(getAllBookedHotels());
  }, [dispatch]);
  const deleteMessageHandler = (id) => {
    // dispatch(deleteCar(id));
    // history.go(0);
  };
  const LaunchMessageHandler = (id) => {
    // dispatch(deleteCar(id));
    // history.go(0);
  };

  // const columns = [
  //   { field: "id", headerName: "ID", width: 100 },
  //   {
  //     field: "user",
  //     headerName: "User",
  //     minWidth: 100,
  //     flex: 1,
  //   },
  //   {
  //     field: "firstName",
  //     headerName: "User Name",
  //     minWidth: 200,
  //     flex: 1,
  //   },
  //   {
  //     field: "price",
  //     headerName: "Amount",
  //     // type: "number",
  //     minWidth: 200,
  //     flex: 0.5,
  //   },
  //   {
  //     field: "paidAt",
  //     headerName: "Paid At",
  //     // type: "number",
  //     minWidth: 150,
  //     flex: 0.3,
  //   },
  //   {
  //     field: "action",
  //     flex: 0.3,
  //     headerName: "Action",
  //     minWidth: 150,

  //     renderCell: (params) => {
  //       return (
  //         <>
  //           <Button onClick={() => changeView(params.id)}>
  //             <LaunchIcon />
  //           </Button>

  //           <Button onClick={() => deleteMessageHandler(params.id)}>
  //             <DeleteIcon />
  //           </Button>
  //         </>
  //       );
  //     },
  //   },
  // ];

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
      if (item.view == "unread") {
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
        if (item.view == "unread") {
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
          if (item.view == "unread") {
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
                        pathname: `/booking/details/${item.id}`,
                        params: { id: item.id },
                      }}
                    >
                      <Button onClick={() => changeView(item.id)}>
                        <LaunchIcon />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button onClick={() => deleteMessageHandler(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* {console.log(UnreadRow, ReadRow, rows)} */}
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
                        pathname: `/booking/details/${item.id}`,
                        params: { id: item.id },
                      }}
                    >
                      <Button onClick={() => changeView(item.id)}>
                        <LaunchIcon />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button onClick={() => deleteMessageHandler(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* {console.log(UnreadRow, ReadRow, rows)} */}
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
                        pathname: `/booking/details/${item.id}`,
                        params: { id: item.id },
                      }}
                    >
                      <Button onClick={() => changeView(item.id)}>
                        <LaunchIcon />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button onClick={() => deleteMessageHandler(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* {console.log(UnreadRow, ReadRow, rows)} */}
          </table>
          
        </div>
      </div>
    </>
  );
};

export default MessageScreen;
