import React, { useEffect, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';

import StartDateList from '../components/StartDateList';

const StartDateEvents = () => {  
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedEvents, setLoadedEvents] = useState();
    const exactdate = useParams().date;
    
    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/events/startdate/${exactdate}`
            );
            setLoadedEvents(responseData.events);
        } catch (err) {}
        };
        fetchEvents();
    }, [sendRequest, exactdate]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <div>
                <h1 className="center" style={{color: 'white'}}> 
                    You searched for Events beginning the date of 
                </h1>
                    <p style={{fontSize: '35px', textAlign: 'center'}}> 
                        <b style={{color: '#ff0055'}}>{exactdate}</b> 
                    </p>
                {!isLoading && loadedEvents && <StartDateList items={loadedEvents}/>}
            </div>
        </React.Fragment>
        );
    };

export default StartDateEvents;