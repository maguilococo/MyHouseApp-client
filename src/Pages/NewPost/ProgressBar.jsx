import React, { useEffect } from 'react';
import useCreatePost from './hooks/useCreatePost';
import axios from 'axios';
import imagen from '../../images/step_form/green.jpg'
import './step.css';


const ProgressBar = () => {
  const { postDetails, current, setCurrent, steps, infoPlan } = useCreatePost();

  const prev = () => {
    setCurrent(current - 1);
    console.log('prev ', current)
    let element = document.getElementById(current-1)
    element.className = '';
  };

  //====================Mercadopago=======================================================
  const { REACT_APP_API_BASE_ENDPOINT } = process.env;
  function createCheckoutButton(preference) {
    const script = document.createElement('script');
    const attrDataPreference = document.createAttribute('data-preference-id');
    attrDataPreference.value = preference.id;
    script.src =
      'https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
    script.setAttributeNode(attrDataPreference);
    if (document.getElementById('buttonId')) {
      document.getElementById('buttonId').innerHTML = '';
      document.getElementById('buttonId').appendChild(script);
      return () => {
        document.getElementById('buttonId').removeChild(script);
      };
    }
  }

    useEffect(() => {
      if(current === 5) {
        localStorage.setItem('post', JSON.stringify(postDetails))
        // axios.post(`http://localhost:3001/mercadopago`, infoPlan)
        axios.post(`${REACT_APP_API_BASE_ENDPOINT}/mercadopago`, infoPlan)
          .then((r) => {
            createCheckoutButton(r.data);
          })
      }
    }, [current, infoPlan]);
    //====================Mercadopago=======================================================


  return (
      <div className='step_form'>
        {/* <img alt='img' className='backImg' src={imagen} /> */}
        <div className='steps-content' style={{opacity:'150%'}}>
          <ul className='progressbar'>
            <span current={current}>
              {steps.map((item, index) => (
                <li key={item.title} id={index}>{item.title}</li>
              ))}
            </span>
          </ul>
          <div id='content'>{steps[current].content}</div>
            {current === steps.length - 1 && (
              <button type='button' id='buttonId'>
                Publicar
              </button>
            )}
            {current > 0 && (
              <button type='button' id='backBtn' className="btns" style={{ margin: '0 8px' }} onClick={() => prev()}>
                Volver
              </button>
            )}
        </div>
      </div>
  );
};

export default ProgressBar;
