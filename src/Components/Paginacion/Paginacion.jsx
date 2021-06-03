/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAvailableFilteredPropierties, changeURL } from '../../Redux/Actions/index';
import './Paginacion.css';

function Paginacion({
  home, count, paginaActual, limit, functionNext = getAvailableFilteredPropierties,
}) {
  // console.log('renderizado Paginacion')
  const dispatch = useDispatch();
  const ultimaPagina = Math.ceil(count / limit);
  const [listaDePaginas, setListaDePaginas] = useState(range(ultimaPagina));
  const primeraPagina = 1;
  const history = useHistory();

  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);


  useEffect(() => {
    setListaDePaginas(range(ultimaPagina));// [1,2,3,4,...,100]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function paginate(numero) {
    params.set('page', numero);
    history.push(`${window.location.pathname}?${params.toString()}`);
    functionNext();
    dispatch(changeURL(window.location.href));// borrar algun dia
    window.scrollTo(0, 0);
  }

  // intentar mejorarlo
  // intentar usar use memo
  // eslint-disable-next-line consistent-return
  function updateNumeroDePaginas(numero) {
    // console.log('updateNumeroDePaginas: ', numero);
    if (numero === 1 || numero === 2) {
      return listaDePaginas.slice(0, 5);// (1) (2) 3 4 5
    }

    if (numero > 2 && numero !== ultimaPagina) {
      return listaDePaginas.slice(numero - 3, numero + 2); //  6 7 (8) 9 10
    }

    if (numero === ultimaPagina) {
      // si no es mayor que 0 devuelvo 0
      const pagina = (ultimaPagina - 4) >= 0 ? ultimaPagina - 4 : 0;
      return listaDePaginas.slice(pagina, ultimaPagina);  // 29 30 31 (32)
    }
  }

  return (
    <div className="titlePages">
      {home !== "top" &&
        <p>
          Página
          {' '}
          {paginaActual}
          {'  '}
          de
          {' '}
          {ultimaPagina}
        </p>
      }
      {ultimaPagina > 1
                && (
                  <ul className="paginacion">

                    {/* <strong style={{ color: '#b4c2cd' }}> Pages:</strong> */}
                    {paginaActual > primeraPagina
                        && (
                          <>
                            <li id="li-first">
                              <a onClick={() => paginate(primeraPagina)} className="page-link">
                                {' '}
                                <strong>Primera</strong>
                                {' '}
                              </a>
                            </li>
                            <li id="li-previous">
                              <a onClick={() => paginate(paginaActual - 1)} className="page-link">
                                {' '}
                                <strong>Anterior</strong>
                                {' '}
                              </a>
                            </li>
                          </>
                        )}

                    {updateNumeroDePaginas(paginaActual)?.map((numero) => (
                      numero === paginaActual

                        ? (
                          <li key={numero} className="number-page">
                            <strong style={{ color: '#b4c2cd' }}>{numero}</strong>
                          </li>
                        )
                        : (
                          <li key={numero} className="number-page-selected">
                            <a onClick={() => paginate(numero)} className="page-link">
                              <strong>{numero}</strong>
                            </a>
                          </li>
                        )
                    ))}

                    {paginaActual < ultimaPagina
                        && (
                          <>
                            <li id="li-next">
                              <a onClick={() => paginate(paginaActual + 1)} className="page-link">
                                <strong>
                                  Siguiente
                                  {' '}
                                </strong>
                              </a>
                            </li>
                            <li id="li-Last">
                              <a onClick={() => paginate(ultimaPagina)} className="page-link">
                                <strong>Última</strong>
                              </a>
                            </li>
                          </>
                        )}
                  </ul>
                )}
    </div>
  );
}

export default React.memo(Paginacion);

function range(ultimaPagina) {
  const listaDePaginas = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= ultimaPagina; i++) {
    listaDePaginas.push(i);
  }
  return listaDePaginas;// [1,2,3,4,...,100]
}
