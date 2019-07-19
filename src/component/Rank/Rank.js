import React from "react";

const Rank = ({ rank }) => {
  return (
    <div>
      <div className="white f3">{`${rank.name} your current rank is ....`}</div>
      <div className="white f1">{`${rank.entries}`}</div>
    </div>
  );
};
export default Rank;
