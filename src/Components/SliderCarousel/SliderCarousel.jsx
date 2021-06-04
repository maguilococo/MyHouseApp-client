import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import {
  slider,
  slide,
  active,
  rightArrow,
  leftArrow,
  image,
  divImage,
} from './SliderCarousel.module.css';

const SliderCarousel = ({ elementsContainer }) => {
  const [current, setCurrent] = useState(0);
  let photo = [];
  if (
    typeof elementsContainer[0] === 'string' ||
    elementsContainer.length === 0
  ) {
    photo = elementsContainer;
  } else {
    photo = elementsContainer[0].photo;
  }

  const elementsLength = photo.length;

  if (!elementsLength) {
    return (
      <div className={divImage}>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'
          alt='no available'
        />
      </div>
    );
  }

  const next = () => {
    setCurrent(current === elementsLength - 1 ? 0 : current + 1);
  };
  const previous = () => {
    setCurrent(current === 0 ? elementsLength - 1 : current - 1);
  };

  return (
    <section className={slider}>
      {elementsLength > 1 && (
        <>
          <FontAwesomeIcon
            size='5x'
            icon={faAngleLeft}
            onClick={previous}
            className={leftArrow}
          />
          <FontAwesomeIcon
            size='5x'
            icon={faAngleRight}
            onClick={next}
            className={rightArrow}
          />
        </>
      )}

      {photo.map((element, index) => (
        <div className={index === current ? `${slide} ${active}` : `${slide}`}>
          {index === current && (
            <img
              className={image}
              key={element}
              src={element}
              alt='house view'
            />
          )}
        </div>
      ))}
    </section>
  );
};

export default SliderCarousel;
