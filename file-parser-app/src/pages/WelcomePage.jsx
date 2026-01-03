import React from 'react'
import Aurora from '../components/Aurora'
import '../styles/WelcomePage.css'
import Navbar from '../components/Navbar'
import webLogo from '../assets/web-logo.svg'

const WelcomePage = () => {
  return (
    <>
      <Aurora 
        colorStops={["#7cff67", "#b19eef", "#5227ff"]}
          blend={0.8}
          amplitude={1.0}
          speed={0.5}
      />
          <header className='welcome-page'>
                <nav className="navigation-bar">
                    <div className="navigation-container">
                        <div className="navigation-head">
                            <img src={webLogo} /> 
                            <span> File Analyzer</span> 
                        </div>
                        <div className="navigation-item">
                            <span>Home</span>
                            <span>Registration</span>
                        </div>
                    </div>

                    
                </nav>
                
                <div className="main-content"> 
                    <h1> Bring the Clarity of your File,<h1> with one click of upload.</h1></h1>
                </div>

                <div className="btn-box">
                    <button> Get Started</button>
                    <button> Learn More</button>                    
                </div>


          </header>
            
    
    </>
  )
}

export default WelcomePage
