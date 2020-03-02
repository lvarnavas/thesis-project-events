import React, { useEffect, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';

import CityList from '../components/CityList';


const CityEvents = () => {  
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedEvents, setLoadedEvents] = useState();
    const [cities, setCities] = useState();
    const cityId = useParams().cityId;
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/events/city/${cityId}`
                );

                setLoadedEvents(responseData.events);
                const ct = responseData.events.find(event => event);
                const poli = ct.city.city;
                setCities(poli);
            } catch (err) {}
        };
        fetchEvents();
    }, [sendRequest, cityId]);

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
                    You searched for Events that are located at the city of 
                </h1>
                <p style={{fontSize: '35px', textAlign: 'center'}}> 
                    <b style={{color: '#ff0055'}}>{cities}</b> 
                </p>
                {!isLoading && loadedEvents && <CityList items={loadedEvents}/>}
            </div>
        </React.Fragment>
        );
    };

export default CityEvents;