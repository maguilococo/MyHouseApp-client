import useCreatePost from '../hooks/useCreatePost';
import { useSelector } from 'react-redux';
import FormMap from '../../../Components/GoogleMaps/FormMap'
import Swal from 'sweetalert2';
import '../step.css';

const ThirdStep = () => {
  const { current, steps, setCurrent } = useCreatePost();
  const { location } = useSelector((state) => state);

  function next () {
    let element = document.getElementById(current)
    element.className = 'active';
    setCurrent(current + 1);
  }
  return (
    <div className='ctn'>
      <h1 className='title'>Ubicación del inmueble</h1>
      <FormMap />
        {current < steps.length - 1 && (
          <button id='nextBtn' className='stepsActions nextBtn'
          onClick={() =>{
            (Object.values(location).length < 0 ) ?
            Swal.fire({
              icon: 'warning',
              title: `Debes confirmar la ubicación para poder avanzar`,
              showConfirmButton: false,
              timer: 1500
            }) : next()
           }}
          >
            Siguiente
          </button>
        )}
    </div>
  );
};

export default ThirdStep;
