import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import style from '../PanelComponents/ButtonsBar/ButtonsBar.module.css';
import FilterPosts from '../PanelComponents/ButtonsBar/Filter/FilterPosts/FilterPosts';

function MobileFilter () {

  function openFilters() {
    console.log('openFilter MobileFilter')
    document.getElementById('filtersSide').className = 'openFilter';
  }

  return(
    <div>
      <button type="button" className={style.btnBar} onClick={() =>openFilters()}>
        <FontAwesomeIcon icon={faSlidersH} />
        {' Filtrar'}
      </button>
      <FilterPosts />
    </div>  
  )
}




export default MobileFilter;