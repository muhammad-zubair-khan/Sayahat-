import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { getAllPackages } from "../../../Redux/Actions/packageAction";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
// import "./GetHotelBySlug.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { deletePackage } from "../../../Redux/Actions/packageAction";
import { useHistory } from "react-router-dom";

const AllPackages = (props) => {
    const history = useHistory();
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.packagesReducer);

  const deletePackageHandler = (id) => {
    dispatch(deletePackage(id));
    history.go(0);
  };

  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  const columns = [
    {
      field: "packageImage",
      headerName: "Package img",
      minWidth: 290,
      minHeight: 200,
      flex: 0.5,
      renderCell: (params) => {
        console.log("params>>>", params);
        return (
          <div style={{ textAlign: "center" }}>
            <Zoom>
              <img
                src={params.row.packageImage}
                style={{ width: "20%", margin: "10px 10px" }}
                alt={params.row.name}
              />
            </Zoom>
          </div>
        );
      },
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      // type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "duration",
      headerName: "Duration",
      // type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "refundable",
      headerName: "Refundable",
      // type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,

      renderCell: (params) => {
        return (
          <>
            {/* <Link to={`/product/update/${params.getValue(params.id, "id")}`}>
              <MdModeEditOutline />
            </Link> */}

            <Button onClick={() => deletePackageHandler(params.id)}>
              <DeleteIcon />
            </Button>
            {/* {console.log("ye wali>>>>>>>>>>>>>>>>>", params.id)} */}
          </>
        );
      },
    },
  ];

  const rows = [];

  packages &&
    packages.forEach((item) => {
      rows.push({
        id: item._id,
        packageImage: item.packageImage,
        name: item.name,
        price: item.price,
        description: item.description,
        duration: item.duration,
        refundable: item.refundable,
        city: item.city,
        // category:item.category
      });
    });
  return (
    <>
      <Sidebar>
        <Header />
        <div className="dashboard">
          <div className="productListContainer">
            <h1 id="productListHeading">ALL Packages</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="PackageListTable"
              autoHeight
            />
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default AllPackages;
