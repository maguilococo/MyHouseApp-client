import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import Loading from '../Auth0/Loading/loading';
import { getAvailablePosts } from '../../Redux/Actions/index';
import style from './Cards.module.css';

function Cards({ principalState, principal }) {
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      principal(); 
      setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = principalState?.map((e) => (
    <Card
      key={e.id}
      image={e.images[0]?.photo[0]}
      postName={e.post_name}
      propType={e.prop_type}
      neighborhood={e.neighborhood}
      description={e.description}
      price={e.price}
      rooms={e.rooms}
      bathrooms={e.bathrooms}
      m2={e.m2}
      id={e.id}
      premium={e.premium}
      views={e.views}
    />
  ));
  return (
    <div className={(!loading && style.ctn)}>
      {loading ? <Loading/> : <div> {list} </div>}
    </div>
    
  );
}

const mapStateToProps = (state) => ({
  principalState: state.principal,
});

const mapDispatchToProps = (dispatch) => ({
  principal: () => dispatch(getAvailablePosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
