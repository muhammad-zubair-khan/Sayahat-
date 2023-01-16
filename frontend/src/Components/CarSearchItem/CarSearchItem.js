import { Link, useHistory, useLocation } from "react-router-dom";
import "./CarSearchItem.css";
import { SearchContext } from "../../Context/SearchContext";
import { useContext, useState } from "react";
import { ImageUrl } from "../../Redux/UrlConfig";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

const CarSearchItem = ({ item }) => {
  const location = useLocation();
  const [startDestination, setStartDestination] = useState(
    location.state.state.startDestination
  );
  const [endDestination, setEndDestination] = useState(
    location.state.state.endDestination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [pickupTime, setPickupTime] = useState(location.state.state.pickupTime);
  const [dropoffTime, setDropoffTime] = useState(
    location.state.state.dropoffTime
  );

  const { dispatch } = useContext(SearchContext);
  const history = useHistory();

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        startDestination,
        endDestination,
        pickupTime,
        dropoffTime,
        dates,
      },
    });
    history.push(`/car/${item._id}`, {
      state: {
        startDestination,
        endDestination,
        pickupTime,
        dropoffTime,
        dates,
      },
    });
  };
  return (
    <>
      <Grid
        item
        xs={12}
        lg={4}
        style={{ marginTop: "39px", paddingLeft: "51px" }}
      >
        <Zoom>
          <img
            className="img-fluid"
            src={ImageUrl(item.carImages[0].img)}
            alt="SUV "
          />
        </Zoom>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Typography variant="h6">{item.name}</Typography>
        <span className="small-span">{item.title}</span>
        {item.reviews.length > 0 && (
          <p className="text-data" style={{ fontWeight: "bolder" }}>
            {item.ratings}/5 ({item.numOfReviews}){" "}
            {item.numOfReviews >= 1 ? "Review" : "Reviews"}
          </p>
        )}
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
          PKR {item.price}
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
