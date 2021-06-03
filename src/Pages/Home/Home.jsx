import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../../Components/Cards/Cards';
import Filter from '../../Components/Filter/Filter';
import Searchbar from '../../Components/Searchbar/Searchbar';
import Order from '../../Components/Order/Order';
import style from './Home.module.css';
import Paginacion from '../../Components/Paginacion/Paginacion';
import { getAvailableFilteredPropierties } from '../../Redux/Actions/index';
import MobileFilter from '../../Components/Filter/MobileFilter';
import NotFound from '../NotFound/NotFound'

export default function Home({ mobile }) {
  const limit = 10;
  const {
    count, currentPage: page,
  } = useSelector((store) => store);
  const dispatch = useDispatch();
  return (
    <div className={style.home}>
      <div className={style.filterArea}>
        <div className={style.filterCont}>
          <Filter />
        </div>
      </div>
      <div className={style.main}>
        <div className={style.search_order}>
          <div className={style.topPag}>
            {count === 0 ? (
              <NotFound />
              ) : (
                <Paginacion
                home="top"
                count={count}
                paginaActual={page}
                limit={limit}
                functionNext={() => dispatch(getAvailableFilteredPropierties())}// pasarle el id user
              />
              )}
            </div>
          <div className={style.mobileFilter}>< MobileFilter /></div>
          <div className={style.order}><Order /></div>  
        </div>

        <div className={style.cards}>
          <Cards />
        </div>

        <div className={style.search_order}>
          {count && (
            <Paginacion
              count={count}
              paginaActual={page}
              limit={limit}
              functionNext={() => dispatch(getAvailableFilteredPropierties())}// pasarle el id user
            />
          )}
          <div className={style.hideOrder}><Order /></div>
        </div>
      </div>
    </div>
  );
}
