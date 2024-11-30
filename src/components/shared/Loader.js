import React from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";

const loaderStyle = "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-[2000]";

const Loader = (props) => {
    const { showLoading } = props;

    if(!showLoading) return null;
    return  <div className={loaderStyle}>
                <Loading loading={true} type="cover"/>
            </div>
}

export default Loader;

Loader.propTypes = {
    showLoading: PropTypes.bool.isRequired
};