import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import Menu from '../components/Menu';

function Home() {

  return (
    <div>
      <NavBar />
      <div className="d-flex container-fluid m-0 p-0">
        <Menu />
        <div className='carousel-container '><Carousel /></div>
      </div><br></br>

      <div className="card-display-class container" style={{marginLeft:"120px"}}>
        <div className="row">
          <Card/>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Home;
