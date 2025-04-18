import React from 'react';

const HomePage: React.FC = () => {
    return (
  <><div className="container">

            <div className="left-side">
                <h1>JONATHAN</h1>
                <h2>BEJARANO</h2>
                <p>DISTRICT 3</p>
                <p>FOR SCHOOL BOARD</p>
                <img src="https://i.imgur.com/2Jz1q6V.png" alt="Donkey Logo" width="100"/>
                    <p className="date">AUGUST 12, 2025</p>
                    <p>www.voteforjonathan.com</p>
                </div>

            <div className="right-side">
                <h2>REASONS TO VOTE FOR ME</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <ul>
                    <li>Nam sit amet tellus sit amet mauris mollis faucibus. Curabitur a interdum neque, vel semper risus.</li>
                    <li>Praesent eget elit nec risus maximus porttitor sit amet vel tellus.</li>
                    <li>Curabitur rutrum leo a mauris faucibus auctor. Phasellus bibendum</li>
                </ul>
            </div>

        </div></>
    );
};

export default HomePage;