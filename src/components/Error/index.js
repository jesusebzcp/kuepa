import React from "react";
import PropTypes from "prop-types";

const Error = ({ msn }) => {
  return (
    <div className="containerError">
      <p>{msn ? msn : "Ocurrió algo inesperado"}</p>
    </div>
  );
};
Error.propTypes = {
  msn: PropTypes.string,
};
export default Error;
