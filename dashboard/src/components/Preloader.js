
import React from 'react';
import { Image } from 'react-bootstrap';

// import ReactLogo from "../assets/img/technologies/react-logo-transparent.svg";
import WebLoader from '../assets/img/technologies/whitebg.png'

const Preloader = (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <Image className="loader-element animate__animated animate__jackInTheBox" src={WebLoader} height={40} />
    </div>
  );
};

export default Preloader;