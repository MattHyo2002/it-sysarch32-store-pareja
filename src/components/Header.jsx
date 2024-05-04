import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return(
        <div>
            <header>
                <h1>MattHyo's Computer Parts</h1>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Items</a></li>
                    </ul>
                </nav> 
            </header>
            <hr></hr>
        </div>
    );
}

export default Header;
