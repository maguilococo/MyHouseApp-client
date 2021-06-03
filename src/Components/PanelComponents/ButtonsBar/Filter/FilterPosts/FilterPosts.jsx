import React, { useEffect, useState } from 'react';
import {  FaEraser, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import style from '../../../../Filter/Filter.module.css';
import './FilterPosts.css';

function FilterPosts({ panel }) {
  const history = useHistory();
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const initialState = {
    post_name: '',
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
    status: '',
  };
  
  const [queryBlock, setQueryBlock] = useState(initialState);
  
  const [display, setDisplay] = useState(false);

  function handlerQueryBlock(event) {
    setQueryBlock({
      ...queryBlock,
      [event.target.name]: event.target.value,
    });

  }

  function sendForm(e) {
    e.preventDefault();
    const keysQueryBlock = Object.keys(queryBlock);

    for (let i = 0; i < keysQueryBlock.length; i++) {
      const key = keysQueryBlock[i];

      if (queryBlock[keysQueryBlock[i]]) {
        params.set(key, queryBlock[key]);
        updatePath(params);
      } else {
        params.delete(key);
        updatePath(params);
      }
    }

  }
  useEffect(() => {
    for (var key of params.keys()) {
      queryBlock[key] = params.get(key);
    }
    setQueryBlock({ ...queryBlock });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updatePath(params) {
    history.push(`${window.location.pathname}?${params.toString()}`);
  }

/* 
  function clear() {
    history.push('/home');
    setQueryBlock(initialState);
    document.getElementById('formm').reset();
  } */

  var rangeSlider = document.getElementById("rsRangeLinem");
  var rangeBullet = document.getElementById("rsBulletm");
  
  const showSliderValue = () => {
    rangeBullet.innerHTML = rangeSlider.value;
    let bulletPosition = (rangeSlider.value /rangeSlider.max);
    rangeBullet.style.left = bulletPosition * 90 + '%';
  } 

  function closeFilters() {
    document.getElementById('filtersSide').className = 'closeFilter';
  }

  return (
    <div id='ctn' className={style.ctn}>
      <div id="filtersSide" className='normal'>
        <div id='area' className={style.filter}>
          <form id="formm" className={style.form}>
            <div className="ctnBack">
              <button type="button" className="back" onClick={closeFilters}>
                    <FaTimes/>
              </button>
            </div>

            {/* Status */}
            {panel && <div className={style.field}>
              <select className={style.selectFilter} name="status" value={queryBlock.status} onChange={handlerQueryBlock}>
                {['Available', 'Not-Available', 'Expired'].map((type, i) => (<option key={i} value={type}>{type}</option>))}
              </select>
            </div>}

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
                  onChange={handlerQueryBlock}
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
                  onChange={handlerQueryBlock}
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
                    onChange={handlerQueryBlock}
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
                    onChange={handlerQueryBlock}
                  />
                  &nbsp;hasta&nbsp;
                  <input
                    className={style.inputMinMax}
                    type="text"
                    name="priceMax"
                    placeholder="máx"
                    value={queryBlock.priceMax}
                    onChange={handlerQueryBlock}
                  />
                </div>
              </div>

              {/* Rooms  */}
              <div className={style.field}>
                <label>
                  Habitaciones:&nbsp;
                </label>
                <div className={style.buttons}>
                  {['+1','+2','+3','+4','+5','+6'].map(
                    (el, index) => 
                    <button class={ el === queryBlock.stratum ? `${style.btnFilter} ${style.btnFilterActive}` : style.btnFilter} key={index} name="rooms" onClick={(e) =>{e.preventDefault(); handlerQueryBlock(e);}} value={el}>{el}</button>
                  )}
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
                      <button class={ el === queryBlock.stratum ? `${style.btnFilter} ${style.btnFilterActive}` : style.btnFilter} key={index} name="bathrooms" onClick={(e) =>{e.preventDefault(); handlerQueryBlock(e);}} value={el}>{el}</button>
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
                <span id="rsBulletm" class={style.rsLabel}>0 m²</span>
                <input id="rsRangeLinem" class={style.rsRange} type="range" name="areaMin" defaultValue="0" /* value={queryBlock.areaMin} */
                  onChange={(e) => {showSliderValue(); handlerQueryBlock(e)}} min="0" max="1000" />
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
                      <button class={ el === queryBlock.stratum ? `${style.btnFilter} ${style.btnFilterActive}` : style.btnFilter} key={index} name="stratum" onClick={(e) =>{e.preventDefault(); handlerQueryBlock(e);}} value={el}>{el}</button>
                  )}
                </div>
              </div>

              {/* Type of property */}
              <div className={style.field}>
                <select className={style.selectFilter} name="prop_type" value={queryBlock.prop_type} onChange={handlerQueryBlock}>
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
                    onChange={handlerQueryBlock}
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
                <input type="checkbox" onChange={handlerQueryBlock} name="pool" value={!queryBlock.pool} />
                <label htmlFor="pool"> Piscina</label>
                <br />
                <input type="checkbox" onChange={handlerQueryBlock} name="backyard" value={!queryBlock.backyard} />
                <label htmlFor="backyard"> Patio</label>
                <br />
                <input type="checkbox" onChange={handlerQueryBlock} name="gym" value={!queryBlock.gym} />
                <label htmlFor="gym"> Gimnasio</label>
                <br />
                <input type="checkbox" onChange={handlerQueryBlock} name="bbq" value={!queryBlock.bbq} />
                <label htmlFor="bbq"> Barbecue</label>
                <br />
                <input type="checkbox" onChange={handlerQueryBlock} name="parking_lot" value={!queryBlock.parking_lot} />
                <label htmlFor="parking_lot"> Cochera</label>
                <br />
                <input type="checkbox" onChange={handlerQueryBlock} name="elevator" value={!queryBlock.elevator} />
                <label htmlFor="elevator"> Ascensor</label>
                <br />
                <input type="checkbox" onChange={handlerQueryBlock} name="security" value={!queryBlock.security} />
                <label htmlFor="secutiry"> Seguridad</label>
                <br />
                <input type="checkbox" onChange={handlerQueryBlock} name="garden" value={!queryBlock.garden} />
                <label htmlFor="garden"> Jardín</label>
              </div>
            <div className={`${style.btnReset} buttons`}>
              {/* <button className={style.btn} type="button" onClick={(e)=>clear(e)}>
                <FaEraser />
                {'  Borrar'}
              </button> */}
              <button type="submit" className={style.btn} onClick={sendForm}> Aplicar filtros </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FilterPosts);
