import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { getAllCars } from "../../../Redux/Actions/carAction";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
// import "./GetHotelBySlug.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { deleteCar } from "../../../Redux/Actions/carAction";
import { ImageUrl } from "../../../Redux/UrlConfig";

const AllCars = (props) => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);

  const deleteCarHandler = (id) => {
    dispatch(deleteCar(id));
    // history.go(0);
  };

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  const columns = [
    {
      field: "carImages",
      headerName: "Car img",
      minWidth: 290,
      minHeight: 200,
      flex: 0.5,
      renderCell: (params) => {
        console.log("params>>>", params);
        return (
          <div style={{ textAlign: "center" }}>
            <Zoom>
              <img
                src={ImageUrl(params.row.carImages[0].img)}
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
        field: "type",
        headerName: "Type",
        minWidth: 300,
        flex: 1,
      },
      // {
      //   field: "category",
      //   headerName: "Category",
      //   minWidth: 300,
      //   flex: 1,
      // },
      {
        field: "description",
        headerName: "Description",
        // type: "number",
        minWidth: 150,
        flex: 0.3,
      },
  
      {
        field: "price",
        headerName: "Fare",
        // type: "number",
        minWidth: 270,
        flex: 0.5,
      },
      {
        field: "mileage",
        headerName: "Mileage",
        // type: "number",
        minWidth: 270,
        flex: 0.5,
      },
      {
        field: "shuttle",
        headerName: "Shuttle",
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

            <Button onClick={() => deleteCarHandler(params.id)}>
              <DeleteIcon />
            </Button>
            {/* {console.log("ye wali>>>>>>>>>>>>>>>>>", params.id)} */}
          </>
        );
      },
    },
  ];

  const rows = [];

  cars &&
    cars.forEach((item) => {
      rows.push({
        id: item._id,
        carImages: item.carImages,
        name: item.name,
        type: item.type,
        description: item.description,
        price: item.price,
        mileage: item.mileage,
        passenger: item.passenger,
        shuttle:item.shuttle,
        // category:item.category
      });
    });
  return (
    <>
      <Sidebar>
        <Header />
        <div className="dashboard">
          <div className="productListContainer">
            <h1 id="productListHeading">ALL Cars</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="CarListTable"
              autoHeight
            />
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default AllCars;
