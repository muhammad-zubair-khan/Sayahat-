import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookedCars } from "../../Redux/Actions/bookCarAction";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import axios from "axios";
import { useHistory } from "react-router-dom";


const MessageScreen = () => {
const history = useHistory()
  let unreadCount = 0;
  const dispatch = useDispatch();
  const { bookedCars } = useSelector((state) => state.allBookedCars);
  console.log(bookedCars)
 
  useEffect(() => {
    dispatch(getAllBookedCars());
  }, [dispatch]);
  const deleteMessageHandler = (id) => {
    // dispatch(deleteCar(id));
    // history.go(0);
  };
  const LaunchMessageHandler = (id) => {
    // dispatch(deleteCar(id));
    // history.go(0);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "User Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Amount",
      // type: "number",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "paidAt",
      headerName: "Paid At",
      // type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,

      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => changeView(params.id)}>
              <LaunchIcon />
            </Button>

            <Button onClick={() => deleteMessageHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  bookedCars &&
    bookedCars.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.user,
        firstName: item.CarContactInfo.firstName,
        price: item.price,
        paidAt: item.paidAt,
        view: item.view,
      });
      if(item.view == "unread"){
        unreadCount= unreadCount +1;
      }
    });
    const changeView = (id) => {
      const changeViewUrl = `http://localhost:5000/api/admin/bookedCars/update`;
      try {
        axios.patch(`${changeViewUrl}/${id}`);
      } catch (err) {
        alert(err);
      }
      history.push(`/booking/${id}`)
    };
  
  return (
    <div>
      <h1 id="productListHeading">ALL Bookings</h1>
      <Box
        sx={{
          "& .MuiDataGrid-cell":{
          fontWeight: `${bookedCars && bookedCars.map((item)=>(
            item.view == "unread" ? 700 : ""
          ))}}`
          }
        }}
      >

      <DataGrid
        rows={rows}
        columns={columns}
        // className={classes.root}
        pageSize={10}
        disableSelectionOnClick
        className="CarListTable"
        autoHeight
        checkboxSelection
        experimentalFeatures={{ newEditingApi: true }}
        />
        </Box>
    </div>
  );
};

export default MessageScreen;
