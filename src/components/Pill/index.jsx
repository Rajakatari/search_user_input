import "./index.css";

const Pill = (props) => {
  const { email, text, image, onClick } = props;
  return (
    <span key={email} className="pill" onClick={onClick}>
      <img src={image} alt={email} />
      <span>{text} &times;</span>
    </span>
  );
};

export default Pill;
