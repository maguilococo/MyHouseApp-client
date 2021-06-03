// import useCreatePost from '../hooks/useCreatePost';
import Form from '../Form/Form';
import '../step.css';

const formInputsConfig = [
  { tag: 'text', label: 'Piscina', type: 'checkbox', name: 'pool' },
  { tag: 'text', label: 'Patio', type: 'checkbox', name: 'backyard' },
  { tag: 'text', label: 'Gimnasio', type: 'checkbox', name: 'gym' },
  { tag: 'text', label: 'Barbecue', type: 'checkbox', name: 'bbq' },
  { tag: 'text', label: 'Cochera', type: 'checkbox', name: 'parking_lot' },
  { tag: 'text', label: 'Jardín', type: 'checkbox', name: 'garden' },
  { tag: 'text', label: 'Ascensor', type: 'checkbox', name: 'elevator' },
  { tag: 'text', label: 'Seguridad', type: 'checkbox', name: 'security' },
];

const FourthStep = () => {
  // const { setCurrentComponent } = useCreatePost();

  return (
    <div className='ctn'>
      <h1 className='title'>Marca las facilidades que disponga tu inmueble </h1>
      <Form config={formInputsConfig} />
    </div>
  );
};

export default FourthStep;
