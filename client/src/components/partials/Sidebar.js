import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Link} from "react-router-dom";

class Sidebar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        //const { user } = this.props.auth;
        return (
            <div className="border-right h-100" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                    <Link to="/admins" className="list-group-item list-group-item-action">Admins</Link>
                    <Link to="/editors" className="list-group-item list-group-item-action">Editors</Link>
                    <Link to="/reviewers" className="list-group-item list-group-item-action">Reviewers</Link>
                    <Link to="/reseachers" className="list-group-item list-group-item-action">Reseachers</Link>
                    <Link to="/conferences" className="list-group-item list-group-item-action">Conference Details Page</Link>
                    <Link to="/events" className="list-group-item list-group-item-action">Approve Page</Link>
                    <button className="list-group-item list-group-item-action" onClick={this.onLogoutClick}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></button>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar);
