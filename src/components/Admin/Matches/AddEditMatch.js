import React, { Component } from 'react';

import { teamsCollection, matchesCollection, firebaseDB } from '../../../firebase/firebaseConfig';
import { firebaseDataTrans } from '../../../shared/utility/helperFunctions';

import AdminLayout from '../../../hoc/AdminLayout/AdminLayout';
import FormElement from '../../UI/FormElement/FormElement';
import ErrorMsg from '../Misc/ErrorMsg';
import { bindFormElementValue } from '../../../shared/utility/helperFunctions';
import { adminMatchesRoute } from '../../../shared/utility/routeConstants';
import { setTimeoutDelay } from '../../../shared/utility/numberConstants';
import LinearProgress from '@material-ui/core/LinearProgress';

class AddEditMatch extends Component {
    state = {
        matchId: '',
        formType: '',
        formHasError: false,
        formIsFetchingData: true,
        formSuccessMsg: '',
        fomrSubmitting: false,
        teams: [],
        labels: ['local', 'away'],
        formData: {
            date: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'date',
                    type: 'date',
                    maxLength: 50,
                    label: 'Event date'
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            },
            local: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: ''
            },
            resultLocal: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'resultLocal',
                    type: 'number',
                    maxLength: 5,
                    style: {width: '30%', textAlign: 'center'}
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: ''
            },
            away: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: ''
            },
            resultAway: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'resultAway',
                    type: 'number',
                    maxLength: 5,
                    style: {width: '30%', textAlign: 'center'}
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: ''
            },
            referee: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'referee',
                    type: 'text',
                    maxLength: 50,
                    label: 'Referee'
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            },
            stadium: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'stadium',
                    type: 'text',
                    maxLength: 50,
                    label: 'Stadium'
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            },
            result: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'result',
                    type: 'select',
                    options: [
                        {value: 'W', displayValue: 'W'},
                        {value: 'L', displayValue: 'L'},
                        {value: 'D', displayValue: 'D'},
                        {value: 'n/a', displayValue: 'n/a'}
                    ],
                    label: 'Team Result'
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            },
            final: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'final',
                    type: 'select',
                    options: [
                        {value: 'No', displayValue: 'No'},
                        {value: 'Yes', displayValue: 'Yes'}
                    ],
                    label: 'Game Played ?'
                },
                validation: {
                    required: true
                },
                isValid: false,
                validationMsg: '',
                showLabel: true
            }
        }
    };

    componentDidMount() {
        const matchId = this.props.match.params.matchId;
        const getTeams = (match, formType) => {
            teamsCollection.once('value').then(res => {
                const teams = firebaseDataTrans(res);
                const teamOptions = [];
                
                res.forEach(data => {
                    teamOptions.push({
                        value: data.val().shortName,
                        displayValue: data.val().shortName
                    });
                });
                this.updateFieldsHandler(match, matchId, formType, teams, teamOptions);
            });
        };
        
        if (!matchId) {
            // Add Match
            getTeams(false, 'Add Match');
        }
        else {
            // Edit Match
            firebaseDB.ref(`matches/${matchId}`).once('value')
            .then(res => {
                const match = res.val();
                getTeams(match, 'Edit Match');
            })
            .catch(err => {

            });
        }
    }

    updateFieldsHandler = (match, matchId, formType, teams, teamOptions) => {
        const newFormData = Object.assign({}, this.state.formData);

        for (let key in newFormData) {
            if (match) {
                newFormData[key].value = match[key]; 
                newFormData[key].isValid = true; 
            }

            if (key === 'local' || key === 'away') {
                newFormData[key].config.options = teamOptions;
            }
        }

        this.setState({
            matchId,
            formType,
            formData: newFormData,
            teams,
            formIsFetchingData: false
        });
    }

    onChangeHandler = (element) => {
        const newFormData = bindFormElementValue(element, this.state.formData);

        this.setState({
            formHasError: false,
            formSuccessMsg: '',
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

        this.state.teams.forEach(team => {
            if (team.shortName === dataToSubmit.local) {
                dataToSubmit['localThmb'] = team.thmb;
            }
            if (team.shortName === dataToSubmit.away) {
                dataToSubmit['awayThmb'] = team.thmb;
            }
        });

        if (formIsValid) {
            if (this.state.matchId) {
                // EDIT MATCH
                this.setState({formSubmitting: true});
                firebaseDB.ref(`matches/${this.state.matchId}`).update(dataToSubmit)
                .then(res => {
                    this.setState({
                        formSuccessMsg: 'Match updated successfully.',
                        formSubmitting: false
                    });
                    setTimeout(() => {
                        this.setState({formSuccessMsg: ''});
                    }, setTimeoutDelay);
                })
                .catch(err => {
                    this.setState({
                        formHasError: true,
                        formSubmitting: false
                    });
                });
            }
            else {
                // ADD MATCH
                this.setState({formSubmitting: true});
                matchesCollection.push(dataToSubmit)
                .then(() => {
                    this.props.history.push(`${adminMatchesRoute}`);
                })
                .catch(() => {
                    this.setState({
                        formHasError: true,
                        formSubmitting: false
                    });
                });
            }
        }
        else {
            this.setState({formHasError: true});
        }
    }

    render() {
        const props = {
            formSuccessMsg: this.state.formSuccessMsg,
            formHasError: this.state.formHasError,
            submitFormHandler: this.submitFormHandler,
            formSubmitting: this.state.formSubmitting,
            formType: this.state.formType
        };

        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
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
                                <FormElement 
                                    id={this.state.formData.date.config.name}
                                    formData={this.state.formData.date}
                                    onChange={(element) => this.onChangeHandler(element)}
                                />
                                {this.state.labels.map((label, index) => (
                                    <div
                                        key={index} 
                                        className="select_team_layout"
                                    >
                                        <div className="label_inputs">{label}</div>
                                        <div className="wrapper">
                                            <div className="left">
                                                <FormElement 
                                                    id={label}
                                                    formData={index === 0 ? this.state.formData.local : this.state.formData.away}
                                                    onChange={(element) => this.onChangeHandler(element)}
                                                />
                                            </div>
                                            <div>
                                                <FormElement 
                                                    id={`result${label.charAt(0).toUpperCase() + label.slice(1)}`}
                                                    formData={index === 0 ? this.state.formData.resultLocal : this.state.formData.resultAway}
                                                    onChange={(element) => this.onChangeHandler(element)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                                <div className="split_fields">
                                    <FormElement 
                                        id={this.state.formData.referee.config.name}
                                        formData={this.state.formData.referee}
                                        onChange={(element) => this.onChangeHandler(element)}
                                    />
                                    <FormElement 
                                        id={this.state.formData.stadium.config.name}
                                        formData={this.state.formData.stadium}
                                        onChange={(element) => this.onChangeHandler(element)}
                                    />
                                </div>
                                <div className="split_fields last">
                                    <FormElement 
                                        id={this.state.formData.result.config.name}
                                        formData={this.state.formData.result}
                                        onChange={(element) => this.onChangeHandler(element)}
                                    />
                                    <FormElement 
                                        id={this.state.formData.final.config.name}
                                        formData={this.state.formData.final}
                                        onChange={(element) => this.onChangeHandler(element)}
                                    />
                                </div>
                                <ErrorMsg {...props} />                               
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

export default AddEditMatch;