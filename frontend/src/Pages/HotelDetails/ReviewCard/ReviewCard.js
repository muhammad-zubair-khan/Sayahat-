import { Rating } from "@mui/material";
import React from "react";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      {/* <img src={profilePng} alt="User" /> */}
      <p>{review.name}</p>
      <Rating {...options} />
      <span
        className="reviewCardComment"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        {review.comment}
      </span>
    </div>
  );
};

export default ReviewCard;
