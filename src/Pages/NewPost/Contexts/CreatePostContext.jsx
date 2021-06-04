import { createContext, useState, useEffect } from 'react';
import FirstStep from '../FirstStep/FirstStep';
import SecondStep from '../SecondStep/SecondStep';
import ThirdStep from '../ThirdStep/ThirdStep';
import FourthStep from '../FourthStep/FourthStep';
import FifthStep from '../FifthStep/FifthStep';
import SixthStep from '../SixthStep/SixthStep';
import MercadoPago from '../../../Components/MercadoPago/MercadoPago';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { valueTypes } from '../../../Services/properties.service';

export const CreatePostContext = createContext({});

const CreatePostProvider = ({ children, ...routerProps }) => {
  const [current, setCurrent] = useState(0);
  const [infoPlan, setInfoPlan] = useState({});
  const { session, location } = useSelector((store) => store);
  const search = useLocation().search;
  // const orderId = new URLSearchParams(search).get('orderId');
  // const plan = new URLSearchParams(search).get('plan');
  // ======================================================================
  function query(url) {
    const obj = {};
    const array = url.replace('?', '').split('&');
    for (let i = 0; i < array.length; i++) {
      let arr = array[i].split('=');
      obj[arr[0]] = arr[1];
    }
    return obj;
  }
  const {
    external_reference, // va a ser el id de la orden en la db
  } = query(search);
  // ======================================================================
  const [postDetails, setPostDetails] = useState({});
  useEffect(() => {
    // console.log('useEffect sessio.id');
    // console.log('prueba___',infoPlan );
    setPostDetails({
      // orderId: external_reference,
      premium: infoPlan.title === 'Premium' ? true : false,
      post_name: '',
      prop_type: 'Casa',
      department: '',
      city: '',
      longitude: '',
      latitude: '',
      neighborhood: '',
      street_number: '',
      allowAddress: true,
      description: '',
      stratum: '',
      price: '',
      m2: '',
      rooms: '',
      bathrooms: '',
      years: '',
      pool: false,
      backyard: false,
      gym: false,
      bbq: false,
      parking_lot: false,
      garden: false,
      elevator: false,
      security: false,
      status: 'Available',
      images: [],
      idUser: session.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id, infoPlan]);
  useEffect(() => {
    const postDetailsLocalStorage = localStorage.getItem('postDetails');
    if (!postDetailsLocalStorage) {
      return;
    }
    setPostDetails(JSON.parse(postDetailsLocalStorage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnchangeImage = (imageList) => {
    setPostDetails({ ...postDetails, images: imageList });
  };
  const handleOnInputsChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setPostDetails(
      valueTypes({
        ...postDetails,
        [name]: value,
        idUser: session.id,
        orderId: external_reference,
      })
    );
    // localStorage.setItem('postDetails', JSON.stringify(postDetails));
  };

  // Actualizar dirección

  useEffect(() => {
    // console.log('location en useEffect', location);

    setPostDetails((postDetails) => ({
      ...postDetails,
      department: location.department,
      city: location.city,
      longitude: location.longitude,
      latitude: location.latitude,
      street_number: location.street_number,
      allowAddress: location.allowAddress,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const steps = [
    {
      title: 'Elige tu plan',
      content: <MercadoPago />,
    },
    {
      title: 'Características',
      content: <SecondStep />,
    },
    {
      title: 'Ubicación',
      content: <ThirdStep />,
    },
    {
      title: 'Imágenes',
      content: <FourthStep />,
    },
    {
      title: 'Adicionales',
      content: <FifthStep />,
    },
    {
      title: 'Checkout',
      content: <SixthStep />,
    },
  ];

  return (
    <CreatePostContext.Provider
      value={{
        routerProps,
        postDetails,
        setPostDetails,
        handleOnInputsChange,
        handleOnchangeImage,
        current,
        setCurrent,
        steps,
        infoPlan,
        setInfoPlan,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};

export default CreatePostProvider;
