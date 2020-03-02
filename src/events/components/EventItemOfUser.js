import React, {useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './EventItemOfUser.css';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './EventItem.css';
import placeholder from '../icons/placeholder.png';
import interests from '../icons/interests.png';
import calendar from '../icons/calendar.png';
import clock from '../icons/clock.png';
import notes from '../icons/notes.png';
import googlemaps from '../icons/googlemaps.png';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

const EventItemOfUser = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const history = useHistory();

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/events/${props.id}`, 
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.id);
            history.push('/');
        } catch (err) {}
    };

    const lat = parseFloat(props.lat);
    const lng = parseFloat(props.lng);

    const coordinates = {lat: lat, lng: lng}

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal 
                show={showMap} 
                onCancel={closeMapHandler} 
                header={props.address} 
                contentClass="place-item__modal-content" 
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler} >CLOSE</Button>}
            >
            <div className="map-container" >
                <Map center={coordinates} zoom={16} />
            </div>
            </Modal>
            <Modal 
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?" 
                footerClass="place-item__modal-actions" 
                footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }>
            <p>Do you want to proceed and delete this event? Please note that 
                it can't be undone.
            </p>
            </Modal>
            <li className="place-item">
                {isLoading && <LoadingSpinner asOverlay />}
                <Slider {...settings}>
                {props.images.map((image, index) => (
                    <div key={index} className="place-item__image">
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={props.title} />
                    </div>
                ))}
                </Slider>
                <div className="place-item__info" style={{backgroundColor: 'white'}}>
                    <h1>{props.title}</h1>
                    <div style={{fontSize: "22px"}}> 
                        <img src={googlemaps} alt="Logo"/> &nbsp; 
                        <strong style={{fontSize: "20px"}}> 
                        {props.address} &nbsp;
                        <img src={placeholder} alt="Logo"/> &nbsp; 
                        {props.city}, <i>{props.prefecture}</i> 
                        </strong> <br/>
                    </div>
                    <hr/>
                    <div style={{fontSize: "22px"}}>
                        <img src={interests} alt="Logo"/> &nbsp;
                        <strong style={{fontSize: "20px"}}> {props.category} </strong>
                    </div>
                    <hr/>
                    <div style={{fontSize: "22px"}}>
                    <img src={calendar} alt="Logo"/> &nbsp; 
                        Begins &nbsp;
                        <strong style={{fontSize: "20px"}}> {props.startDate} </strong> 
                        &nbsp; ends &nbsp;
                        <strong style={{fontSize: "20px"}}> {props.endDate} </strong>
                    </div>
                    <hr/>
                    <div style={{fontSize: "22px"}}>
                    <img src={clock} alt="Logo"/> &nbsp; 
                        Opening &nbsp;
                        <strong style={{fontSize: "20px"}}> {props.startTime} </strong>
                    </div>
                    <hr/>
                    <p style={{textAlign: 'left', fontSize: "22px"}}>
                    <img src={notes} alt="Logo"/> 
                        <span style={{fontSize: "20px"}}> {props.description} </span>
                    </p>
                </div>
                <div className="place-item__actions" style={{backgroundColor: 'white'}}>
                    <Button inverse onClick={openMapHandler}>
                        VIEW ON MAP
                    </Button>
                    {auth.userId === props.creatorId && (
                        <Button to={`/edit/${props.id}`}>
                            EDIT
                        </Button>
                    )}
                    {auth.userId === props.creatorId && (
                        <Button danger onClick={showDeleteWarningHandler}>
                            DELETE
                        </Button>
                    )}
                </div>
            </li>
        </React.Fragment>
    );
};

export default EventItemOfUser;