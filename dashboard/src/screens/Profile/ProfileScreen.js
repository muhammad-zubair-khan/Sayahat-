import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EditIcon from '@mui/icons-material/Edit';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth);
  console.log(admin);
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
                    <h4 style={{fontVariant:'small-caps'}}>{admin.fullName}</h4>
                    <small>
                      <cite>
                        Lahore, PAK{" "}
                        <i className="glyphicon glyphicon-map-marker"></i>
                      </cite>
                    </small>
                    <p>
                      <i className="glyphicon glyphicon-envelope"></i>
                      {admin.email}
                    
                      <br />
                      <i className="glyphicon glyphicon-gift"></i>June 02, 1998
                    </p>
                  </div>
                <Button variant="contained">Edit Profile <EditIcon/></Button>
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
