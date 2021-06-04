import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {  FaEraser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import style from './Filter.module.css';
import { getAvailableFilteredPropierties } from '../../Redux/Actions';

function Filter({
  searched, filter, orderProp, orderType,
}) {
  const history = useHistory();
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const [URL, setURL] = useState('');
  const initialState = {
    // post_name: searched,
    prop_type: '',
    city: '',
    stratum: '',
    neighborhood: '',
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    rooms: '',
    bathrooms: '',
    years: '',
    pool: false,
    backyard: false,
    gym: false,
    bbq: false,
    parking_lot: false,
    elevator: false,
    security: false,
    garden: false,
    atributo: orderProp, // tipo de propiedad para ordenar
    orden: orderType, // modo a ordenar
  };
  const [queryBlock, setQueryBlock] = useState(initialState);

  function changeURL(event) {
    params.set(event.target.name, event.target.value);
    updatePath(params);
    setURL(window.location.href);
  }

  useEffect(() => {
    // params.set('post_name', searched);
    params.set('orden', orderType);
    params.set('atributo', orderProp);
    if (!params.get('post_name')) {
      params.delete('post_name');
    }
    if (!params.get('orden')) {
      params.delete('orden');
    }
    if (!params.get('atributo')) {
      params.delete('atributo');
    }
    updatePath(params);
    setQueryBlock({
      ...queryBlock,
      // post_name: searched,
      atributo: orderProp,
      orden: orderType,
    });// filter busca a la api externa
    filter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searched, orderProp, orderType]);

  useEffect(() => {
    // console.log('Hay cambios en la URL: ', URL);
    const paramsKeys = Object.keys(queryBlock);
    // traigo todos los valores del path y los pongo en mi queryBlock
    for (let i = 0; i < paramsKeys.length; i++) {
      queryBlock[paramsKeys[i]] = params.get(paramsKeys[i]);
      // elimino una query en el params si es null
      if (!params.get(paramsKeys[i])) {
        params.delete(paramsKeys[i]);
        updatePath(params);
      }
    }

    setQueryBlock({
      ...queryBlock,
      // post_name: searched,
      atributo: orderProp,
      orden: orderType,
    });
    filter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL]);

  function updatePath(params) {
    history.push(`${window.location.pathname}?${params.toString()}`);
  }

  function clear() {
    history.push('/home');
    setQueryBlock(initialState);
    filter({});
    document.getElementById('form').reset();
  }
  
  const [display, setDisplay] = useState(false);

  var rangeSlider = document.getElementById("rsRangeLine");
  var rangeBullet = document.getElementById("rsBullet");
  
  const showSliderValue = () => {
    rangeBullet.innerHTML = rangeSlider.value;
    let bulletPosition = (rangeSlider.value /rangeSlider.max);
    rangeBullet.style.left = bulletPosition * 90+ '%';
  } 

  return (
    <div className={style.filter}>
      <form id="form" className={style.form}>
      {/* Post name */}
      <div className={style.field}>
        <label>
          Título:&nbsp;
        </label>
        <input
          className={style.inputFilter}
          type="text"
          name="post_name"
          placeholder="Título"
          value={queryBlock.post_name}
          onChange={changeURL}
        />
      </div>

        {/* City */}
        <div className={style.field}>
          <label>
            Ciudad:&nbsp;
          </label>
          <input
            className={style.inputFilter}
            type="text"
            name="city"
            placeholder="Ciudad"
            value={queryBlock.city}
            onChange={changeURL}
          />
        </div>

        {/* Neighborhood */}
        <div className={style.field}>
          <label>
            Barrio:
          </label>
            <input
              className={style.inputFilter}
              type="text"
              name="neighborhood"
              placeholder="Barrio"
              value={queryBlock.neighborhood}
              onChange={changeURL}
            />
        </div>

        {/* Price min y max */}
        <div className={style.field}>
          <label>
            Precio (cop):&nbsp;
          </label>
          <div className={style.from_to}>
            desde&nbsp;
            <input
              className={style.inputMinMax}
              type="text"
              name="priceMin"
              placeholder="min"
              value={queryBlock.priceMin}
              onChange={changeURL}
            />
            &nbsp;hasta&nbsp;
            <input
              className={style.inputMinMax}
              type="text"
              name="priceMax"
              placeholder="máx"
              value={queryBlock.priceMax}
              onChange={changeURL}
            />
          </div>
        </div>
      <button type='submit' onClick={e => e.preventDefault()} style={{display: 'none'}}></button>

        {/* Rooms  */}
        <div className={style.field}>
          <label>
            Habitaciones:&nbsp;
          </label>
          <div className={style.buttons}>
            {['+1','+2','+3','+4','+5','+6'].map(
              (el, index) => 
             /*  <button className={ el[1] === queryBlock.rooms ? `${style.btnFilter} ${style.btnFilterActive}` : style.btnFilter} key={index} name="rooms"
              onClick={(e) =>{e.preventDefault(); changeURL(e);}} value={el[1]}
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              >
                {el}
              </button> */
              el.split('+')[1] === queryBlock.rooms
                ? (
                  <button  className={`${style.btnFilter} ${style.btnFilterActive}`} key={index} name="rooms"
                    onClick={(e) => { e.preventDefault(); changeURL(e); }} value={el[1]}
                    // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  >
                    {el}
                  </button>
                )
                : (
                  <button className={style.btnFilter} key={index} name="rooms"
                    onClick={(e) => { e.preventDefault(); changeURL(e); }} value={el[1]}
                    // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  >
                    {el}
                  </button>
                )
            )
            }
          </div>
        </div>

        {/* Bathrooms */}
        <div className={style.field}>
          <label>
            Baños:&nbsp;
          </label>
          <div className={style.buttons}>
            {['+1','+2','+3','+4','+5','+6'].map(
              (el, index) => 
                <button className={ el[1] === queryBlock.bathrooms ? `${style.btnFilter} ${style.btnFilterActive}` : style.btnFilter} key={index} name="bathrooms"
                onClick={(e) =>{e.preventDefault(); changeURL(e);}} value={el[1]}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                  {el}
                </button>
            )}
          </div>
        </div>

        {/* Area min y max */}
        <div className={style.rangeField}>
          <label>
            Área desde:
          </label>
        </div>
        <div class={style.rangeSlider}>
          <span id="rsBullet" class={style.rsLabel}>0 m²</span>
          <input id="rsRangeLine" className={style.rsRange} type="range" name="areaMin" defaultValue="0" /*  value={queryBlock.areaMin}*/
            onChange={showSliderValue}
            onMouseUp={changeURL} min="0" max="1000" />
        </div>
        <div class={style.boxMinmax}>
          <span>0m²</span><span>1000m²</span>
        </div>

        {/* Stratum */}
        <div className={style.field}>
          <label>
            Estrato:&nbsp;
          </label>
          <div className={style.buttons}>
            {[1,2,3,4,5,6].map(
              (el, index) => 
                <button className={ el == queryBlock.stratum ? `${style.btnFilter} ${style.btnFilterActive}` : style.btnFilter} key={index} name="stratum"
                onClick={(e) =>{e.preventDefault(); changeURL(e);}} value={el}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                  {el}
                </button>
            )}
          </div>
        </div>

        {/* Type of property */}
        <div className={style.field}>
          <select className={style.selectFilter} name="prop_type" value={queryBlock.prop_type} onChange={changeURL}>
            <option>Tipo de inmueble</option>
            {['Casa', 'Apartamento'].map((type, i) => (<option key={i} value={type}>{type}</option>))}
          </select>
        </div>

        {/* years */}
        <div className={style.field}>
          <label>
            Años:  &nbsp;
            <input
              className={style.inputMinMax}
              type="number"
              name="years"
              value={queryBlock.years}
              min="0"
              onChange={changeURL}
              placeholder="0"
            />
          </label>
        </div>

        {/* Facilities */}
        <div className={style.field} onClick={() => setDisplay(!display)}>
          <p className={style.tit_facilities}>
            Otras comodidades
          </p>
        </div>
        <div className={display ? style.facilities : style.noFacilities}>
          <input type="checkbox" checked={queryBlock.pool} onChange={changeURL} name="pool" value={!queryBlock.pool} />
          <label htmlFor="pool"> Piscina</label>
          <br />
          <input type="checkbox" checked={queryBlock.backyard} onChange={changeURL} name="backyard" value={!queryBlock.backyard} />
          <label htmlFor="backyard"> Patio</label>
          <br />
          <input type="checkbox" checked={queryBlock.gym} onChange={changeURL} name="gym" value={!queryBlock.gym} />
          <label htmlFor="gym"> Gimnasio</label>
          <br />
          <input type="checkbox" checked={queryBlock.bbq} onChange={changeURL} name="bbq" value={!queryBlock.bbq} />
          <label htmlFor="bbq"> Barbecue</label>
          <br />
          <input type="checkbox" checked={queryBlock.parking_lot} onChange={changeURL} name="parking_lot" value={!queryBlock.parking_lot} />
          <label htmlFor="parking_lot"> Cochera</label>
          <br />
          <input type="checkbox" checked={queryBlock.elevator} onChange={changeURL} name="elevator" value={!queryBlock.elevator} />
          <label htmlFor="elevator"> Ascensor</label>
          <br />
          <input type="checkbox" checked={queryBlock.security} onChange={changeURL} name="security" value={!queryBlock.security} />
          <label htmlFor="secutiry"> Seguridad</label>
          <br />
          <input type="checkbox" checked={queryBlock.garden} onChange={changeURL} name="garden" value={!queryBlock.garden} />
          <label htmlFor="garden"> Jardín</label>
        </div>
        <div className={style.btnReset}>
          <button className={style.btn} type="button" onClick={(e)=>clear(e)}>
            <FaEraser />
            {'   Borrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searched: state.searched,
  orderProp: state.orderProp,
  orderType: state.orderType,
});

const mapDispatchToProps = (dispatch) => ({
  filter: () => dispatch(getAvailableFilteredPropierties()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
