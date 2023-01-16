import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EditIcon from "@mui/icons-material/Edit";

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Sidebar>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6">
              <div className="well well-sm">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <img
                      src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                      width="70%"
                      alt=""
                      className="img-rounded img-responsive"
                    />
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <h4 style={{ fontVariant: "small-caps" }}>
                      {user.fullName}
                    </h4>
                    <p>
                      Status: <b>{user.role}</b>
                    </p>

                    <p>{user.email}</p>
                  </div>
                  <Button variant="contained">
                    Edit Profile <EditIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default ProfileScreen;
