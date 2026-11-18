

import "../scss/components/Loader.scss";

function Loader({ fullPage = false, label = "Loading" }) {
  return (
    <div
      className={`Loader${fullPage ? " Loader--full-page" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="Loader__spinner" aria-hidden="true" />
      <span className="Loader__label">{label}</span>
    </div>
  );
}

export default Loader;