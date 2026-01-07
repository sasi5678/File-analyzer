
import "../styles/Card.css";

const Card = ({title, value}) => {


  return (

    <div className="card-box">
      <div className="card">
        <div className="card-title">
          <p > {title}</p>
        </div>
          <h2 className="card-value" >{value}</h2>
        </div>

        <div className="summary-content">

            <p style={{color: "var(--color-title)", fontWeight: "800", fontSize: "2.4rem"}}> {value}</p>
          
        </div>
      </div>
  );
};

export default Card;
