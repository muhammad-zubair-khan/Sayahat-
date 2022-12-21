import { Link, useHistory, useLocation } from "react-router-dom";
import "./CarSearchItem.css";
import { SearchContext } from "../../Context/SearchContext";
import { useContext, useState } from "react";
import useFetch from "../../hook/useFetch";
import { ImageUrl } from "../../Redux/UrlConfig";
import { Col } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

const CarSearchItem = ({ item }) => {
  // const [destination, setDestination] = useState("");
  // const [openDate, setOpenDate] = useState(false);
  // const [dates, setDates] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);
  // const [options, setOptions] = useState({
  //   adult: 1,
  //   children: 0,
  //   room: 1,
  // });
  const location = useLocation();
  const [startDestination, setStartDestination] = useState(
    location.state.state.startDestination
  );
  const [endDestination, setEndDestination] = useState(
    location.state.state.endDestination
  );
  // console.log(location.state.state.destination)
  const [dates, setDates] = useState(location.state.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [pickupTime, setPickupTime] = useState(location.state.state.pickupTime);
  const [dropoffTime, setDropoffTime] = useState(location.state.state.dropoffTime);

  const { dispatch } = useContext(SearchContext);
  const history = useHistory();
  
  const { data, loading, error, reFetch } = useFetch(
      `http://localhost:5000/api/cars?city=${startDestination}`
      );
    //   console.log("item>>>",data.carsByFare.under5k.length);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { startDestination,endDestination,pickupTime,dropoffTime, dates } });
    history.push(`/car/${item._id}`, {
      state: { startDestination,endDestination,pickupTime,dropoffTime, dates },
    });
  };
  return (
    <>
      {/* <Grid
        
      > */}
        <Grid
          item
          xs={12}
          lg={4}
          style={{ marginTop: "39px", paddingLeft: "51px" }}
        >
          <Zoom>
            <img
              className="img-fluid"
              src={ImageUrl(item.carImage[0].img)}
              alt="SUV "
            />
          </Zoom>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6">{item.name}</Typography>
          <span className="small-span">{item.title}</span>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={item.passenger} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary={item.mileage} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AutoAwesomeIcon />
              </ListItemIcon>
              <ListItemText primary={item.gear} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AirplaneTicketIcon />
              </ListItemIcon>
              <ListItemText primary={item.shuttle} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} lg={4} style={{ textAlign: "end" }}>
          <Typography
            variant="h5"
            style={{ color: "black", fontWeight: "bolder" }}
          >
            PKR {item.fare}
          </Typography>
          <h6 paragraph>per day</h6>
          <h6 paragraph>{`PKR total`}</h6>
          <Button variant="contained">
            <Link onClick={handleSearch} style={{ color: "white" }}>
              Continue
            </Link>
          </Button>
        </Grid>
      {/* </Grid> */}
    </>
  );
};

export default CarSearchItem;
