import useCreatePost from '../hooks/useCreatePost';
import '../step.css';

const NextButton = () => {
  const { current, steps } = useCreatePost();

  return current < steps.length - 1 && 
  <button type='submit' id='nextBtn' className='stepsActions nextBtn' >
      Siguiente
  </button>;
};

export default NextButton;
