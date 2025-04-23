import { FaSpinner } from "react-icons/fa";

import "./spinner.scss";

export default function Spinner() {
  return (
    <div className="spinner-overlay">
      <FaSpinner className="spinner-icon" />
    </div>
  );
}
