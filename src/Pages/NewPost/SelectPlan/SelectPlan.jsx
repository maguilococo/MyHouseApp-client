import useCreatePost from '../hooks/useCreatePost';
const SelectPlan = () => {
  const { setCurrentComponent } = useCreatePost();
  return (
    <div>
      <h1>Please select your plan</h1>

      <button
        onClick={() => {
          setCurrentComponent('SecondStep');
        }}
      >
        Continue...
      </button>
    </div>
  );
};

export default SelectPlan;
