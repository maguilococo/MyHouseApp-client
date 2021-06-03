import React from 'react';
import { useSelector } from 'react-redux';
import useCreatePost from '../../../Pages/NewPost/hooks/useCreatePost';
import axios from 'axios';
import style from './PlansCard.module.css';

function PlansCard({ plan, price, description, numberPhotos, data, id }) {
  const { session } = useSelector((store) => store);
  const { current, setCurrent, setInfoPlan } = useCreatePost();
  const orderData = {
    quantity: 1,
    title:plan,
    unit_price: parseInt(price),
    description,
    category_id: id,
    userEmail: session.email,
    userName: session.name,
  };

  return (
    <div className={style.ctn} id='form1'>
      <div>
        <h1>{plan}</h1>
        <h2>{`$ ${price}`}</h2>
      </div>
      <button onClick={() => {
        setInfoPlan(orderData)
        let element = document.getElementById(current)
        element.className = 'active';
        setCurrent(current + 1);
        }} className={style.button} id={id}>PUBLICA TU PROPIEDAD</button>
      <div className={style.text}>
        <h4>{`${numberPhotos} fotos`}</h4>
        <label>Tomadas por ti</label>
      </div>
      <div className={style.text}>
      <h4>{description}</h4>
      </div>
    </div>
  )
}

export default PlansCard;
