import PhotoUploader from '../../../Components/PhotoUploader/PhotoUploader';
import '../step.css';
import useCreatePost from '../hooks/useCreatePost';

const FourthStep = () => {
  const { current, steps, setCurrent } = useCreatePost();
  
  
  return (
    <div className='ctn'>
      <h1 className='title'>Agrega imágenes de tu inmueble </h1>
      <PhotoUploader />
      {current < steps.length - 1 && (
        <button id='nextBtn' className='stepsActions nextBtn' onClick={() => {
          let element = document.getElementById(current)
          element.className = 'active';
          setCurrent(current + 1);
        }}>
          Siguiente
        </button>
      )}
    </div>
  );
};

export default FourthStep;
