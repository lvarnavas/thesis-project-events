import React, { useEffect, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';

import PrefectureList from '../components/PrefectureList';

const PrefectureEvents = () => {  
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedEvents, setLoadedEvents] = useState();
    const [prefec, setPrefec] = useState();
    const prefectureId = useParams().prefectureId;
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/events/prefecture/${prefectureId}`
                );
                setLoadedEvents(responseData.events);
                const pref = responseData.events.find(event => event);
                const nomos = pref.prefecture.prefecture;
                setPrefec(nomos);
            } catch (err) {}
        };
        fetchEvents();
    }, [sendRequest, prefectureId]);

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
                    You searched for Events that belong to the prefecture 
                </h1>
                    <p style={{fontSize: '35px', textAlign: 'center'}}> 
                        <b style={{color: '#ff0055'}}>{prefec}</b> 
                    </p>
                {!isLoading && loadedEvents && <PrefectureList items={loadedEvents}/>}
                </div>
            </React.Fragment>
        );
    };

export default PrefectureEvents;