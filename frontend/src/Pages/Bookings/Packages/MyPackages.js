import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyPackages.css";
import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
// import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  clearErrors,
  myPackages,
} from "../../../Redux/Actions/bookPackageAction";

const MyPackages = () => {
  const dispatch = useDispatch();

  //   const alert = useAlert();

  const { loading, error, packages } = useSelector((state) => state.myPackages);
  const { user } = useSelector((state) => state.auth);
  const columns = [
    { field: "id", headerName: "Package ID", minWidth: 300, flex: 1 },
    {
      field: "name",
      headerName: "Package Name",
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
      field: "time",
      headerName: "Pickup Time",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "refundable",
      headerName: "Refundable",
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
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/myPackage/${params.getValue(params.id, "id")}`,
                params: { id: params.getValue(params.id, "id") },
              }}
            >
              <LaunchIcon />
            </Link>
          </>
        );
      },
    },
  ];
  const rows = [];

  packages &&
    packages.forEach((item, index) => {
      rows.push({
        id: item._id,
        name: item.name,
        adult: item.activityInfo.options[0].adult,
        children: item.activityInfo.options[0].children,
        time: item.activityInfo.time,
        refundable: item.refundable,
        amount: item.price,
      });
    });
  useEffect(() => {
    // if (error) {
    // //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    dispatch(myPackages());
  }, [dispatch]);

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
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">
            {user.fullName}'s Packages
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyPackages;
