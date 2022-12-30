import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { getAllAdmins } from "../../Redux/Actions/adminActions";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const UserScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.allAdmins);
  // const {admins} = useSelector((state) => state.allAdmins)
  // console.log(admins)
  const deleteUserHandler = (id) => {
    const deleteUrl = `http://www.localhost:5000/api/admin/user/delete`;
    try {
      axios.delete(`${deleteUrl}/${id}`);
      history.go(0);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    dispatch(getAllAdmins());
  }, []);

  //   dispatch(getAllAdmins())
  //   console.log(admins)
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

            <Button 
            onClick={() => deleteUserHandler(params.id)}
            >
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
        {/* <div className="container-lg">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-8">
                    <h2>
                      All Users <b>Details</b>
                    </h2>
                  </div>
                  <div className="col-sm-4">
                    <button type="button" className="btn btn-info add-new">
                      <i className="fa fa-plus"></i> Add New
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>Administration</td>
                    <td>(171) 555-2222</td>
                    <td>
                 
                      <Link to="/delete">
                        <DeleteIcon />
                      </Link>
                      <Link to="/view">
                        <VisibilityIcon />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Peter Parker</td>
                    <td>Customer Service</td>
                    <td>(313) 555-5735</td>
                    <td>
                      <Link to="/delete">
                        <DeleteIcon />
                      </Link>
                      <Link to="/view">
                        <VisibilityIcon />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Fran Wilson</td>
                    <td>Human Resources</td>
                    <td>(503) 555-9931</td>
                    <td>
                      <Link to="/delete">
                        <DeleteIcon />
                      </Link>
                      <Link to="/view">
                        <VisibilityIcon />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </Sidebar>
    </>
  );
};

export default UserScreen;
