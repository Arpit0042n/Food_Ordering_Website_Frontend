import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Search() {
    const [foodItem, setfoodItem] = useState([])
    const [price, setprice] = useState(0)
    const [quantity, setquantity] = useState(1)
    const [totalprice, settotalprice] = useState(0)

    const location = useLocation()
    const data = location.state?.item || ""

    const loggedIn = useSelector((state) => state.loggedIn)

    useEffect(() => {
        const getFood = async () => {
            const response = await axios.get("https://food-ordering-website-l0hb.onrender.com/food")
            const result = response.data.data
            setfoodItem(result)
        }
        getFood()
    }, [])

    useEffect(() => {
        settotalprice(quantity * price)
    }, [quantity, price])

    const filteredItems = foodItem.map(category => ({
        ...category,
        food: category.food.filter(food => {
            const searchTerm = data.toLowerCase()
            const foodName = food.name.toLowerCase()

            return foodName.includes(searchTerm)
        })
    })).filter(category => category.food.length > 0)

    return (
        <div>
            <NavBar />
            <div className="container d-flex container">
                {/* Modal Start */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-center fw-bold">
                                Log In To Add Items To Cart
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-orange" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal End */}
                {
                    filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div id={item.type.toLowerCase()} key={item._id} className="food-category m-2 mt-5" style={{ marginTop: "20px" }}>
                                {/* <div className="row"> */}
                                    {
                                        item.food.map((food, index) => (
                                            <div key={index} className="col-md-3 mb-4">
                                                <div className="card" style={{ width: "15rem", maxHeight: "470px", minHeight: "470px" }}>
                                                    <img src={food.image} className="card-img-top" alt={food.name} style={{ height: "150px", objectFit: "cover" }} />
                                                    <div className="card-body" style={{ minHeight: "200px", display: "flex", flexDirection: "column" }}>
                                                        <h5 className="card-title">{food.name}</h5>
                                                        <p className="card-text" style={{ flexGrow: 1, overflow: "hidden" }}>{food.description}</p>
                                                        <div className='container w-100'>
                                                            <select className='m-2 h-100 bg-orange text-white' onChange={(t) => setquantity(t.target.value)}>
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                                <option value={4}>4</option>
                                                                <option value={5}>5</option>
                                                                <option value={6}>6</option>
                                                            </select>
                                                            <select className='m-2 h-100 bg-orange text-white' onChange={(t) => setprice(t.target.value)}>
                                                                <option defaultValue value={0}>None</option>
                                                                <option value={food.half}>Half - Rs.{food.half}</option>
                                                                <option value={food.full}>Full - Rs.{food.full}</option>
                                                            </select>
                                                            <div className='d-inline h-100 fs-5'>Total Price: {totalprice}</div>
                                                        </div>
                                                        <hr />
                                                        {
                                                            loggedIn ? <></> : <button className='btn btn-orange w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Add to Cart</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            // </div>
                        ))
                    ) : (
                        <div>No matching items found</div>
                    )
                }
            </div>
        </div>
    );
}

export default Search
