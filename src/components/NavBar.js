import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function NavBar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div style={{marginBottom:"85px"}}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-orange fixed-top" style={{ maxWidth: "100vw"}}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Gomato</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            {
              !loggedIn ?
                <div className='d-flex'>
                  <Link className="btn bg-white text-orange mx-1" to="/login">Log In</Link>
                  <Link className="btn bg-white text-orange mx-1" to="/signup">Sign Up</Link>
                </div> :
                <div className='d-flex'>
                  <Link className="btn bg-white text-orange mx-1" to="/cart">My Cart</Link>
                  <button className="btn bg-white text-orange mx-1" onClick={handleLogout}>Log Out</button>
                </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
