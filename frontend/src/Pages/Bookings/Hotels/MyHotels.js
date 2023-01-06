import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../Packages/MyPackages.css";
import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, myPackages } from "../../actions/orderAction";
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
// import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { clearErrors, myHotels } from "../../../Redux/Actions/bookHotelAction";

const MyHotels = () => {
  const dispatch = useDispatch();

//   const alert = useAlert();

  const { loading, error, hotels } = useSelector((state) => state.myHotels);
  const { user } = useSelector((state) => state.auth);

  const columns = [
    { field: "id", headerName: "Hotel ID", minWidth: 300, flex: 1 },
    {
        field: "name",
        headerName: "Hotel Name",
        minWidth: 150,
        flex: 0.5,
      },
    {
        field: "adult",
        headerName: "Adult",
        minWidth: 150,
        flex: 0.5,
      },
    {
        field: "children",
        headerName: "Chidlren",
        minWidth: 150,
        flex: 0.5,
      },
    {
        field: "room",
        headerName: "Room",
        minWidth: 150,
        flex: 0.5,
      },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   minWidth: 150,
    //   flex: 0.5,
    //   cellClassName: (params) => {
    //     return params.getValue(params.id, "status") === "Delivered"
    //       ? "greenColor"
    //       : "redColor";
    //   },
    // },
    {
      field: "selectedRooms",
      headerName: "Booked Rooms",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "fullyRefundable",
      headerName: "Refundable",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/myHotel/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  hotels &&
    hotels.forEach((item, index) => {
        rows.push({
            // itemsQty: item.orderItems.length,
            id: item._id,
            name:item.name,
            // BookedRooms: selectedRooms,
            adult:item.hotelActivityInfo.options[0].adult,
            children:item.hotelActivityInfo.options[0].children,
            room:item.hotelActivityInfo.options[0].room,
            // time:item.activityInfo.time,
            fullyRefundable:item.fullyRefundable,
            price: item.price,
        });
        console.log(hotels)
    });

  useEffect(() => {
    // if (error) {
    // //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    dispatch(myHotels());
  }, []);

  return (
    <Fragment>
      {/* <MetaData title={`${user.name} - Orders`} /> */}

      {/* {loading ? (
        <Loader />
      ) : ( */}
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.fullName}'s Hotels</Typography>
        </div>
      {/* )} */}
    </Fragment>
  );
};

export default MyHotels;