import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';
import FormElement from '../../UI/FormElement/FormElement';
import { promotionsCollection } from '../../../firebase/firebaseConfig';
import { validateFormElement } from '../../../shared/utility/helperFunctions';
import { setTimeoutDelay } from '../../../shared/utility/numberConstants';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Enroll extends Component {
    state = {
        formSubmitting: false,
        formHasErrorInSubmitting: false,
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
            promotionsCollection.orderByChild('email').equalTo(dataToSubmit.txtEmail).once('value')
            .then(res => {
                if (!res.val()) {
                    promotionsCollection.push({email: dataToSubmit.txtEmail});
                    this.resetFormDataHandler(true);
                    this.setState({formHasErrorInSubmitting: false});
                }
                else {
                    this.setState({formHasErrorInSubmitting: true});
                    this.resetFormDataHandler(false);
                }
                this.setState({formSubmitting: false});
            })
        }
        else {
            this.setState({formHasError: true});
        }
    }

    resetFormDataHandler = (isSuccess) => {
        const newFormData = {...this.state.formData};

        for (let key in newFormData) {
            newFormData[key].value = '';
            newFormData[key].isValid = false;
            newFormData[key].validationMsg = '';
        }

        this.setState({
            formHasError: false,
            formData: newFormData,
            formSuccessMsg: isSuccess ? 'Successfully submitted.' : 'Failed email already in database.'
        });
        
        this.resetFormSuccessMsgHandler();
    }

    resetFormSuccessMsgHandler = () => {
        setTimeout(() => {
            this.setState({formSuccessMsg: ''});
        }, setTimeoutDelay);
    }

    onChangeHandler = (element) => {
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};
        //
        newElement.value = element.event.target.value;
        //
        let result = validateFormElement(newElement);
        newElement.isValid = result[0];
        newElement.validationMsg = result[1];
        //
        newFormData[element.id] = newElement;
        //
        this.setState({
            formHasError: false,
            formSuccessMsg: '',
            formData: newFormData
        });
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={this.submitFormHandler}>
                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            <FormElement 
                                id={this.state.formData.txtEmail.config.name}
                                formData={this.state.formData.txtEmail}
                                onChange={(element) => this.onChangeHandler(element)}
                            />
                            {this.state.formHasError ? 
                                <div className="error_label">Invalid form data, please try again.</div> 
                                : null
                            }
                            {this.state.formSuccessMsg ? 
                                <div className={this.state.formHasErrorInSubmitting ? 'error_label' : 'success_label'}>{this.state.formSuccessMsg}</div> 
                                : null
                            }
                            <Button 
                                disabled={this.state.formSubmitting ? true : false}
                                variant="outlined" 
                                color="primary"
                                onClick={this.submitFormHandler}
                            >
                                {this.state.formSubmitting ? <CircularProgress size={30} /> : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </div> 
            </Fade>
        );
    }
}

export default Enroll;