import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './EventForm.css';

const UpdateEvent = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvent, setLoadedEvent] = useState();
  const eventId = useParams().eventId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      startDate: {
        value: '',
        isValid: false
      },
      endDate: {
        value: '',
        isValid: false
      },
      startTime: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`
        );
        setLoadedEvent(responseData.event);
        setFormData(
          {
            title: {
              value: responseData.event.title,
              isValid: true
            },
            address: {
                value: responseData.event.address,
                isValid: true
            },
            startDate: {
                value: responseData.event.startDate,
                isValid: true
            },
            endDate: {
                value: responseData.event.endDate,
                isValid: true
            },
            startTime: {
                value: responseData.event.startTime,
                isValid: true
            },
            description: {
              value: responseData.event.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchEvent();
  }, [sendRequest, eventId, setFormData]);

  const eventUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          address: formState.inputs.address.value,
          startDate: formState.inputs.startDate.value,
          endDate: formState.inputs.endDate.value,
          startTime: formState.inputs.startTime.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/user/' + auth.userId );
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedEvent && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Event!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <h1 className="center" style={{color: 'white'}}> You chose to edit 
        <span style={{color: '#ff0055'}}> &nbsp; { loadedEvent.title } &nbsp; </span>
         Event
      </h1>
      {!isLoading && loadedEvent && (
        <form className="place-form" onSubmit={eventUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedEvent.title}
            initialValid={true}
          />
          <Input
            id="address"
            element="input"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
            initialValue={loadedEvent.address}
            initialValid={true}
          />
          <Input
            id="startDate"
            element="input"
            type="date"
            label="Start Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid startDate."
            onInput={inputHandler}
            initialValue={loadedEvent.startDate}
            initialValid={true}
          />
          <Input
            id="endDate"
            element="input"
            type="date"
            label="End Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid endDate."
            onInput={inputHandler}
            initialValue={loadedEvent.endDate}
            initialValid={true}
          />
          <Input
            id="startTime"
            element="input"
            type="time"
            label="Start Time"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid startTime."
            onInput={inputHandler}
            initialValue={loadedEvent.startTime}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(255)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedEvent.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE EVENT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateEvent;