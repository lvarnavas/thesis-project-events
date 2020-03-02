import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './EventItem.css';

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

const CategoryItem = props => {
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
      };

    return (
            <li className="event-item">
                <Card style={{padding: 0}}>
                    <Link to={`/specific/${props.id}`} className="link-item">
                    <Slider {...settings}>
                        {props.images.map((image, index) => (
                            <div key={index} className="place-item__image">
                              <img 
                              src={`${process.env.REACT_APP_ASSET_URL}/${image}`} 
                              alt={props.title} 
                              />
                            </div>
                        ))}
                    </Slider>
                    <div className="place-item__info">
                        <h2 style={{color: "#ff0055"}}> {props.title} </h2>
                        <p style={{fontSize: "20px"}}>{props.description}</p>
                    </div>
                    </Link>
                </Card>
            </li>
        );
    };

export default CategoryItem;