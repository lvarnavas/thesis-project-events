import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = props => {
  const [files, setFiles] = useState();

  const [isValid, setIsValid] = useState(false);
  const { sendRequest } = useHttpClient();
  let [loadedEvents, setLoadedEvents] = useState();

  const { id, onInput } = props;

  const filePickerRef = useRef();

  const eventId = useParams().eventId;  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (files) {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/events/image`,
            "POST",
            files
          );
          onInput(id, responseData.images, true);
          setLoadedEvents(responseData.images);
        }
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, setLoadedEvents, files, eventId, id, onInput]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const onImagesSelect = event => {

    const images = Array.from(event.target.files);
    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image);
    }
    setFiles(formData);
    setIsValid(true);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        multiple
        accept=".jpg,.png,.jpeg"
        onChange={onImagesSelect}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        {!loadedEvents && (
          <div className="image-upload__preview">
            <p>Pick an image.</p>
          </div>
        )}
        {loadedEvents &&
          loadedEvents.map((event, index) => (
            <div key={index} className="image-upload__preview">
              <img src={`${process.env.REACT_APP_ASSET_URL}/${event.image}`} alt="Preview" />
            </div>
          ))}
        <Button type="button" onClick={pickImageHandler}>
          Pick Images
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;