import { Link } from "react-router-dom";
import "../styles/Home.css"
const Home = () => {
  return (
    <main className='home-page'>
      <div className='head-text'>
        <h2 >WELCOME    TO</h2><br/>
        <h2>FILE  ANALYZER</h2>
      </div>

      <p>Register or Login Account</p>
      
      <div className='btn-box'>
            
            <Link to="/register">
              <button >
                  Register
              </button>
            </Link>

             <Link to="/login">
                <button className='login-btn'>
                    Login
                </button>

             </Link>
            
      </div>
      
    </main>
  )
}

export default Home
