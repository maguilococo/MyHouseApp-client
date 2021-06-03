// import useCreatePost from '../hooks/useCreatePost';
import Form from '../Form/Form';
import '../step.css';

const formInputsConfig = [
  { tag: 'textarea', label: 'Título', name: 'post_name' },
  { tag: 'textarea', label: 'Descripción', name: 'description' },
  {
    tag: 'select',
    label: 'Tipo de inmueble',
    type: ['Casa', 'Apartamento'],
    name: 'prop_type',
  },
  { tag: 'text', label: 'Precio', type: 'number', min: 0, name: 'price' },
  {
    tag: 'text',
    label: 'Metros cuadrados',
    type: 'number',
    min: 0,
    name: 'm2',
  },
  { tag: 'text', label: 'Baños', type: 'number', min: 0, name: 'bathrooms' },
  { tag: 'text', label: 'Habitaciones', type: 'number', min: 0, name: 'rooms' },
  { tag: 'text', label: 'Antigüedad', type: 'number', min: 0, name: 'years' },
];

const SecondStep = () => {
 

  return (
    <div className='ctn'>
      <h1 className='title'>Cuéntanos sobre tu propiedad</h1>
      <Form config={formInputsConfig} />
    </div>
  );
};

export default SecondStep;
