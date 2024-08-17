import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';


function SampleNextArrow(props) {
  const { onClick } = props;
  return <div className="next-arrow" onClick={onClick}><FontAwesomeIcon icon={faAngleRight} /></div>;
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return <div className="prev-arrow" onClick={onClick}><FontAwesomeIcon icon={faAngleLeft} /></div>;
}

const MyCarousel = (props) => {
  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    // speed: 1000,
    slidesToShow: props.slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {props.sliderFor === "Certificate"
          ? props.images.map((image, key) => (
              <div key={key} className="slide">
                <img src={image.image} alt="Slide 1" />
              </div>
            ))
          : null}

        {props.sliderFor === "Testimonials"
          ? props.testimonialList.map((details, key) => (
              <div key={key} className="slide">
                <div className="tm-card">
                  <div className="quote">
                    <div className="quote-up">
                      <FontAwesomeIcon icon={faQuoteLeft} />
                    </div>
                    <div className="quote-text">
                      <p>{details.description}</p>
                    </div>
                    <div className="quote-down">
                      <FontAwesomeIcon icon={faQuoteRight} />
                    </div>
                  </div>
                  <div className="client-name">
                      <img src="./Line.svg" alt="Line"/>
                      <p><strong>{details.name}</strong></p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Slider>
    </div>
  );
};

export default MyCarousel;
