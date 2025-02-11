import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';

function Payment() {
    const location = useLocation();
    const checkoutPrice = location.state?.checkoutPrice || 0;
    const email = useSelector(state => state.user.name);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const navigate = useNavigate();

    const [card, setCard] = useState("");
    const [cardNo, setCardNo] = useState("");
    const [cvv, setCvv] = useState("");
    const [expire, setExpire] = useState("");
    const [chk, setChk] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const handlePayment = async (event) => {
        event.preventDefault();

        const regex = /^[0-9]+$/;
        if (card === "" || cardNo === "" || cvv === "" || expire === "") {
            setChk(false);
            return;
        }

        if (!regex.test(cardNo) || !regex.test(cvv)) {
            setChk(false);
            return;
        }

        if (cvv.length !== 3 ) {
            setChk(false);
            return;
        }

        if (cardNo.length !== 16) {
            setChk(false);
            return;
        }

        setChk(true);

        await axios.post("https://food-ordering-website-l0hb.onrender.com/payment", { email: email });

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/");
    };

    return (
        <div>
            {/* Modal Start */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}
             id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-success">
                        <div className="modal-header">
                            <h5 className="modal-title" id="paymentModalLabel">Payment Successful</h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-orange">
                            Your payment was successful. Your order is placed.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-orange" onClick={handleCloseModal}>Understood</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal End */}
            <NavBar />
            {
                loggedIn ?
                    <section className="p-4 p-md-5"
                        style={{
                            backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)',
                        }}
                    >
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10 col-lg-8 col-xl-5">
                                <div className="card rounded-3">
                                    <div className="card-body p-4">
                                        <div className="text-center mb-4">
                                            <h3>Confirm Order</h3>
                                            <h5>Total Bill: Rs. {checkoutPrice}</h5>
                                        </div>
                                        <form onSubmit={handlePayment}>
                                            <p className="fw-bold mb-4 pb-2">Saved cards:</p>

                                            <div className="d-flex flex-row align-items-center mb-4 pb-1">
                                                <img
                                                    className="img-fluid"
                                                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                                                    alt="Mastercard"
                                                />
                                                <div className="flex-fill mx-3">
                                                    <div className="form-outline">
                                                        <input type="text" id="formControlLgXc" className="form-control form-control-lg" value="**** **** **** 3193" readOnly />
                                                        <label className="form-label" htmlFor="formControlLgXc">
                                                            Card Number
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4 pb-1">
                                                <img
                                                    className="img-fluid"
                                                    src="https://img.icons8.com/color/48/000000/visa.png"
                                                    alt="Visa"
                                                />
                                                <div className="flex-fill mx-3">
                                                    <div className="form-outline">
                                                        <input type="text" id="formControlLgXs" className="form-control form-control-lg" value="**** **** **** 4296" readOnly />
                                                        <label className="form-label" htmlFor="formControlLgXs">
                                                            Card Number
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="fw-bold mb-4">Add new card:</p>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="formControlLgXsd" className="form-control form-control-lg" placeholder="Cardholder's Name"
                                                    onChange={(e) => setCard(e.target.value)} />
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-7">
                                                    <div className="form-outline">
                                                        <input type="text" id="formControlLgXM" className="form-control form-control-lg" placeholder="1234 5678 1234 5678"
                                                            onChange={(e) => setCardNo(e.target.value)} />
                                                        <label className="form-label" htmlFor="formControlLgXM">
                                                            Card Number
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="form-outline">
                                                        <input type="text" id="formControlLgExpk" className="form-control form-control-lg" placeholder="MM/YYYY"
                                                            onChange={(e) => setExpire(e.target.value)} />
                                                        <label className="form-label" htmlFor="formControlLgExpk">
                                                            Expire
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <div className="form-outline">
                                                        <input type="text" id="formControlLgcvv" className="form-control form-control-lg" placeholder="CVV"
                                                            onChange={(e) => setCvv(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="submit" className="btn btn-success btn-lg btn-block">
                                                Pay
                                            </button>
                                            <Link to="/cart" className="m-2 btn btn-orange btn-lg btn-block">
                                                Cart
                                            </Link>
                                            {!chk && (
                                                <h3 style={{ color: "red" }}>!!!Invalid Card Info!!!</h3>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> :
                    <div>
                        <h1 className="text-orange" style={{ margin: "10px", textAlign: "center", marginBottom: "20px", marginTop: "30vh" }}>Your Cart Is Empty</h1>
                        <Footer />
                    </div>
            }
        </div>
    );
}

export default Payment;
