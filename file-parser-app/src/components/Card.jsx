
import "../styles/Card.css";

const Card = ({title, value}) => {


  return (

    <div className="card-box">
      <div className="card">
        <div>
          <p className="card-title"> {title}</p>
        </div>
          <h2 className="card-value">{value}</h2>
        </div>
      </div>
  );
};

export default Card;
