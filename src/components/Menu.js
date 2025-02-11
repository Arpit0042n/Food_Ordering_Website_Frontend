import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import axios from 'axios';

function Menu() {

  const [menu, setmenu] = useState([])

  useEffect(() => {
    const getMenu = async () => {
      const response = await axios.get('https://food-ordering-website-l0hb.onrender.com/menu')
      const result = response.data.data
      setmenu(result)
    }
    getMenu()
  }, [])

  return (
    <nav className="menu-nav">
      <h4 className="menu-title">Try Cuisines</h4>
      <ul className="nav flex-column">
        {
          menu.map((item, index) => {
            return(
            <li className="nav-item mb-2 " key={index}>
              <img src={item.logo} alt="..." style= {{ width: "50px", height: "50px", borderRadius: "100px" }} />
              <Link
              className="menu-item"
              to={`#${item.type.toLowerCase()}`}
              onClick={() => {
                const section = document.getElementById(item.type.toLowerCase());
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {item.type}
            </Link>
            </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default Menu;
