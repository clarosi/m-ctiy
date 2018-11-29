import React from 'react';

const FormElement = ({id, formData, onChange}) => {
    const showErrorHandler = () => {
        const errorMsg = (
            <div className="error_label">
                {formData.validation && !formData.isValid ? formData.validationMsg : null}
            </div>
        );
        return errorMsg;
    }

    const formTempleteHandler = () => {
        let formTemplete = null;

        switch (formData.elementType) {
            case ('input'):
                formTemplete = (
                    <div>
                        { formData.showLabel ?
                            <div className="label_inputs">
                                {formData.config.label}
                            </div>
                            :
                            null
                        }
                        <input 
                            {...formData.config}
                            value={formData.value}
                            onChange={(event) => onChange({event, id})}
							onBlur={(event) => onChange({event, id, blur: true})}
                        />
                        {showErrorHandler()}
                    </div>
                );
                break;  
            case ('select'):
                formTemplete = (
                    <div>
                        { formData.showLabel ?
                            <div className="label_inputs">
                                {formData.config.label}
                            </div>
                            :
                            null
                        }
                        <select
                            value={formData.value}
                            onChange={(event) => onChange({event, id})}
                        >
                            <option value="">Select one</option>
                            {
                                formData.config.options.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.displayValue}
                                    </option>
                                ))
                            }
                        </select>
                        {showErrorHandler()}
                    </div>
                );
                break;     
            default:
                formTemplete = null;
                break;
        }
        return formTemplete;
    }

    return (
        <React.Fragment>
            {formTempleteHandler()}
        </React.Fragment>
    );
}

export default FormElement;