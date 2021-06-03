import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAvailableFilteredPropierties, orderBy } from '../../Redux/Actions';
import style from './Order.module.css';

function Orders({ sorting, filter }) {
  const history = useHistory();
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);

  useEffect(() => {
    if (!params.get('orden')) {
      params.delete('orden');
    }
    if (!params.get('atributo')) {
      params.delete('atributo');
    }
  });

  function handleOrder(e) {
    const [prop, type] = e.target.value.split('_');
    const parameters = window.location.search ? window.location.search.slice(1).split('&') : null;
    const queryBlock = {};
    if (parameters) {
      parameters.forEach((param) => {
        if (param.split('=')[0] !== 'page') {
          // eslint-disable-next-line prefer-destructuring
          queryBlock[`${param.split('=')[0]}`] = param.split('=')[1];
          params.set(`${param.split('=')[0]}`, param.split('=')[1]);
        }
      });
    }
    history.push(`/home?${params.toString()}`);
    sorting({ prop, type });
    filter(queryBlock);
  }

  return (
    <div className={style.selectNav}>
      <div className={style.selectMenu}>
        <select name="filters" value="" onChange={(e) => handleOrder(e)}>
          <option value="" disabled hidden>Ordenar</option>
          <optgroup label="Precio">
            <option name="price_ASC" value="price_ASC">- a +</option>
            <option name="price_DESC" value="price_DESC">+ a -</option>
          </optgroup>
          <optgroup label="Habitaciones">
            <option name="rooms_ASC" value="rooms_ASC">- a +</option>
            <option name="rooms_DESC" value="rooms_DESC">+ a -</option>
          </optgroup>
          <optgroup label="Visitas">
            <option name="views_ASC" value="views_ASC">- a +</option>
            <option name="views_DESC" value="views_DESC">+ a -</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    sorting: (order) => dispatch(orderBy(order)),
    filter: (queryBlock) => dispatch(getAvailableFilteredPropierties(queryBlock)),
  };
}

export default connect(null, mapDispatchToProps)(Orders);
