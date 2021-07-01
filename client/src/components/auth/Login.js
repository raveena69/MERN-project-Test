import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import NavBar from '../../NavBar';
import '../../css/SignUpMain.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <NavBar />
            <div className="container">
                      <center><h1 className="mt-2 text-primary">Admin Login</h1></center>
                {/* <div className="row mt-5"> */}
                    <div className="col-md-4 mx-auto mt-5 card shadow-lg">
                        {/* <div className="card-body p-1"> */}
                            <h2 className="text-center text-primary mt-3">Please enter Admin login credentials</h2>
                            <form noValidate onSubmit={this.onSubmit} className="white">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("form-control", {
                                        invalid: errors.email
                                    })}
                                />
                                <span className="text-danger">{errors.email}</span>
                                <br/>
                                <label htmlFor="password">Password</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("form-control", {
                                        invalid: errors.password
                                    })}
                                />
                                <span className="text-danger">{errors.password}</span>
                                <p className="text-center pb-0 mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-large btn-primary mt-2 px-5">
                                        Login
                                    </button>
                                </p>
                            </form>
                        {/* </div> */}
                    </div>
                {/* </div> */}
            </div>
            {/*Footer Start*/}
            <br/>
            <br/>
            <div id="footer">
                    <div id="footer1">
                    
                        <div id="logo1"></div>

                        <div id="facts">
                            <div id="company-address">
                                SLIIT,
                                New Kandy Road,<br/>
                                Malabe,<br/>
                                Sri Lanka.<br/>

                                +94 11 7544806<br/>
                                info@icaf.lk<br/><br/>

                                © 2021 International Conference on Application Frameworks [ICAF] . All Rights Reserved.
                            </div>

                            <div id="social">
                                <a href="https://www.youtube.com/" target="_blank"><div id="youtube"></div></a>
                                <a href="https://www.facebook.com/" target="_blank"><div id="facebook"></div></a>
                                <a href="https://www.pinterest.com/" target="_blank"><div id="pinterest"></div></a>
                                <a href="https://twitter.com/login?lang=en" target="_blank"><div id="twitter"></div></a>
                                <a href="https://www.instagram.com" target="_blank"><div id="instagram"></div></a>
                            </div>

                        </div>
                    </div>
                </div>

            {/*Footer End*/}
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
