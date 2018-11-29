import React, { Component } from 'react';

import { playersCollection, firebaseDB, firebase } from '../../../firebase/firebaseConfig';
//import { firebaseDataTrans } from '../../../shared/utility/helperFunctions';

import AdminLayout from '../../../hoc/AdminLayout/AdminLayout';
import FormElement from '../../UI/FormElement/FormElement';
import { bindFormElementValue } from '../../../shared/utility/helperFunctions';
import ErrorMsg from '../Misc/ErrorMsg';
import FileUploader from '../../UI/FormElement/FileUploader';
import { adminPlayers } from '../../../shared/utility/routeConstants';
import { setTimeoutDelay } from '../../../shared/utility/numberConstants';
import LinearProgress from '@material-ui/core/LinearProgress';

class AddEditPlayer extends Component {
    state = {
        playerId: '',
        formType: '',
        formHasError: false,
        formIsFetchingData: true,
        formSuccessMsg: '',
        formSubmitting: false,
        defaultImage: '',
        formData: {
            name: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'name',
                    type: 'text',
                    maxLength: 50,
                    label: 'Firstname'
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            },
            lastname: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'lastname',
                    type: 'text',
                    maxLength: 50,
                    label: 'Lastname'
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            },
            number: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'number',
                    type: 'number',
                    maxLength: 5,
                    label: 'Number'
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            },
            position: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'position',
                    type: 'select',
                    label: 'Position',
                    options: [
                        {value: 'Keeper', displayValue: 'Kepper'},
                        {value: 'Defence', displayValue: 'Defence'},
                        {value: 'MidField', displayValue: 'MidField'},
                        {value: 'Striker', displayValue: 'Striker'}
                    ]
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                config: {
                    alt: 'image'
                },
                validation: {
                    required: true
                },
                isValid: false
            }
        }
    }

    componentDidMount() {
        const playerId = this.props.match.params.playerId;
        this.setState({playerId});

        if (playerId) {
            // Edit Player
            this.setState({formType: 'Edit Player'});
            firebaseDB.ref(`players/${playerId}`).once('value')
            .then(res => {
                const playerData = res.val();
                firebase.storage().ref('players')
                .child(playerData.image).getDownloadURL()
                .then(url => {
                    const props = {
                        playerData, 
                        playerId, 
                        defaultImage: url
                    };
                    this.updateFieldsHandler({...props});
                })
                .catch(err => {
                    this.setState({
                        formHasError: true
                    });
                });
            })  
            .catch(err => {
                this.setState({formHasError: true});
            });
        }
        else {
            // Add Player
            this.setState({
                formType: 'Add Player',
                formIsFetchingData: false
            });
        }
    }

    updateFieldsHandler = (props) => {
        const newFormData = Object.assign({}, this.state.formData);

        for (let key in this.state.formData) {
            newFormData[key].value = props.playerData[key];
            newFormData[key].isValid = true;
        }

        this.setState({
           formIsFetchingData: false,
           playerId: props.playerId,
           defaultImage: props.defaultImage,
           formData: newFormData
        });
    }

    submitFormHandler = () => {
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].isValid && formIsValid;
        }

        if (formIsValid) {
            this.setState({formSubmitting: true})
            if (this.state.playerId) {
                firebaseDB.ref(`players/${this.state.playerId}`)
                .update(dataToSubmit)
                .then(() => {
                    this.setState({
                        formSubmitting: false,
                        formSuccessMsg: 'Player updated successfully.'
                    });
                     setTimeout(() => {
                        this.setState({formSuccessMsg: ''});
                    }, setTimeoutDelay);
                })
                .catch(err => {
                    this.setState({formSubmitting: false})
                })
            }
            else {
                // Add Player
                playersCollection.push(dataToSubmit)
                .then(() => {
                    this.setState({formSubmitting: false});
                    this.props.history.push(`${adminPlayers}`);
                })
                .catch(error => {
                    this.setState({formSubmitting: false});
                    this.setState({formHasError: true});
                });
            }
        }
        else {
            this.setState({formHasError: true});
        }
    }

    resetImageHandler = () => {
        const newFormData = Object.assign({}, this.state.formData);
        newFormData['image'].value = '';
        newFormData['image'].isValid = false;
        this.setState({
            defaultImage: '',
            formData: newFormData
        });
    }

    storeFilenameHandler = (filename) => {
        const newFormData = bindFormElementValue({id: 'image'}, this.state.formData, filename);
        this.setState({formData: newFormData});
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
        const errorMsgProps = {
            formSuccessMsg: this.state.formSuccessMsg,
            formHasError: this.state.formHasError,
            submitFormHandler: this.submitFormHandler,
            formSubmitting: this.state.formSubmitting,
            formType: this.state.formType
        };

        const fileUploadProps = {
            dir: 'players',
            tag: 'Player image',
            defaultImage: this.state.defaultImage,
            defaultImageName: this.state.formData.image.value,
            resetImage: () => this.resetImageHandler(),
            filename: (filename) => this.storeFilenameHandler(filename)
        };

        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    {!this.state.formIsFetchingData ?
                        <h2>
                            {this.state.formType}
                        </h2>
                        :
                        null
                    }
                    <div>
                        {!this.state.formIsFetchingData ?
                            <form onSubmit={this.submitFormHandler}>
                                <FileUploader {...fileUploadProps} />
                                <FormElement 
                                    id={this.state.formData.name.config.name}
                                    formData={this.state.formData.name}
                                    onChange={(element) => this.onChangeHandler(element)}
                                />
                                <FormElement 
                                    id={this.state.formData.lastname.config.name}
                                    formData={this.state.formData.lastname}
                                    onChange={(element) => this.onChangeHandler(element)}
                                />
                                <FormElement 
                                    id={this.state.formData.number.config.name}
                                    formData={this.state.formData.number}
                                    onChange={(element) => this.onChangeHandler(element)}
                                />
                                <FormElement 
                                    id={this.state.formData.position.config.name}
                                    formData={this.state.formData.position}
                                    onChange={(element) => this.onChangeHandler(element)}
                                />
                                <ErrorMsg {...errorMsgProps} />
                            </form>
                            :
                            <LinearProgress />
                        }
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditPlayer;