import useCreatePost from '../hooks/useCreatePost';
import FirstStep from '../FirstStep/FirstStep';
import SecondStep from '../SecondStep/SecondStep';
import ThirdStep from '../ThirdStep/ThirdStep';
import FourthStep from '../FourthStep/FourthStep';
import FifthStep from '../FifthStep/FifthStep';

const CreatePost = () => {
  const { currentComponent, handleSubmit, postDetails } = useCreatePost();
  return (
    <div>
      {currentComponent === 'FirstStep' && <FirstStep />}
      {currentComponent === 'SecondStep' && <SecondStep />}
      {currentComponent === 'ThirdStep' && <ThirdStep />}
      {currentComponent === 'FourthStep' && <FourthStep />}
      {currentComponent === 'FifthStep' && <FifthStep />}
      {currentComponent === 'done' && handleSubmit(postDetails)}
    </div>

  );
};

export default CreatePost;
