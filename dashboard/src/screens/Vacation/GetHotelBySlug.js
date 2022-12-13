import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getAllHotels, getHotelBySlug } from "../../Redux/Actions/hotelAction";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import "./GetHotelBySlug.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { deleteHotel } from "../../Redux/Actions/hotelAction";

const GetHotelBySlug = (props) => {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotelReducer);

  const deleteHotelHandler = (id) => {
    dispatch(deleteHotel(id));
    // history.go(0);
  };

  useEffect(() => {
    const { match } = props;
  console.log(props);
    dispatch(getHotelBySlug(match.params.slug));
  }, [dispatch, props]);

  const columns = [
    {
      field: "hotelImage",
      headerName: "Hotel img",
      minWidth: 290,
      minHeight: 200,
      flex: 0.5,
      renderCell: (params) => {
        console.log("params>>>", params);
        return (
          <div style={{ textAlign: "center" }}>
            <Zoom>
              <img
                src={params.row.hotelImage}
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
      field: "pool",
      headerName: "Pool",
      // type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "Breakfast",
      headerName: "Breakfast",
      // type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "Hottub",
      headerName: "Hot tub",
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

            <Button onClick={() => deleteHotelHandler(params.id)}>
              <DeleteIcon />
            </Button>
            {/* {console.log("ye wali>>>>>>>>>>>>>>>>>", params.id)} */}
          </>
        );
      },
    },
  ];

  const rows = [];

  hotels &&
    hotels.forEach((item) => {
      rows.push({
        id: item._id,
        hotelImage: item.hotelImage,
        name: item.name,
        description: item.description,
        pool: item.pool,
        Breakfast: item.Breakfast,
        Hottub: item.Hottub,
        city:item.city,
        // category:item.category
      });
    });
  return (
    <>
      <Sidebar>
        <Header />
        <div className="dashboard">
          <div className="productListContainer">
            <h1 id="productListHeading">{`${props.match.params.slug} Hotels`}</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="HotelListTable"
              autoHeight
            />
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default GetHotelBySlug;
