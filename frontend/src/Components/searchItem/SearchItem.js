import { Link, useHistory, useLocation } from "react-router-dom";
import "./SearchItem.css";
import { SearchContext } from "../../Context/SearchContext";
import { useContext, useState } from "react";
import useFetch from "../../hook/useFetch";
import { ImageUrl } from "../../Redux/UrlConfig";


const SearchItem = ({ item }) => {
  
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
  const [destination, setDestination] = useState(
    location.state.state.destination
  );
  // console.log(location.state.state.destination)
  const [dates, setDates] = useState(location.state.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { dispatch } = useContext(SearchContext);
const history = useHistory()
  // console.log(item)

  // const { data, loading, error, reFetch } = useFetch(
  //   `http://localhost:5000/api/hotels?city=${destination}&min=${min || 0}&max=${
  //     max || 99999
  //   }`
  // );

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    history.push(`/hotel/${item._id}`, {state: { destination, dates , options }});
  };
// console.log(item)
  return (
    <div className="searchItem">
      <img src={ImageUrl(item.hotelImages[0].img)} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">{item.pool ? `Pool ${item.pool}` : "Free taxi to airport"}</span>
        {/* <span className="siTaxiOp">{item.Breakfast ? `Breakfast ${item.Breakfast}` : "free taxi"}</span> */}
        <span className="siSubtitle">
          {/* Studio Apartment with Air conditioning */}
          {item.title}
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.ratings && <div className="siRating">
          <span>Excellent</span>
          <button cursor="revert">{item.ratings}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">PKR {item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          {/* <Link to={`/hotel/${item._id}`}> */}
          <button onClick={handleSearch} className="siCheckButton">See availability</button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;