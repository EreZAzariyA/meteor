import React from "react";
import "./style.css";
import { StoryCard } from "../story-card/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


export const StoriesSlider = ({stories})=>{

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return(
    <div className="slider_main_container">
      <div className="slider_inner_container">
        <Slider {...settings} className='slider'>

          {!stories || stories?.length === 0 &&
            new Array(9).fill(null).map((_, index) => (
                <StoryCard key={index} story={null}/>
              ))
          }

        </Slider>
      </div>
    </div>
  )
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "inline",borderRadius:'50%' ,background: "lightGray"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "inline",borderRadius:'50%' ,background: "lightGray"}}
      onClick={onClick}
    />
  );
}