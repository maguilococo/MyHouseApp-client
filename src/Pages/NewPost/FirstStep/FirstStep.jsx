import React from 'react';
import useCreatePost from '../hooks/useCreatePost';
import '../step.css';

const FirstStep = () => {
  const { /* setCurrentComponent, */ postDetails, current, steps, setCurrent } =
    useCreatePost();

  return (
    <div className='ctn'>
      <h3>Tu pago se ha realizado correctamente</h3>
      <h3>{`Continúa los siguientes pasos para crear tu publicación con el Plan ${
        postDetails.premium ? 'Premium' : 'Basic'
      }`}</h3>
      {current < steps.length - 1 && (
        <button onClick={() => setCurrent(current + 1)}>Siguiente</button>
      )}
    </div>
  );
};

export default FirstStep;
