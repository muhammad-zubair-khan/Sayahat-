import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { getAllAdmins } from "../../Redux/Actions/adminActions";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const UserScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.allAdmins);
  const deleteUserHandler = (id) => {
    const deleteUrl = `https://sayahat-api.onrender.com/api/admin/user/delete`;
    try {
      axios.delete(`${deleteUrl}/${id}`);
      history.go(0);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    dispatch(getAllAdmins());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    // { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    {
      field: "firstName",
      headerName: "FirstName",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "LastName",
      // type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "email",
      headerName: "Email",
      // type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "role ",
      // type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "Action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,

      renderCell: (params) => {
        return (
          <>
            {/* <Link to={`/product/update/${params.getValue(params.id, "id")}`}>
              <MdModeEditOutline />
            </Link> */}

            <Button onClick={() => deleteUserHandler(params.id)}>
              {/* <Link to={`/admin/product/${params.id}`}>delete</Link> */}
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  admins &&
    admins.forEach((item) => {
      rows.push({
        id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        role: item.role,
      });
    });

  return (
    <>
      <Sidebar>
        <Header />
        <div className="dashboard">
          <div className="productListContainer">
            <h1 id="productListHeading">Registered Customers</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              style={{ fontWeight: "600" }}
            />
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default UserScreen;
