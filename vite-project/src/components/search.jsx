import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/search.css";

const SearchPage = () => {
    const [filters, setFilters] = useState({
        engineType: "",
        engineCapacity: "",
        bodyStyle: "",
        materialUsed: "",
        suspensionType: "",
        brakes: "",
        steeringType: "",
        fuelTankCapacity: "",
        batteryCapacity: "",
        parkingAssistance: "",
        priceRange: "",
        name: "",
        company: "",
        launchYear: ""
    });

    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        if (Object.values(filters).every(value => value === "")) {
            alert("Please enter at least one filter criteria.");
            return;
        }
        try {
            const response = await axios.get("http://localhost:4000/search", { params: filters });
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const resetFilters = () => {
        setFilters({
            engineType: "",
            engineCapacity: "",
            bodyStyle: "",
            materialUsed: "",
            suspensionType: "",
            brakes: "",
            steeringType: "",
            fuelTankCapacity: "",
            batteryCapacity: "",
            parkingAssistance: "",
            priceRange: "",
            name: "",
            company: "",
            launchYear: ""
        });
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filterOptions = {
        engineType: ["Petrol", "Diesel", "Hybrid", "Electric"],
        engineCapacity: ["1.0L", "2.0L", "V6", "V8"],
        bodyStyle: ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Pickup Truck"],
        materialUsed: ["Aluminum", "Carbon Fiber", "Steel"],
        suspensionType: ["Independent", "Solid Axle"],
        brakes: ["Drum Brakes", "Disc Brakes"],
        steeringType: ["Hydraulic", "Electric Power Steering"],
        fuelTankCapacity: ["40L", "70L+"],
        batteryCapacity: ["40 kWh", "100 kWh"],
        parkingAssistance: ["Rear Camera", "360-degree Camera", "Automatic Parking"],
        priceRange: ["<$20,000", "$20,000 - $50,000", ">$50,000"],
    };

    return (
        <div className="search-container">
            <h2 className="title">Search Cars</h2>

            {/* Filter Section */}
            <div className="filter-container">
                {Object.keys(filters).map((key) =>
                    filterOptions[key] ? (
                        <select key={key} name={key} className="filter" value={filters[key]} onChange={handleChange}>
                            <option value="">{key.replace(/([A-Z])/g, " $1").trim()}</option>
                            {filterOptions[key].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            key={key}
                            type="text"
                            name={key}
                            placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                            className="filter"
                            value={filters[key]}
                            onChange={handleChange}
                        />
                    )
                )}
            </div>

            {/* Search & Reset Buttons */}
            <div className="search-btn-container">
                <button onClick={fetchCars} className="search-btn">🔍 Search</button>
                <button onClick={resetFilters} className="reset-btn">🔄 Reset Filters</button>
            </div>

            {/* Car Listings */}
            <div className="car-list">
                {cars.length === 0 ? (
                    <p className="no-cars">No cars found. Try adjusting your filters.</p>
                ) : (
                    cars.map((car) => (
                        <div key={car._id} className="car-box">
                            {/* Image Section */}
                            <div className="car-image">
                                <img src={car.image} alt={car.name} />
                            </div>

                            {/* First Column - Company to Suspension + Buy Button */}
                            <div className="car-info">
                                <h3 className="car-name">{car.name} ({car.launchYear})</h3>
                                <p><strong>Company:</strong> {car.company}</p>
                                <p><strong>Engine:</strong> {car.engineType} - {car.engineCapacity}</p>
                                <p><strong>Body Style:</strong> {car.bodyStyle}</p>
                                <p><strong>Material:</strong> {car.materialUsed}</p>
                                <p><strong>Suspension:</strong> {car.suspensionType}</p>
                                <button className="buy-btn">🛒 Buy Now</button>
                            </div>

                            {/* Second Column - Rest of Details + Add to Cart Button */}
                            <div className="car-info">
                                <p><strong>Brakes:</strong> {car.brakes}</p>
                                <p><strong>Steering:</strong> {car.steeringType}</p>
                                <p><strong>Fuel Tank:</strong> {car.fuelTankCapacity}</p>
                                <p><strong>Battery:</strong> {car.batteryCapacity}</p>
                                <p><strong>Parking Assistance:</strong> {car.parkingAssistance}</p>
                                <p><strong>Price:</strong> ${car.price}</p>
                                <button className="cart-btn">➕ Add to Cart</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchPage;
