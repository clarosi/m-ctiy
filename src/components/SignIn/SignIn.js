import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { firebase } from '../../firebase/firebaseConfig'

import FormElement from '../UI/FormElement/FormElement';
import { bindFormElementValue } from '../../shared/utility/helperFunctions';
import { userDashboardRoute } from '../../shared/utility/routeConstants';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class SignIn extends Component {
    state = {
        formSubmitting: false,
        formHasError: false,
        formSuccessMsg: '',
        formData: {
            txtEmail: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'txtEmail',
                    type: 'email',
                    placeholder: 'Enter your email.',
                    maxLength: 50
                },
                validation: {
                    required: true,
                    isValidEmail: true
                },
                isValid: false,
                validationMsg: ''
            },
            txtPassword: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'txtPassword',
                    type: 'password',
                    placeholder: 'Enter your password.',
                    maxLength: 50
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: ''
            }
        }
    };

    submitFormHandler = () => {
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].isValid && formIsValid;
        }

        if (formIsValid) {
            this.setState({formSubmitting: true});
            firebase.auth()
            .signInWithEmailAndPassword(dataToSubmit.txtEmail, dataToSubmit.txtPassword)
            .then(res => {             
                this.setState({formSubmitting: false});
                this.props.onSetUserAuthData(res);
                this.props.history.push(`${userDashboardRoute}`);
            })
            .catch(err => {
                this.setState({
                    formHasError: true,
                    formSubmitting: false
                });
            });
        }
        else {
            this.setState({formHasError: true});
        }
    }

    onChangeHandler = (element) => {
        const newFormData = bindFormElementValue(element, this.state.formData);

        this.setState({
            formHasError: false,
            formSuccessMsg: '',
            formData: newFormData
        });
    }

    render() {
        return (
            <div className="container">
                <div 
                    className="signin_wrapper"
                    style={{margin: '100px'}}
                >
                    <form onSubmit={this.submitFormHandler}>
                        <h2>Please Login</h2>
                        <FormElement 
                            id={this.state.formData.txtEmail.config.name}
                            formData={this.state.formData.txtEmail}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <FormElement 
                            id={this.state.formData.txtPassword.config.name}
                            formData={this.state.formData.txtPassword}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <Button 
                            disabled={this.state.formSubmitting ? true : false}
                            variant="outlined" 
                            color="primary"
                            onClick={this.submitFormHandler}
                        >
                            {this.state.formSubmitting ? <CircularProgress size={30} /> : 'Login'}
                        </Button>
                        {this.state.formHasError ? 
                            <div className="error_label">Invalid username or password, please try again.</div> 
                            : null
                        }
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetUserAuthData: (userAuthData) => dispatch(actions.setUserAuthData(userAuthData))
    };
};

export default connect(null, mapDispatchToProps)(SignIn);