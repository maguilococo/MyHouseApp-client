import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { searchedPost } from '../../Redux/Actions';
import style from './Searchbar.module.css';

function Searchbar({ find }) {
  const [search, setSearch] = useState('');
  /* const querystring = window.location.search;
  const params = new URLSearchParams(querystring); */

  function handleChange(e) {
    setSearch(e.target.value);
    find(e.target.value);
  }

  return (
    <div className={style.searchBox}>
      <input
        className={style.searchText}
        type="text"
        autoComplete="off"
        value={search}
        onChange={(e) => handleChange(e)}
        placeholder="Search any post here..."
      />
      <div className={style.searchIcon}>
        <FaSearch />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  find: (postName) => dispatch(searchedPost(postName)),
});

export default connect(null, mapDispatchToProps)(Searchbar);

// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { FaSearch } from 'react-icons/fa';
// import { useHistory } from 'react-router-dom';
// import { orderBy } from '../../Redux/Actions';
// import style from './Order.module.css';

// function Orders({ sorting }) {
//   const history = useHistory();
//   const querystring = window.location.search;
//   const params = new URLSearchParams(querystring);

//   const [order, setOrder] = useState({
//     prop: '',
//     type: '',
//   });

//   useEffect(() => {
//     if (!params.get('orden')) {
//       params.delete('orden');
//     }
//     if (!params.get('atributo')) {
//       params.delete('atributo');
//     }
//   });

//   function handleOrder(e) {
//     console.log('e.target.value: ', e.target.value);
//     const [prop, type] = e.target.value.split('_');
//     setOrder((prev) => {
//       console.log('prev: ', prev);

//       const newOrder = {
//         ...prev,
//         prop,
//         type,
//       };
//       console.log('newOrder: ', newOrder);
//       return newOrder;
//     });
//     params.set('orden', type);
//     params.set('atributo', prop);
//     history.push(`/home?${params.toString()}`);
//     sorting(order);
//   }

//   return (
//     <div className={style.selectNav}>
//       <div className={style.selectMenu}>
//         <select name="filters" value="" onChange={(e) => handleOrder(e)}>
//           <option value="" disabled hidden>Sort</option>
//           <optgroup label="Price">
//             <option name="price_ASC" value="price_ASC">- to +</option>
//             <option name="price_DESC" value="price_DESC">+ to -</option>
//           </optgroup>
//           <optgroup label="Rooms">
//             <option name="rooms_ASC" value="rooms_ASC">- to +</option>
//             <option name="rooms_DESC" value="rooms_DESC">+ to -</option>
//           </optgroup>
//         </select>
//       </div>
//     </div>
//   );
// }

// function mapStateToProps(state) {
//   return {
//     orderProp: state.orderProp,
//     orderType: state.orderType,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     sorting: (order) => dispatch(orderBy(order)),
//   };
// }

// export default connect(null, mapDispatchToProps)(Orders);
