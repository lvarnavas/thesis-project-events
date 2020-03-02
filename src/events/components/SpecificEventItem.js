import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from '../../shared/util/validators';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Comment from '../pages/Comment';

import './SpecificEventItem.css';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import placeholder from '../icons/placeholder.png';
import interests from '../icons/interests.png';
import calendar from '../icons/calendar.png';
import clock from '../icons/clock.png';
import notes from '../icons/notes.png';
import copyright from '../icons/copyright.png';
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

const SpecificEventItem = props => {
    const [showMap, setShowMap] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const eventId = useParams().eventId;

    const [formState, inputHandler] = useForm(
        {
            comment: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const showReportWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelReportHandler = () => {
        setShowConfirmModal(false);
    };

    const history = useHistory();

    const confirmReportHandler = async event => {
        event.preventDefault();
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/events/report/${eventId}`, 
                'POST',
                JSON.stringify({
                    userId: auth.userId,
                    creatorId: props.creatorId
                }),
                { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
        } catch (err) {}
    };

    const eventCommentSubmitHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/events/comment/${eventId}`, 
                'POST', 
                JSON.stringify({
                    comment: formState.inputs.comment.value,
                    userId: auth.userId
                }),
                { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token 
                }
            );
            history.push('/' );
        } catch (err) {}
    };

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    
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
                onCancel={cancelReportHandler}
                header="Are you sure?" 
                footerClass="place-item__modal-actions" 
                footer={
                <React.Fragment>
                    <Button inverse onClick={cancelReportHandler}>CANCEL</Button>
                    <Button danger onClick={confirmReportHandler}>REPORT</Button>
                </React.Fragment>
                }>
                <p>Do you want to proceed and report this event? Please note that 
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
                    <div style={{textAlign: 'right', fontSize: "15px"}}>
                    <img src={copyright} alt="Logo"/> 
                        <strong style={{fontSize: "17px"}}> {props.creator} </strong>
                    </div>
                </div>
                <div className="place-item__actions" style={{backgroundColor: 'white'}}>
                    <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                    <Button danger onClick={showReportWarningHandler}>
                        REPORT
                    </Button>
                </div>
            </li>
            {isLoading && <LoadingSpinner asOverlay />}
            <p style={{color: 'white', fontSize: '18px'}}>Add your comment</p>
            <Input
                id="comment"
                element="textarea"
                placeholder="Enter your comment here..."
                validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(255)]}
                errorText="Please enter at least 3 characters."
                onInput={inputHandler}
            />
            <Button 
                onClick={eventCommentSubmitHandler} 
                disabled={!formState.isValid}>
                    ADD COMMENT
            </Button>           
            <hr/>
            <div>
                <Comment className="comment-item__content"/>
            </div>   
    </React.Fragment>
    );
};

export default SpecificEventItem;