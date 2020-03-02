import React, { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './EventItem.css';

const CommentItem = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(`
            ${process.env.REACT_APP_BACKEND_URL}/events/comment/${props.id}/event/${props.eventId}`,
            'DELETE',
            null,
            {
                Authorization: 'Bearer ' + auth.token
            }
        );
        props.onDeleteComment(props.id);
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
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
            <p>Do you want to proceed and delete this comment?</p>
            </Modal>
            <li>
                {isLoading && <LoadingSpinner asOverlay/>}
                <p style={{textAlign: 'center', color: 'white'}}> 
                    <strong style={{color: '#ff0055'}}> {props.user} </strong> commented at {props.createdAt} </p>
                <div className="comment__content" style={{color: 'white', textAlign: 'center'}}> {props.content} </div>   
                <hr/>
                <div className="center">
                    {auth.userId === props.creatorId && (
                        <Button  danger onClick={showDeleteWarningHandler}>
                            DELETE
                        </Button>
                    )}
                </div>
            </li>
        </React.Fragment>
        );
    };

export default CommentItem;
