import { useNavigate } from "react-router-dom";
import backButton from "../../assets/backButton.png";
import "./backButton.css";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="backButtonContainer"
      title="Back"
      onClick={() => navigate(-1)}
    >
      <img src={backButton} alt="back" />
    </button>
  );
}

export default BackButton;
