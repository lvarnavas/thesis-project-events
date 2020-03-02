import React from 'react';

import EventItem from './EventItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './EventsList.css';

const EventList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>
                        No Events found in the system. <br/>
                        Would you like to be the first to create one?
                    </h2>
                    <Button to="/events/new" >CREATE EVENT</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="event-list">
            {props.items.map(event => (
                <EventItem
                    key={event.id} 
                    id={event.id} 
                    images={JSON.parse(event.images)} 
                    title={event.title}
                    address={event.address} 
                    description={event.description}
                />
            ))}
        </ul>
    );
};
export default EventList;