import React, { useEffect, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';

import CategoryList from '../components/CategoryList';

const CategoryEvents = () => {  
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedEvents, setLoadedEvents] = useState();
    const [categ, setCateg] = useState();
    const categoryId = useParams().categoryId;
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/events/category/${categoryId}`
                );
                setLoadedEvents(responseData.events);
                const categ = responseData.events.find(event => event);
                const kathgoria = categ.category.category;
                setCateg(kathgoria);
            } catch (err) {}
        };
        fetchEvents();
    }, [sendRequest, categoryId]);

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
                     You searched for Events that belong to the category 
                    </h1>
                    <p style={{fontSize: '35px', textAlign: 'center'}}> 
                        <b style={{color: '#ff0055'}}>{categ}</b> 
                    </p>
                {!isLoading && loadedEvents && <CategoryList items={loadedEvents}/>}
                </div>
            </React.Fragment>
        );
    };

export default CategoryEvents;