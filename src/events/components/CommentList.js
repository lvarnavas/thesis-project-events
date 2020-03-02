import React from 'react';

import CommentItem from './CommentItem';
import './EventsList.css';

const CommentList = props => {

    return (
        <div className="place-list">
            {props.items.map(event => 
                <CommentItem
                    key={event.id} 
                    id={event.id} 
                    content={event.content}
                    image={event.image}
                    creatorId={event.userId}
                    user={event.user.name}
                    eventId={event.eventId}
                    onDeleteComment={props.onDeleteComment}
                    createdAt={event.createdAt}
                />
            )}
            
        </div>
    );
};
export default CommentList;
