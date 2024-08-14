import React from 'react';
import './AnimatedElement.css';
import c from './images/c.png';

const AnimatedElement = () => {
    return (
        <div className="animated-element">
            <div className="animated-element1">
                <div>
                    <div className="landing-page">
                        <h1>Welcome to the DApp</h1>
                        <p>Some introductory text or images here.</p>

                    </div>
                </div>
                <img className='logo1' src={c} alt="logo" />
                <div className='innertext'>
                    <h1 className='logotitle'>MoveDAO</h1>
                    <p className='tagline'>Move your decision everywhere with movement</p>
                </div>
            </div>
            
        </div>
    );
};

export default AnimatedElement;
