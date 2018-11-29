import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ErrorMsg = (props) => {
    return (
        <React.Fragment>
            {props.formSuccessMsg ?
                <div className="success_label">{props.formSuccessMsg}</div>
                :
                null
            }
            {props.formHasError ?
                <div className="error_label">Something went wrong.</div>
                :
                null
            }
            <div>
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={props.submitFormHandler}
                >
                    {props.formSubmitting ?
                        <CircularProgress size={30} /> 
                        :
                        props.formType
                        }
                    </Button>
            </div>
        </React.Fragment>
    );
};

export default ErrorMsg;