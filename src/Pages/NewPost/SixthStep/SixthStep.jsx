// import useCreatePost from '../hooks/useCreatePost';
import Checkout from './Checkout';
import '../step.css';

const SixthStep = () => {
  // const { setCurrentComponent } = useCreatePost();
  return (
    <div className='ctn'>
      <h1>Listo! Revisa los detalles antes de publicar </h1>
      <div>
        <Checkout />
      </div>
    </div>
  );
};

export default SixthStep;
