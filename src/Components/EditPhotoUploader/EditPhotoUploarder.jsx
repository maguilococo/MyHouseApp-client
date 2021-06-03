import styles from '../PhotoUploader/PhotoUploader.module.css';
import Swal from 'sweetalert2';
import { filesQuantityChecker, fileSizeChecker } from '../../utils';
import PhotoUpLoaderItem from '../PhotoUpLoaderItem/PhotoUpLoaderItem';

const EditPhotoUploader = ({
  imagesContainer,
  onChangeImage,
  onClickDelete,
  limit,
}) => {
  let photos;
  if (typeof imagesContainer[0] === 'string') {
    photos = imagesContainer;
  } else {
    const [imagesObj] = imagesContainer;
    photos = imagesObj.photo;
  }

  const handlerOnChange = async (event) => {
    const { target } = event;
    let { files } = target;

    const actual = photos.length;
    if (!filesQuantityChecker(files, limit, actual)) {
      target.value = '';
      return Swal.fire({
        icon: 'warning',
        title: `Por revisa la cantidad de images a subir! recuerda que el limite es ${limit}`,
        showConfirmButton: true,
      });
    }

    if (fileSizeChecker(files)) {
      target.value = '';
      return Swal.fire({
        icon: 'warning',
        title: 'Por favor carga images con una tamano de hasta 2mb!',
        showConfirmButton: true,
      });
    }

    const newFile = await Promise.all(
      [...files].map((image) => getBase64(image))
    );
    const newImages = [...photos, ...newFile];
    onChangeImage(newImages);
    target.value = '';
    console.log('renny');
  };

  return (
    <div className='ctn'>
      <h1>Agrega imágenes de tu inmueble </h1>

      <div className={styles.container_field_image}>
        <label style={{ position: 'absolute' }}>
          {`Arrastre y suelte sus imagenes o haga click aqui para seleccionar`}
        </label>
        <input
          className={styles.field_image}
          type='file'
          multiple
          name='images'
          accept='image/*'
          onChange={handlerOnChange}
        />
      </div>
      <PhotoUpLoaderItem items={photos} onDelete={onClickDelete} />
    </div>
  );
};

export default EditPhotoUploader;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
