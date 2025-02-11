import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Checkout() {

    const [foodItem, setfoodItem] = useState([])
    const [status, setstatus] = useState(0)
    const [checkoutPrice, setcheckoutPrice] = useState(0)
    var temp = 0

    const email = useSelector((state) => state.user.name)
    const loggedIn = useSelector((state) => state.auth.loggedIn)

    useEffect(() => {
        const getFood = async () => {
            const response = await axios.post("https://food-ordering-website-l0hb.onrender.com/getcart", { email: email })
            const result = response.data.data
            setfoodItem(result.food)
            setstatus(response.data.status)
        }
        getFood()
    }, [email])

    useEffect(() => {
        for (var i = 0; i < foodItem.length; i++) {
            temp += foodItem[i].totalPrice
        }
        setcheckoutPrice(temp)
    }, [foodItem])


    return (
        <div id="root">
            <NavBar />
            {loggedIn ?
                status ?
                    <div className="container">
                        <h1 className="text-orange" style={{ margin: "10px", textAlign: "center", marginBottom: "20px" }}>Checkout</h1><hr></hr><br></br>
                        <div className="row">
                            {foodItem.map((food, index) => (
                                <div className="card" style={{ width: "18rem", margin: "10px" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{food.name}</h5><hr></hr>
                                        <h6 className="card-subtitle mb-2 text-muted bg-orange" style={{ borderRadius: "5px", textAlign: "center" }}>Portion-Size: {food.portion}</h6>
                                        <label className="card-text">Quantity: {food.quantity}</label><br></br>
                                        <label className="card-text">Total Price: Rs {food.totalPrice}</label>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <br></br><hr></hr>
                        <h3>Total Price: Rs {checkoutPrice}</h3>
                        <br></br><br></br>
                        <Link to={{ pathname: "/payment", state: { checkoutPrice } }} className='btn btn-success w-10 mb-0 checkout' style={{ marginLeft: "40vw" }}>Order</Link>
                        <Link className="btn btn-orange mx-1" to="/cart">My Cart</Link>
                    </div>
                    : <div><h1 className="text-orange" style={{ margin: "10px", textAlign: "center", marginBottom: "20px", marginTop: "30vh" }}>Log In To Your Account To Order</h1></div>
                : <div><h1 className="text-orange" style={{ margin: "10px", textAlign: "center", marginBottom: "20px", marginTop: "30vh" }}>Log In To Your Account To Order</h1></div>
            }
            <Footer />
        </div>
    )
}

export default Checkout