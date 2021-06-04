import { useEffect, useState } from 'react';
import axios from 'axios';
import PlansCard from './PlansCard/PlansCard';
import style from './MercadoPago.module.css';
import Loading from '../Auth0/Loading/loading';

function MercadoPago() {
  const { REACT_APP_API_BASE_ENDPOINT } = process.env;
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get(`${REACT_APP_API_BASE_ENDPOINT}/mercadopago/plans`)
    .then((r) => {
      setPlans(r.data);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = plans.map((e) => {
    return (
      <PlansCard
      plan={e.plan}
      price={e.price}
      description={e.description}
      numberPhotos={e.numberPhotos}
      id={e.id}
      />
    )
  })

  return (
    <div className={style.ctn}>
      {!plans.length ? <Loading /> : list}
    </div>
  );
}

export default MercadoPago;
