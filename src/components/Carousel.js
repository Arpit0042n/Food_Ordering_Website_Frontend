import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Carousel() {
  const [item, setitem] = useState("")

  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner carouselsize">

        {/* Search Bar */}
        <div className='carousel-caption' style={{zIndex:"10"}}>
        <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(t)=>setitem(t.target.value)}/>
            <Link to='/search' state={{item}} className="btn btn-outline-orange text-white bg-orange" type="button">Search</Link>
          </form>
        </div>
        {/* Search Bar End */}

        <div className="carousel-item active">
          <img src="https://wallpapercave.com/wp/wp8645338.jpg" className="d-block w-100 carousel-img" alt="..."  style={{filter:"brightness(30%)", objectFit: "contain", height: "100%"}}/>
        </div>
        <div className="carousel-item">
          <img src="https://www.baltana.com/files/wallpapers-2/Food-HD-Wallpapers-04864.jpg" className="d-block w-100" alt="..."  style={{filter:"brightness(30%)", objectFit: "contain", height: "100%"}}/>
        </div>
        <div className="carousel-item">
          <img src="https://images6.alphacoders.com/100/1002209.jpg" className="d-block w-100" alt="..."  style={{filter:"brightness(30%)", objectFit: "contain", height: "100%"}}/>
        </div>
        <div className="carousel-item">
          <img src="https://wallpaperaccess.com/full/1401021.jpg" className="d-block w-100" alt="..."  style={{filter:"brightness(30%)", objectFit: "contain", height: "100%"}}/>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Carousel;
