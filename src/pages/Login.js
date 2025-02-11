import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useDispatch } from 'react-redux';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loggedin, setloggedin] = useState(undefined)

    const handleSubmit = async () => {

        const Userdata = {
            password: password,
            email: email
        }

        const response = await axios.post("https://food-ordering-website-l0hb.onrender.com/login", Userdata)

        if (response.data.status) {
            dispatch({type:"LOGIN"})
            dispatch({ type: 'UPDATE_NAME', name: email });
            navigate('/')
        }

        setloggedin(response.data.status)
        setemail('')
        setpassword('')
    }
    return (
        <>
            <NavBar /><br/><br/><br/>
            <section className="intro">
                <div className="bg-image h-100">
                    <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f3f2f2" }}>
                        <div className="container">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-12 col-lg-9 col-xl-8">
                                    <div className="card" style={{ borderRadius: "1rem" }}>
                                        <div className="row g-0">
                                            <div className="col-md-4 d-none d-md-block">
                                                <img
                                                    src="https://thumbs.dreamstime.com/z/set-homemade-hamburger-beef-lettuce-cheese-american-food-fast-vertical-image-top-view-231856552.jpg?w=576"
                                                    alt="login form"
                                                    className="img-fluid" style={{ borderRadius: "1rem",height:"100%"}}
                                                />
                                            </div>
                                            <div className="col-md-8 d-flex align-items-center">
                                                <div className="card-body py-5 px-4 p-md-5">

                                                    <form action="">
                                                        <h4 className="fw-bold mb-4" style={{ color: "#92aad0" }}>Log in to your account</h4>
                                                        <p className="mb-4" style={{ color: "#45526e" }}>To log in, please fill in these text fiels with your e-mail address and password.</p>

                                                        <div className="form-outline mb-4">
                                                            <input type="email" id="form2Example1" className="form-control" value={email} onChange={(t) => setemail(t.target.value)}/>
                                                            <label className="form-label" for="form2Example1">Email address</label>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <input type="password" id="form2Example2" className="form-control" value={password} onChange={(t) => setpassword(t.target.value)}/>
                                                            <label className="form-label" for="form2Example2">Password</label>
                                                        </div>

                                                        <div className="d-flex justify-content-end pt-1 mb-4">
                                                            <button className="btn btn-primary " type="button"  onClick={handleSubmit} style={{ backgroundColor: "#92aad0;" }}>Log in</button>
                                                            <Link to="/signup" className="m-6 btn btn-danger">I'm a new user</Link>
                                                        </div>
                                                        <hr />
                                                    </form>
                                                    {loggedin !== undefined ? loggedin ? <></> :
                                                     <h3 style={{ color: "red", textAlign: "center" }}><br></br>Invalid user name or password!!!!!</h3> : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login