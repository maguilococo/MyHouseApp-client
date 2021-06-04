/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import {
  getPostService,
  editPostService,
  addPostService,
  valueTypes,
} from '../../../../Services/properties.service';
import { addLocation } from '../../../../Redux/Actions/index';
import Loading from '../../../Auth0/Loading/loading';
import EditButtonBar from '../../ButtonsBar/EditButtonBar/EditButtonBar';
import FormMap from '../../../GoogleMaps/FormMap';
import style from './EditPost.module.css';
import EditPhotoUploader from '../../../EditPhotoUploader/EditPhotoUploarder';
import Swal from 'sweetalert2';

function EditPosts({ id, action, session, location, addLocation }) {
  const [input, setInput] = useState({});
  const [postDetail, setPostDetail] = useState({});

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = React.useState('');

  const isAdmin = session.type === 'Admin' || session.type === 'SuperAdmin';

  useEffect(() => {
    async function fetchPost(id) {
      const postInfo = await getPostService(id);
      setPostDetail(postInfo.data);
      setLoading(false);
    }
    fetchPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    addLocation(postDetail);
    setInput({
      premium: action === 'edit' ? postDetail.premium : false,
      post_name: action === 'edit' ? postDetail.post_name : '',
      department: action === 'edit' ? location.department : '',
      city: action === 'edit' ? location.city : '',
      street_number: action === 'edit' ? location.street_number : '',
      longitude: action === 'edit' ? location.longitude : '',
      latitude: action === 'edit' ? location.latitude : '',
      neighborhood: action === 'edit' ? location.neighborhood : '',
      allowAddress: action === 'edit' ? location.allowAddress : '',
      stratum: action === 'edit' ? postDetail.stratus : '',
      description: action === 'edit' ? postDetail.description : '',
      price: action === 'edit' ? postDetail.price : 1,
      prop_type: action === 'edit' ? postDetail.prop_type : '',
      m2: action === 'edit' ? postDetail.m2 : 1,
      bathrooms: action === 'edit' ? postDetail.bathrooms : 1,
      rooms: action === 'edit' ? postDetail.rooms : 1,
      years: action === 'edit' ? postDetail.years : 1,
      pool: action === 'edit' ? postDetail.pool : false,
      backyard: action === 'edit' ? postDetail.backyard : false,
      gym: action === 'edit' ? postDetail.gym : false,
      parking_lot: action === 'edit' ? postDetail.parking_lot : false,
      garden: action === 'edit' ? postDetail.garden : false,
      elevator: action === 'edit' ? postDetail.elevator : false,
      security: action === 'edit' ? postDetail.security : false,
      bbq: action === 'edit' ? postDetail.bbq : false,
      images: action === 'edit' ? postDetail.images : [],
      status: action === 'edit' ? postDetail.status : 'Available',
      idUser: session.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDetail.id]);

  function validate(input) {
    const errors = {};
    if (!input.post_name) {
      errors.post_name = 'El título es requerido';
    } else if (!input.premium && isAdmin) {
      errors.premium = 'El plan contratado es requerido';
    } else if (!input.status && isAdmin) {
      errors.status = 'El status es requerido';
      //} else if (!input.department) {
      //errors.depatment = 'El deparmento es requerido';
      // } else if (!input.city) {
      //   errors.city = 'La ciudad es requerida';
      // } else if (!input.street_number) {
      //   errors.street_number = 'La dirección es requerida';
      // } else if (!input.neighborhood) {
      //   errors.neighborhood = 'El barrio es requerido';
    } else if (!input.price) {
      errors.price = 'El precio es requerido';
    } else if (!input.prop_type) {
      errors.prop_type = 'El tipo de inmueble es requerido';
    } else if (!input.m2) {
      errors.m2 = 'Los metros cuadrados son requeridos';
    } else if (!input.rooms) {
      errors.rooms = 'Las habitaciones son requeridas';
    } else if (!input.bathrooms) {
      errors.bathrooms = 'Los baños son requeridos';
    } else if (input.stratum > 6) {
      errors.stratum = '6 es el estrato máximo';
    }
    return errors;
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
    setInput(
      valueTypes({
        ...input,
        [name]: value,
      })
    );
  }

  function onClickDelete(imageToDelete) {
    let photos;
    let imagesContainer = input.images;
    if (typeof imagesContainer[0] === 'string') {
      photos = imagesContainer;
    } else {
      const [imagesObj] = imagesContainer;
      photos = imagesObj.photo;
    }
    const newImagesSet = photos.filter((image) => image !== imageToDelete);
    const newInput = { ...input, images: newImagesSet };
    setInput(newInput);
  }

  function onChangeImage(newIamges) {
    //verificar el numero de fotos
    const newInput = { ...input, images: newIamges };
    setInput(newInput);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.images.length === 0) return Swal.fire({
      icon: 'warning',
      title: 'Debes agregar al menos una imagen',
      showConfirmButton: false,
      timer: 1500,
    });
    if (Object.entries(errors).length > 0) {
      return Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Revisar campos requeridos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (action === 'edit') {
          return editPostService(id, input)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: `Publicación ${input.post_name} editado correctamente `,
                showConfirmButton: true,
              });
            })
            .catch((e) => console.log(e));
        // }
      } else if (action === 'create') {
        if (errors === '') {
          return Swal.fire({
            icon: 'warning',
            title: 'Revisar campos requeridos',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          return addPostService(input)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: `Publicación ${input.post_name} creada correctamente `,
                showConfirmButton: true,
              });
            })
            .catch((e) => console.log(e));
        }
      }
    }
  }

  valueTypes(input);

/*   function resetForm(e) {
    e.preventDefault();
    setInput({
      premium: '',
      post_name: '',
      description: '',
      stratum: '',
      price: '',
      m2: '',
      rooms: '',
      years: '',
      pool: false,
      backyard: false,
      bbq: false,
      gym: false,
      parking_lot: false,
      garden: false,
      elevator: false,
      security: false,
    });
    document.getElementById('form').reset();
  } */

  const [display, setDisplay] = useState(false);
  return (
    <div className={style.ctn}>
      {!loading && (
        <>
          <EditButtonBar
            rol={session.type ? session.type : 'user'}
            handleSubmit={handleSubmit}
            element='post'
            id={id}
          />
          <form onSubmit={handleSubmit} className={style.form} id='form'>
            <div className={style.title}>
              <label htmlFor='post_name'>Título</label>
              <div>
                <textarea
                type='text'
                value={input.post_name}
                name='post_name'
                onChange={handleChange}
                className={style.textarea}
                />
                {errors.post_name && (
                  <p className={style.pdanger}>{errors.post_name}</p>
                )}
              </div>
            </div>
            {/* {isAdmin && (
              <>
                <div className={style.field}>
                  <label htmlFor='premium'> Plan contratado</label>
                  <select
                    className={style.selectFilter}
                    name='premium'
                    value={input.premium}
                    onChange={handleChange}
                  >
                    <option key='1' value={false}>
                      Basic
                    </option>
                    <option key='2' value={true}>
                      Premium
                    </option>
                  </select>
                </div>
                {errors.premium && (
                  <p className={style.pdanger}>{errors.premium}</p>
                )}
              </>
            )} */}
            {isAdmin && (
              <>
                <div className={style.field}>
                  <label htmlFor='status'> Estado de la publicación</label>
                  <select
                    className={style.selectFilter}
                    name='status'
                    value={input.status}
                    onChange={handleChange}
                  >
                    {['Available', 'Not-Available', 'Expired'].map(
                      (type, i) => (
                        <option key={i} value={type}>
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </div>
                {errors.status && (
                  <p className={style.pdanger}>{errors.status}</p>
                )}
              </>
            )}
            <div className={style.images}>
              <EditPhotoUploader
                imagesContainer={input.images}
                onClickDelete={onClickDelete}
                onChangeImage={onChangeImage}
                limit={postDetail.premium ? 20 : 10}
              />
            </div>

            <div className={style.description}>
              <div className={style.fieldPrice}>
                <label htmlFor='price'>Precio</label>
                <input
                  type='number'
                  value={input.price}
                  name='price'
                  onChange={handleChange}
                />
              </div>
            {errors.price && <p className={style.pdanger}>{errors.price}</p>}

              <div className={style.field}>
              <label htmlFor='prop_type'>Tipo de propiedad</label>
              <select
              className={style.selectFilter}
              name='prop_type'
              value={input.prop_type}
              onChange={handleChange}
              >
              <option value='' disabled hidden>
              Elija uno
              </option>
              {['Casa', 'Apartamento'].map((type, i) => (
                <option key={i} value={type}>
                {type}
                </option>
              ))}
              </select>
              </div>
              {errors.prop_type && (
                <p className={style.pdanger}>{errors.prop_type}</p>
              )}
              <div className={style.field}>
              <label htmlFor='m2'>Metros cuadrados</label>
              <input
              type='number'
              value={input.m2}
              name='m2'
              min='0'
              onChange={handleChange}
              />
              </div>
              {errors.m2 && <p className={style.pdanger}>{errors.m2}</p>}
              <div className={style.field}>
              <label htmlFor='rooms'>Habitaciones</label>
              <input
              type='number'
              value={input.rooms}
              name='rooms'
              min='0'
              onChange={handleChange}
              />
              </div>
              {errors.rooms && <p className={style.pdanger}>{errors.rooms}</p>}
              <div className={style.field}>
              <label htmlFor='bathrooms'>Baños</label>
              <input
              type='number'
              value={input.bathrooms}
              name='bathrooms'
              min='0'
              onChange={handleChange}
              />
              </div>
              {errors.bathrooms && (
                <p className={style.pdanger}>{errors.bathrooms}</p>
              )}
              <div className={style.field}>
              <label htmlFor='stratum'>Estrato</label>
              <input
              type='number'
              value={input.stratum}
              name='stratum'
              min='0'
              onChange={handleChange}
              />
              </div>
              {errors.stratum && (
                <p className={style.pdanger}>{errors.stratum}</p>
              )}
              <div className={style.field}>
              <label htmlFor='years'>Años</label>
              <input
              type='number'
              value={input.years}
              name='years'
              min='0'
              onChange={handleChange}
              />
              </div>
              <div className={style.fieldDescription}>
              <label htmlFor='description'>Descripción</label>
              <textarea
              type='text'
              value={input.description}
              name='description'
              onChange={handleChange}
              />
              </div>
            </div>


            <div className={style.field2} onClick={() => setDisplay(!display)}>
              <div className={style.field3}>
                <p className={style.tit_facilities}>Otras comodidades</p>
              </div>
                <div className={display ? style.facilities : style.noFacilities}>
                <section>
                <input
                type='checkbox'
                onChange={handleChange}
                name='pool'
                value={!input.pool}
                />
                <label htmlFor='pool'> Piscina</label>
                </section>
                <section>
                <input
                type='checkbox'
                onChange={handleChange}
                name='backyard'
                value={!input.backyard}
                />
                <label htmlFor='backyard'> Patio</label>
                </section>
                <section>
                <input
                type='checkbox'
                onChange={handleChange}
                name='gym'
                value={!input.gym}
                />
                <label htmlFor='gym'> Gimnasio</label>
                </section>
                <section>
                <input
                type='checkbox'
                onChange={handleChange}
                name='bbq'
                value={!input.bbq}
                />
                <label htmlFor='bbq'> Barbecue</label>
                </section>
                <section>
                <input
                type='checkbox'
                onChange={handleChange}
                name='parking_lot'
                value={!input.parking_lot}
                />
                <label htmlFor='parking_lot'> Cochera</label>
                </section>
                <section>
                <input
                type='checkbox'
                onChange={handleChange}
                name='elevator'
                value={!input.elevator}
                />
                <label htmlFor='elevator'> Ascensor</label>
                </section>
                <section>
                <input
                type='checkbox'
                onChange={handleChange}
                name='security'
                value={!input.security}
                />
                <label htmlFor='secutiry'> Seguridad</label>
                </section>
                <section>
                <input
                type='checkbox'
                onChange={handleChange}
                name='garden'
                value={!input.garden}
                />
                <label htmlFor='garden'> Jardín</label>
                </section>
                </div>
            </div>
            {/* <div className={style.btnReset}>
              <button
                className={style.btn}
                type='button'
                onClick={(e) => resetForm(e)}
              >
                <FontAwesomeIcon icon={faEraser} />
                {'  Borrar'}
              </button>
            </div> */}
            <div className={style.divMap}>
              <FormMap edit={"edit"} />
            </div>
          </form>
        </>
      )}
      {loading && <Loading />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
  location: state.location,
});

const mapDispatchToProps = (dispatch) => ({
  addLocation: (address) => dispatch(addLocation(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPosts);
