import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {Link} from "react-router-dom";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons/faUserAlt";

class Dashboard extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        //const { user } = this.props.auth;
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-link mt-2" id="menu-toggle"><FontAwesomeIcon icon={faList}/></button>
                            <h1 className="mt-2 text-primary">Dashboard</h1>
                            <div className="row px-2">
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-primary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Admins</h5>
                                            <p className="card-text">Check the registered Admins.</p>
                                            <Link to="/admins" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Admins</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-primary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Editors</h5>
                                            <p className="card-text">Check the registered Editors.</p>
                                            <Link to="/editors" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Editors</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-primary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Reviewers</h5>
                                            <p className="card-text">Check the registered Reviewers.</p>
                                            <Link to="/reviewers" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Reviewers</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-primary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Researcher</h5>
                                            <p className="card-text">Check the registered Researchers.</p>
                                            <Link to="/users" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Researchers</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-primary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Conference Details</h5>
                                            <p className="card-text">Check the Conference Details.</p>
                                            <Link to="/conferences" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Conference Details</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-primary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Conferences Approve Page</h5>
                                            <p className="card-text">Check the Conferences Approve Page.</p>
                                            <Link to="/conferences" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Conferences Approve Page</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
