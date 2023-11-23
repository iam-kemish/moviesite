import React, { useState } from "react";
import "./Star.css";
import Stars from "./Stars";

interface Rate {
  toRating: number;
  rating: number;
 
  setRating: (newRating : number) => void;
  // movieRating: number;
}
const Star: React.FC<Rate> = ({ toRating, rating, setRating }) => {
 
  const [hover, setHover] = useState(0);
  // console.log(typeof rating)
  const handleRate = (rating: number) => {
    setRating(rating);
   
    // console.log(rating)
  };

  return (
    <div>
      <div className="StarContainer">
        <div className="ChildContainer">
          {Array.from({ length: toRating }, (_, i) => {
            return (
              <Stars
                key={i}
                onRate={() => handleRate(i + 1)}
                full={hover >= i+1 ||rating >= i + 1}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(0)}
              />
            );
          })}
        </div>
        <p className="text">{hover || rating || ""}</p>
      </div>
    </div>
  );
};

export default Star;
