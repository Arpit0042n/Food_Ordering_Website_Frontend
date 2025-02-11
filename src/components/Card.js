import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Card() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const email = useSelector(state => state.user.name);
    const [foodItem, setfoodItem] = useState([]);

    useEffect(() => {
        const getFood = async () => {
            const response = await axios.get("https://food-ordering-website-l0hb.onrender.com/food");
            const result = response.data.data;
            setfoodItem(result);
        };
        getFood();
    }, []);

    return (
        <div className="container">
            {foodItem.map((item) => (
                <div id={item.type.toLowerCase()} key={item._id} className="food-category mb-10">
                    <h2>{item.type}</h2>
                    <hr style={{ marginBottom: "20px" }} />
                    <div className="row">
                        {item.food.map((food, index) => (
                            <FoodCard
                                key={index}
                                food={food}
                                loggedIn={loggedIn}
                                email={email}
                            />
                        ))}
                    </div>
                </div>
            ))}
            {/* Modal1 */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center fw-bold text-danger">
                            !!! Log In To Add Items In Cart !!!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-orange" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal2 */}
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center fw-bold">
                            Item Added Successfully
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-orange" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const handleCart = async (food, qty, tprice, email,price) => {
    const portion = price === food.half?"half":"full"
    if(tprice  === 0)
    {
        tprice = qty * food.full
    }
    
    const foodWithDetails = {
        ...food,
        quantity: qty,
        totalPrice: tprice,
        portion: portion
    };
    const data = {
        email: email,
        food: foodWithDetails
    };

    await axios.post("https://food-ordering-website-l0hb.onrender.com/addcart", data);
};

function FoodCard({ food, loggedIn, email }) {
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(quantity * price);
    }, [quantity, price]);

    return (
        <div className="col-md-3 mb-4">
            <div className="card" style={{ width: "15rem", maxHeight: "470px", minHeight: "470px" }}>
                <img src={food.image} className="card-img-top" alt={food.name} style={{ height: "150px", objectFit: "cover" }} />
                <div className="card-body" style={{ minHeight: "200px", display: "flex", flexDirection: "column" }}>
                    <h5 className="card-title">{food.name}</h5>
                    <p className="card-text" style={{ flexGrow: 1, overflow: "hidden" }}>{food.description}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-orange text-white' onChange={(e) => setQuantity(Number(e.target.value))}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                        </select>
                        <select className='m-2 h-100 bg-orange text-white' onChange={(e) => setPrice(Number(e.target.value))}>
                            <option defaultvalue={food.half}>Half - Rs.{food.half}</option>
                            <option value={food.full}>Full - Rs.{food.full}</option>
                        </select>
                        <div className='d-inline h-100 fs-5'>Total Price: {totalPrice}</div>
                    </div>
                    <hr />
                    {loggedIn ?
                        <button className='btn btn-orange w-100' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => handleCart(food, quantity, totalPrice, email,price)}>Add to Cart</button>
                        : <button className='btn btn-orange w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Add to Cart</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;