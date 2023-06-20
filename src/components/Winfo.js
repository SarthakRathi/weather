import "./Winfo.css";
import humid from "./icons/humidity.png";
import wind from "./icons/wind.png";

const Winfo = (data) => {
  return (
    <>
      <div className="winfo">
        <img src={data.image} className="icon" alt="" />
        <h1>{data.celcius}°c</h1>
        <h2>{data.name}</h2>
        <div className="details">
          <div className="col">
            <img src={humid} alt=""></img>
            <div className="humidity">
              <p>{data.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src={wind} alt=""></img>
            <div className="wind">
              <p>{data.speed} km/h</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Winfo;
