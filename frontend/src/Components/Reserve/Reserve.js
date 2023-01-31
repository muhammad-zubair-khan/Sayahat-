import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./Reserve.css";
import useFetch from "../../hook/useFetch";
import {  useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reserve = ({ setOpen, hotelId, totalPrice }) => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [destination, setDestination] = useState(
    location.state.state.destination
  );
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `https://sayahat-api.onrender.com/api/room/${hotelId}`
  );
  // const { dates } = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };



  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const history = useHistory();

  const handleClick = async () => {
    if (auth.authenticate) {
      try {
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(
              `https://sayahat-api.onrender.com/api/rooms/availability/${roomId}`,
              {
                dates: alldates,
              }
            );
            return res.data;
          })
          );
          setOpen(false);
        toast.success(`Room is Booked Successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setTimeout(() => {
          history.push(`/hotel/${id}/contactDetail`, {
            state: { destination, dates, options, selectedRooms, totalPrice, },
          });
        }, 3000);
      } catch (err) {
        console.log(err)
      }
    } else {
      toast.error(`Booking is Failed please login first`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setTimeout(() => {
        history.push("/login");
      }, 2000);
      // history.push("/login");
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.list &&
          data.list.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">PKR: {item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label htmlFor="roomNumber" >{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Reserve;
