import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Cart() {

    const [foodItem, setfoodItem] = useState([])
    const [status, setstatus] = useState(0)
    const [address, setaddress] = useState("")
    const [flag, setflag] = useState(1)

    const email = useSelector((state) => state.user.name)
    const navigate = useNavigate()

    useEffect(() => {
        const getFood = async () => {
            const response = await axios.post("https://food-ordering-website-l0hb.onrender.com/getcart", { email: email })
            const result = response.data.data
            setfoodItem(result.food)
            setstatus(response.data.status)
        }
        getFood()
    }, [email])

    const handleRemove = async (food) => {
        const data = {
            email: email,
            food: food
        }
        const result = await axios.post("https://food-ordering-website-l0hb.onrender.com/removecart", data)
        console.log(result.data)
        if (result.data.status === 1) {
            const updatedCart = await axios.post("https://food-ordering-website-l0hb.onrender.com/getcart", { email: email });
            const updatedResult = updatedCart.data;
            setfoodItem(updatedCart.data.data.food);
            setstatus(updatedResult.data.food.length > 0 ? 1 : 0)
        }
    }

    const handleAddress = ()=>{
        console.log(address)
        if(address === "")
            setflag(0)
        else
            navigate('/checkout')
    }

    return (
        <div id="root">
            <NavBar />
            {  status ?
                <div className="container">
                    <h1 className="text-orange" style={{ margin: "10px", textAlign: "center", marginBottom: "20px" }}>Your Cart</h1><hr></hr><br></br>
                    <div className="row">
                        {foodItem.map((food, index) => (
                            <div key={index} className="col-md-3 mb-4">
                                <div className="card" style={{ width: "15rem", maxHeight: "450px", minHeight: "450px" }}>
                                    <img src={food.image} className="card-img-top" alt={food.name} style={{ height: "150px", objectFit: "cover" }} />
                                    <div className="card-body" style={{ minHeight: "200px", display: "flex", flexDirection: "column" }}>
                                        <h5 className="card-title">{food.name}</h5><hr></hr>
                                        <div className='container w-100'>
                                            <div className='d-inline h-100 bg-orange text-white p-1' style={{ borderRadius: "5px" }} >Portion-Size: {food.portion}</div>
                                        </div>
                                        {food.portion === "half" ?
                                            <div style={{ marginTop: "5px", marginLeft: "12px", fontWeight: "bold" }} >Price: Rs {food.half}</div>
                                            : <div style={{ marginTop: "5px", marginLeft: "12px", fontWeight: "bold" }} >Price: Rs {food.full}</div>}

                                        <div style={{ marginLeft: "12px", marginTop: "5px", fontWeight: "bold" }}>Quantity: {food.quantity}</div>
                                        <hr />
                                        <div className='d-inline h-100 fs-5'>Total Price: {food.totalPrice}</div>
                                        <button className='btn btn-orange w-100 mt-2' onClick={() => { handleRemove(food) }}>Remove Item</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div><hr/>
                    <label style={{fontSize:"28px",fontFamily:"monospace"}}>Address: </label> 
                    <input type='text' placeholder='Enter Address...' style={{padding:"8px",marginLeft:"10px",border:"0",borderRadius:"5px"}}
                    onChange={(t)=>setaddress(t.target.value)}/>
                    <br/>
                    {
                        !flag?<div style={{fontSize:"24px",color:"red",textAlign:"center"}}>!!!Enter Address To Continue!!!</div>:<></>
                    }<br/><br/>
              <button className='btn btn-success w-10 mb-0 pt-2 pb-2' style={{ marginLeft: "37vw",padding:"30px"}} onClick={handleAddress}>Checkout </button>
                </div>
                : <div><h1 className="text-orange" style={{ margin: "10px", textAlign: "center", marginBottom: "20px", marginTop: "30vh" }}>Your Cart Is Empty</h1></div>
            }
            <Footer />
        </div>
    );
}

export default Cart