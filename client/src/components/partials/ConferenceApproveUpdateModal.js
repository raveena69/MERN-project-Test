import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../actions/conferenceActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ConferenceApproveUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            guestSpeaker: this.props.record.guestSpeaker,
            description: this.props.record.description,
            status: this.props.record.status,
            date: this.props.record.date,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                guestSpeaker: nextProps.record.guestSpeaker,
                time: nextProps.record.time,
                description: nextProps.record.description,
                status: nextProps.record.status,
                date: nextProps.record.date,
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
        if (e.target.id === 'user-update-guestSpeaker') {
            this.setState({ guestSpeaker: e.target.value });
        }
        if (e.target.id === 'user-update-time') {
            this.setState({ time: e.target.value });
        }
        if (e.target.id === 'user-update-description') {
            this.setState({ description: e.target.value });
        }
        if (e.target.id === 'user-update-status') {
            this.setState({ status: e.target.value });
        }
        if (e.target.id === 'user-update-date') {
            this.setState({ date: e.target.value });
        }
    };

    onUserUpdate = e => {
        e.preventDefault();
        const newUser = {
            _id: this.state.id,
            guestSpeaker: this.state.guestSpeaker,
            time: this.state.time,
            description: this.state.description,
            status: this.state.status,
            date: this.state.date
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
                                <h4 className="modal-title">Update Conference Approve</h4>
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
                                            <label htmlFor="guestSpeaker">Guest Speaker</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.guestSpeaker}
                                                id="user-update-guestSpeaker"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.guestSpeaker
                                                })}/>
                                            <span className="text-danger">{errors.guestSpeaker}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Time</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.time}
                                                error={errors.time}
                                                id="user-update-time"
                                                type="time"
                                                className={classnames("form-control", {
                                                    invalid: errors.time
                                                })}
                                            />
                                            <span className="text-danger">{errors.time}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Description</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                data-reset-input={true}
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                error={errors.description}
                                                id="user-update-description"
                                                type="description"
                                                className={classnames("form-control", {
                                                    invalid: errors.description
                                                })}
                                            />
                                            <span className="text-danger">{errors.description}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="status">Status</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                data-reset-input={true}
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                error={errors.status}
                                                id="user-update-status"
                                                type="status"
                                                className={classnames("form-control", {
                                                    invalid: errors.status
                                                })}
                                            />
                                            <span className="text-danger">{errors.status}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="date">Date</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                data-reset-input={true}
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                error={errors.date}
                                                id="user-update-date"
                                                type="date"
                                                className={classnames("form-control", {
                                                    invalid: errors.date
                                                })}
                                            />
                                            <span className="text-danger">{errors.date}</span>
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
                                    Update ConferenceApprove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ConferenceApproveUpdateModal.propTypes = {
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
)(withRouter(ConferenceApproveUpdateModal));
