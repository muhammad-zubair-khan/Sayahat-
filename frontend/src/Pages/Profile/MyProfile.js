import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./MyProfile.css";

const MyProfile = ({ history }) => {
  const { user, loading, authenticate } = useSelector((state) => state.auth);
  console.log(user);
  useEffect(() => {
    if (authenticate === false) {
      history.push("/login");
    }
  }, [history, authenticate]);
  return (
    <Fragment>
      {loading ? (
        // <Loader />
        "Loading"
      ) : (
        <Fragment>
          {/* <MetaData title={`${user.name}'s Profile`} /> */}
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {/* <img src="" alt={user.fullName} /> */}
              <div
            className="fullName"
            style={{
              textTransform: 'uppercase',
              // background: 'rgb(247, 133, 54)',
              background: 'rgb(68 68 68)',
              color: 'white',
              borderRadius: '100%',
              padding: '49px',
              fontSize: '41px',
            }}
          >
            {user.firstName.substring(0,1)}{user.lastName.substring(0,1)}
          </div>
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.fullName}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/myPackages">My Packages</Link>
                <Link to="/myHotels">My Hotels</Link>
                <Link to="/myCars">My Cars</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyProfile;
