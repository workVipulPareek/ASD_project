import React from "react";
import CarCard from "./CarCard";
import Data from "./Data";

function Buy() {
  return (
    <>
      <div className="main-body">
      <h1 className="text-center mt-3"> BUY YOUR DRIVE</h1>
      <section className="py-4 container"></section>
      <div className="row justify-content-center">
        {Data.ProductData.map((item , index) =>{
            return(
                <CarCard img={item.img} title={item.title} desc={item.desc} price={item.price} key ={index} />
            )
        })}
        </div>
      </div>
    </>
  );
}

export default Buy;
