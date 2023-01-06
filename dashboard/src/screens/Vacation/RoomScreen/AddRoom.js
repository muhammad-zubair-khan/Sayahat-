import "./AddRoom.css";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { roomInputs } from "../../../formSource";
import useFetch from "../../../hooks/useFetch";
import axios from "../../../Redux/helpers/axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../../Redux/Actions/hotelAction";
import { useHistory, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { TextareaAutosize } from "@mui/material";

const AddRoom = () => {
  const history = useHistory();
  const params = useParams();
  // const {hotelId} = params
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(params.hotelId);
  const [rooms, setRooms] = useState([]);
  console.log(hotelId);
  //   const { data, loading, error } = useFetch(
  //     "http://localhost:5000/api/all-hotels"
  //   );
  const { hotels } = useSelector((state) => state.hotelReducer);
  console.log(hotels);
  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/admin/create/${hotelId}`, {
        ...info,
        roomNumbers,
      });
    } catch (err) {
      console.log(err);
    }
    alert("Room Added Successfully");
    history.push("/all-rooms");
  };

  return (
    <Sidebar>
      <Header />
      <div className="new">
        {/* <Sidebar /> */}
        <div className="newContainer">
          {/* <Navbar /> */}
          <div className="top">
            <h1>Add New Room</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form>
                {roomInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label>Rooms</label>
                  <TextareaAutosize
                    placeholder="give comma between room numbers."
                    required
                    id="outlined-required"
                    style={{ width: 400, height: 50 }}
                    className="text-area"
                    onChange={(e) => setRooms(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Choose a hotel</label>
                  <select
                    style={{height:'60px'}}
                    id="hotelId"
                    onChange={(e) => setHotelId(e.target.value)}
                  >
                    {hotels &&
                      hotels.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                  </select>
                </div>
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AddRoom;
