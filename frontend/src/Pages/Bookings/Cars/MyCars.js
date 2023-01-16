import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../Packages/MyPackages.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LaunchIcon from "@mui/icons-material/Launch";
import { myCars } from "../../../Redux/Actions/bookCarAction";

const MyCars = () => {
  const dispatch = useDispatch();
  //   const alert = useAlert();

  const { loading, error, cars } = useSelector((state) => state.myCars);
  const { user } = useSelector((state) => state.auth);

  const columns = [
    { field: "id", headerName: "Car ID", minWidth: 300, flex: 1 },
    {
      field: "name",
      headerName: "Car Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "pickupDestination",
      headerName: "City",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
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
          <Link to={`/myCar/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  cars &&
    cars.forEach((item, index) => {
      rows.push({
        id: item._id,
        name: item.name,
        pickupDestination: item.pickupDestination,
        amount: item.price,
      });
    });

  useEffect(() => {
    // if (error) {
    // //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    dispatch(myCars());
  }, []);

  return (
    <Fragment>
      {/* <MetaData title={`${user.name} - Orders`} /> */}

      {loading ? (
        // <Loader />
        "Loading"
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.fullName}'s Cars</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyCars;
