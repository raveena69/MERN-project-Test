import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../actions/reviewerActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ReviewerUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            reviewerName: this.props.record.reviewerName,
            mobileNumber: this.props.record.mobileNumber,
            email: this.props.record.email,
            userName: this.props.record.userName,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                reviewerName: nextProps.record.reviewerName,
                mobileNumber: nextProps.record.mobileNumber,
                email: nextProps.record.email,
                userName: nextProps.record.userName,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined
            && nextProps.auth.user.data.success) {
            $('#update-user-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'user-update-reviewerName') {
            this.setState({ reviewerName: e.target.value });
        }
        if (e.target.id === 'user-update-mobileNumber') {
            this.setState({ mobileNumber: e.target.value });
        }
        if (e.target.id === 'user-update-email') {
            this.setState({ email: e.target.value });
        }
        if (e.target.id === 'user-update-userName') {
            this.setState({ userName: e.target.value });
        }
        if (e.target.id === 'user-update-password') {
            this.setState({ password: e.target.value });
        }
    };

    onUserUpdate = e => {
        e.preventDefault();
        const newUser = {
            _id: this.state.id,
            reviewerName: this.state.reviewerName,
            email: this.state.email,
            mobileNumber: this.state.mobileNumber,
            userName: this.state.userName,
            password: this.state.password,
            errors: {},
        };
        this.props.updateUser(newUser);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-user-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Reviewer</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUserUpdate} id="update-user">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="user-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="reviewerName">Reviewer Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.reviewerName}
                                                id="user-update-reviewerName"
                                                type="text"
                                                error={errors.reviewerName}
                                                className={classnames("form-control", {
                                                    invalid: errors.reviewerName
                                                })}/>
                                            <span className="text-danger">{errors.reviewerName}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="mobileNumber">Mobail Number</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.mobileNumber}
                                                id="user-update-mobileNumber"
                                                type="text"
                                                error={errors.mobileNumber}
                                                className={classnames("form-control", {
                                                    invalid: errors.mobileNumber
                                                })}/>
                                            <span className="text-danger">{errors.mobileNumber}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="user-update-email"
                                                type="email"
                                                className={classnames("form-control", {
                                                    invalid: errors.email
                                                })}
                                            />
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="userName">Username</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.userName}
                                                error={errors.userName}
                                                id="user-update-userName"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.userName
                                                })}
                                            />
                                            <span className="text-danger">{errors.userName}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                data-reset-input={true}
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                error={errors.password}
                                                id="user-update-password"
                                                type="password"
                                                className={classnames("form-control", {
                                                    invalid: errors.password
                                                })}
                                            />
                                            <span className="text-danger">{errors.password}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-user"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Reviewer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReviewerUpdateModal.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateUser }
)(withRouter(ReviewerUpdateModal));
