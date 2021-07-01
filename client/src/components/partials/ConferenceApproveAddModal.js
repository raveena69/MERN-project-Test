import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../../actions/conferenceActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ConferenceAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            guestSpeaker: '',
            time: '',
            description: '',
            status: '',
            date: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined) {
            $('#add-user-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onUserAdd = e => {
        e.preventDefault();
        const newUser = {
            guestSpeaker: this.state.guestSpeaker,
            time: this.state.time,
            description: this.state.description,
            status: this.state.status,
            date: this.state.date
        };
        this.props.addUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-user-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Conference [Approve/Reject]</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUserAdd} id="add-user">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="guestSpeaker">Guest Speaker</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.guestSpeaker}
                                                id="guestSpeaker"
                                                type="text"
                                                error={errors.guestSpeaker}
                                                className={classnames("form-control", {
                                                    invalid: errors.guestSpeaker
                                                })}/>
                                            <span className="text-danger">{errors.guestSpeaker}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="time">Time</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.time}
                                                error={errors.time}
                                                id="time"
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
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.description}
                                                error={errors.description}
                                                id="description"
                                                type="text"
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
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.status}
                                                error={errors.status}
                                                id="status"
                                                type="text"
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
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.date}
                                                id="date"
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
                                    form="add-user"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Conference
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ConferenceAddModal.propTypes = {
    addUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addUser }
)(withRouter(ConferenceAddModal));
