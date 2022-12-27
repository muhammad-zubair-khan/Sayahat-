import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import PlaceIcon from "@mui/icons-material/Place";
import "./CardSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "./Redux/Actions/hotelAction";
import { ImageUrl } from "./Redux/UrlConfig";

const swat = [
  // "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTI7dXAHON8IedSsXKr-VSieEFTYAs6HU_9SoKcWbiPpRsAzIznXMXpN4FLxgHdo14NS0hrvwoo3WfGNRZEo0nMVw",
  // "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ4A9utNyo5M0S-69hb7Q1aC4fE98cl1MUCLl7ktfl09SS9tU2LHfAEv-1k4g70bNVVU4-r9mC_AQrWuHRXTZnjAw",
  // "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSiJu877Mgz_R83j7t2_nvXALnepR1Z7BHYLnftisscLW7rIgybfPvKEpfDfmRxw06mTARqlzV4s9iWcqe1rUtZEA",
  // "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR7sYcmXrpUqLclODrY1rhS3Ose0Hvsh4C88RVyQT54_qwJIF1NQn1xhDXVgKn0KeBIm72Zr_myogp2BQlB0VTO-g",

];
const Kashmir = [
  "https://images.unsplash.com/photo-1629745493093-04f1d97b0411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmVlbGFtJTIwdmFsbGV5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://media.istockphoto.com/photos/beautiful-neelam-valley-and-kunhar-river-picture-id592381114?b=1&k=20&m=592381114&s=170667a&w=0&h=p2uaPGdQSBEQXUobFT1QGC_OHavZJ6vi8CAJ16MkKx8=",
  "https://media.istockphoto.com/photos/neelam-valley-picture-id954910164?b=1&k=20&m=954910164&s=170667a&w=0&h=gP8ak0d8T2S4EJ9hhxhkC-Bpc-Q-_wzsne3JALOJSPY=",
];
const Naran = [
  "https://media.istockphoto.com/photos/babusar-pass-picture-id1325468152?b=1&k=20&m=1325468152&s=170667a&w=0&h=Msd1JKbi-PX-U_UcpnjZpE98IdKeoFyvy3mIPhjhtAc=",
  "https://media.istockphoto.com/photos/babusar-top-picture-id1203098881?b=1&k=20&m=1203098881&s=170667a&w=0&h=FlaDyNfZyojFMBjDKpZ2dTnTComOKTNS3tSGZALyX88=",
  "https://media.istockphoto.com/photos/sunrise-dawn-of-babusar-top-mountains-in-pakistan-with-fog-and-green-picture-id1358451521?b=1&k=20&m=1358451521&s=170667a&w=0&h=1ktp0Sf4KFPm-h7j4p_3GeAfmjxzzuERoe16rojjIA8=",
];
const Isb = [
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8NaDpFJIJ2wrZV7Hnmgf1qcP-5PY8xFUvQi-vqeHBgJec4e9bsnHAVS6U4pqjt8WExxgjnPXvRtnzPaqctyly2Q",
  "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRBKlIn86qRXO5WxdGXBvib9EgcesEawJj8xiu2eYBzs1O9ZPThHgOdDB38zVUDrUuNvjwP37TM3FKqqDTfBnuCAg",
  "https://images.unsplash.com/photo-1608020932658-d0e19a69580b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFpc2FsJTIwbW9zcXVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
];

const CardSlider = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotelReducer);
  useEffect(() => {
    dispatch(getAllHotels());
  }, []);

  return (
    <Grid container>
      {hotels &&
        hotels.map((item, index) => {
          return (
            <>
              <Grid xs={12} lg={3} >
                <div style={{margin:'0px 10px'}}>

                <img src={ImageUrl(item.hotelImages[0].img)} style={{width: '100%',height:'180px'}} alt="Hotel Images" />
                   
                <PlaceIcon style={{color:'#de7a08'}} className='my-2'/>
                <span className="text-sm" style={{color:'#787878'}}>{item.city}</span>
                <h5 style={{color:'white',fontSize:'16px'}}>{item.name}</h5>
                {/* <h6>7 Days Tour on 2 person</h6> */}
                <span style={{color:'white'}}>{item.cheapestPrice} PKR</span>
                </div>

              </Grid>
            </>
          );
        })}
    </Grid>
  );
};

export default CardSlider;
