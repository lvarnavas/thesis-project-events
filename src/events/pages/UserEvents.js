import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventListOfUser from '../components/EventListOfUser';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Card from '../../shared/components/UIElements/Card';

import '../../events/components/EventItem.css'

const UserEvents = () => {
    const [loadedEvents, setLoadedEvents] = useState();
    const [length, setLength] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/events/user/${userId}`
            );
            setLoadedEvents(responseData.events);
            setLength(responseData.events.length);
        } catch (err) {} 
        };
        fetchEvents();
    }, [sendRequest, userId]);

    const eventDeletedHandler = deletedEventId => {
        setLoadedEvents(prevEvents => 
            prevEvents.filter(event => event.id !== deletedEventId)
        );
    };

    return (
        <React.Fragment>
            <div className="place-list" center="true">
                <h2 className="center" style={{color: 'white'}}> 
                    The list of your Events. 
                </h2>
                <hr/>
                {length > 0 && (
                    <div className="center">
                        <Card  style={{width: '200px', backgroundColor: "#ff0055"}}>
                            <h2 className="center" style={{color: 'white'}}> 
                                You own  &nbsp;
                            <span style={{color: "#f8df00", fontSize: '30px'}}> 
                                <i> { length } </i>  &nbsp; 
                            </span>
                            <span style={{color: 'white'}}> 
                                { length === 1 ? 'Event' : 'Events' } 
                            </span>
                            </h2>
                        </Card>
                    </div>
                )}                      
            </div>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedEvents && 
                <EventListOfUser 
                    items={loadedEvents} 
                    onDeleteEvent={eventDeletedHandler}
                />}
        </React.Fragment>
    );
};

export default UserEvents;