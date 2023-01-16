import { useHistory, useLocation } from "react-router-dom";
import "./SearchItem.css";
import { SearchContext } from "../../Context/SearchContext";
import { useContext, useState } from "react";
import { ImageUrl } from "../../Redux/UrlConfig";

const SearchItem = ({ item }) => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state.state.destination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.state.options);

  const { dispatch } = useContext(SearchContext);
  const history = useHistory();
  

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    history.push(`/hotel/${item._id}`, {
      state: { destination, dates, options },
    });
  };
  // console.log(item)
  return (
    <div className="searchItem">
      <img src={ImageUrl(item.hotelImages[0].img)} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">
          {item.pool ? `Pool ${item.pool}` : "Free taxi to airport"}
        </span>
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
        {item.ratings > 0 ? (
          <div
            className="siRating"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <span style={{ lineHeight: "31px", marginRight: "15px" }}>
              Excellent
            </span>
            <button cursor="revert">{item.ratings}</button>
          </div>
        ) : (
          <span style={{ textAlign: "end", fontSize: "small" }}>
            No Reviews
          </span>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">PKR {item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          {/* <Link to={`/hotel/${item._id}`}> */}
          <button onClick={handleSearch} className="siCheckButton">
            See availability
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
