import React from "react";
// import "../showdetails.css";

const mystyle = {
  backgroundColor: "rgb(146, 29, 192)",
  color: " rgb(195, 231, 222)",
  border: " 1px solid rgb(238, 75, 200)",
  width: " auto",
  height: "auto",
  borderRadius: " 22px",
  fontSize: "20px",
  padding: "30px",
  fontWeight: "800",
  margin: "50px",
};

const ShowDetails = ({ theData }) => {
  // console.log(theData.name[0])
  return (
    <div className="styling" style={mystyle}>
      Name:{theData.name}
      <br />
      Capital:{theData.capital}
      <br />
      Language:Native:{theData.languages[0].native}
      <br />
      Name:{theData.languages[0].name}
      <br />
      phone:{theData.phone}
      <br />
      currency:{theData.currency}
    </div>
  );
};

export default ShowDetails;
