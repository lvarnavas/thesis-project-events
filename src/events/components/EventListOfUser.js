import React from 'react';

import EventItemOfUser from './EventItemOfUser';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './EventListOfUser.css';

const EventListOfUser = props => {
    if (props.items.length === 0) {
        return (
            <div className="place-list" center="true">
                <Card>
                    <h2>You don't own any event. Maybe create one?</h2>
                    <Button to="/events/new" >Create Event</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {props.items.map(event => 
                <EventItemOfUser 
                    key={event.id} 
                    id={event.id} 
                    images={JSON.parse(event.images)}  
                    title={event.title}
                    address={event.address}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    startTime={event.startTime} 
                    description={event.description}
                    lat={event.lat}
                    lng={event.lng}

                    category={event.category.category}
                    city={event.city.city}
                    prefecture={event.prefecture.prefecture}
                    
                    
                    creatorId={event.userId} 
                    onDelete={props.onDeleteEvent}
                />
            )}
        </ul>
    );
};

export default EventListOfUser;