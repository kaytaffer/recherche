import React from "react";
import PageNotFoundView from "../view/pageNotFoundView";
import { Link } from "react-router-dom";

function PageNotFound() {

    return <PageNotFoundView
                Link={Link}
                location={window.location.pathname}/>;
}
export default PageNotFound;