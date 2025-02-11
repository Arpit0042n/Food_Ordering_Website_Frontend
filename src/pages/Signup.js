import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import axios from 'axios'
import './signup.css'
import { useDispatch } from 'react-redux'

function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [info, setinfo] = useState(1)
    const [AlreadyUser, setAlreadyUser] = useState(0)

    const handleSubmit = async () => {

        if(name==='' || password==='' || email==='')
        {
            setinfo(0)
            console.log("Working");
            
            return
        }
        else{setinfo(1)}

        const Userdata = {
            name: name,
            password: password,
            email: email
        }

        const response = await axios.post('https://food-ordering-website-l0hb.onrender.com/signin', Userdata).catch(err => console.log(err));
        if(response.data.status === 101){
            setAlreadyUser(1)
            return
        }
        setAlreadyUser(0)

        dispatch({type: 'LOGIN' })
        dispatch({ type: 'UPDATE_NAME', name: email });
        navigate('/')

        setemail('')
        setname('')
        setpassword('')
    }

    return (
        <>
            <NavBar />
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Sign Up</h3>
                                <p>Fill in the data below.</p>
                                <form className="requires-validation" noValidate onSubmit={handleSubmit}>
                                    <div className="col-md-12">
                                        <input className="form-control" type="text" placeholder="Full Name"
                                            value={name} onChange={(e) => setname(e.target.value)} required
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <input className="form-control" type="email" placeholder="E-mail Address"
                                            value={email} onChange={(e) => setemail(e.target.value)} required
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <input className="form-control" type="password" placeholder="Password"
                                            value={password} onChange={(e) => setpassword(e.target.value)} required/>
                                    </div>

                                    <br />
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                        I confirm that all data are correct
                                    </label>

                                    <div className="form-button mt-1">
                                        <button id="submit" type="button" className="btn btn-primary" onClick={handleSubmit}>Signup</button>
                                        <Link to="/login" className="m-5 btn btn-danger">Already a user</Link>
                                    </div>
                                    {
                                       !info?<h3 className="text-danger" style={{color:"white",textAlign:"center"}}>!!! All Fields Must Be Filled !!!</h3>:<></>
                                    }
                                    {
                                       AlreadyUser?<h3 className="text-danger" style={{color:"white",textAlign:"center"}}>!!! Account With This Email Already Exists !!!</h3>:<></>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup