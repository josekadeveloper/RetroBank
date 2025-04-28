import { FaSpinner } from "react-icons/fa";

import "./spinner.scss";

export default function Spinner() {
  return (
    <section className="spinner-overlay">
      <FaSpinner className="spinner-icon" />
    </section>
  );
}
