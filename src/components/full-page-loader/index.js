import React from "react";
import Loader from "react-fullpage-custom-loader";
import PropTypes from "prop-types";
function FullPageLoader({ isLoading }) {
  return (
    <>
      {isLoading && (
        <Loader
          sentences={["Loading...", "Trying our best...", "Please wait..."]}
        />
      )}
    </>
  );
}

FullPageLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default FullPageLoader;
