import React from "react";

const CarCard = (props) => {
  return (
    <div className="col-11 col-md-6 col-lg-3 mx-5 mb-4">
      <div class="card p-0 overflow-hidden h-100 shadow">
        <img src={props.img} class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <h5 class="card-price">{props.price}</h5>
          <p class="card-text">{props.desc}</p>
          <button class="btn btn-success">
            BUY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
