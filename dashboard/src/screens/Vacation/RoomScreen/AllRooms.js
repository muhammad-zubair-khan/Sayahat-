import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
// import "./GetHotelBySlug.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useHistory } from "react-router-dom";
import { getAllRooms } from "../../../Redux/Actions/roomAction";

const AllRooms = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.allRooms);

  const deleteRoomHandler = (id) => {
    // dispatch(deletePackage(id));
    history.go(0);
  };

  useEffect(() => {
    dispatch(getAllRooms());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      field: "RoomImages",
      headerName: "Room img",
      minWidth: 290,
      minHeight: 200,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Zoom>
              <img
                // src={ImageUrl(params.row.packageImages[0].img)}
                style={{ width: "20%", margin: "10px 10px" }}
                alt={params.row.name}
              />
            </Zoom>
          </div>
        );
      },
    },

    {
      field: "title",
      headerName: "Title",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "desc",
      headerName: "Description",
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
      field: "maxPeople",
      headerName: "Max People",
      // type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "roomNumbers",
      headerName: "Room Numbers",
      // type: "number",
      minWidth: 270,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div style={{ textAlign: "center" }}>
            {params.row.roomNumbers.map((item,index) => (
              <span key={index}>{ (index ? ',' : '') + item.number + 'and' + item.unavailableDates}</span>
            ))}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "created At",
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

            <Button onClick={() => deleteRoomHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  rooms &&
    rooms.forEach((item) => {
      rows.push({
        id: item._id,
        // roomImages: item.roomImages,
        title: item.title,
        price: item.price,
        desc: item.desc,
        maxPeople: item.maxPeople,
        roomNumbers: item.roomNumbers,
        createdAt: item.createdAt,
      });
    });
  return (
    <>
      <Sidebar>
        <Header />
        <div className="dashboard">
          <div className="productListContainer">
            <h1 id="productListHeading">ALL Rooms</h1>
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

export default AllRooms;
