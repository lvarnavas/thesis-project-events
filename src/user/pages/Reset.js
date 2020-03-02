import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_EMAIL } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import { useHttpClient } from '../../shared/hooks/http-hook';

import '../../events/pages/EventForm.css';

const Reset = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();

    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        }
    }, false);
 
    const userUpdateSubmitHandler = async () => {
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/users/reset',
                'POST',
                JSON.stringify({
                  email: formState.inputs.email.value
                }),
                {
                  'Content-Type': 'application/json'
                }
              );
              history.push('/');
        } catch (err) {}
    }

    if (isLoading) {
        return (
            <div className="center" >
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && (
                <form className="place-form" >
                <h2 className="center"> Enter your e-mail. </h2>
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Button 
                        type="submit" 
                        disabled={!formState.isValid}
                        onClick={userUpdateSubmitHandler}
                    >
                        RESET PASSWORD
                    </Button>
                    {formState.isValid && 
                    <div className="center"> 
                        <p style={{fontSize: 20}}>By clicking 
                        <b style={{color: "#ff0055"}}> 
                            &nbsp; RESET PASSWORD &nbsp; 
                        </b> 
                        you'll receive an e-mail to reset your password. 
                        </p>
                    </div>}
                </form>
            )}
        </React.Fragment>
    );
};

export default Reset;