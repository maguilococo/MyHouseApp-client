import React, { useEffect, useState } from 'react';
import useCreatePost from '../../Pages/NewPost/hooks/useCreatePost';
import styles from './PhotoUploader.module.css';
import { filesQuantityChecker, fileSizeChecker } from '../../utils';
import PhotoUpLoaderItem from '../PhotoUpLoaderItem/PhotoUpLoaderItem';
import Swal from 'sweetalert2';
// Si tenemos tiempo, ver de no agregar imágenes repetidas

const Uploader = () => {
  const {
    handleOnchangeImage,
    postDetails: { images },
    infoPlan: { title },
  } = useCreatePost();

  const [filesList, setFilesList] = useState(images);
  const imagesLimit = title === 'Basic' ? 10 : 20;

  const handlerOnChange = async (event) => {
    const { target } = event;
    let { files } = target;

    const limit = imagesLimit;
    const actual = images.length;

    if (!filesQuantityChecker(files, limit, actual)) {
      target.value = '';
      return Swal.fire({
        icon: 'warning',
        title: `Por revisa la cantidad de images a subir! recuerda que el limte es ${imagesLimit}`,
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
    const newFilesList = [...filesList, ...newFile];
    setFilesList(newFilesList);
    target.value = '';
  };

  const onClickDelete = (url) => {
    const newFilesList = filesList.filter((image) => image !== url);
    setFilesList(newFilesList);
  };
  useEffect(() => {
    handleOnchangeImage(filesList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesList]);
  return (
    <div className={styles.ctn}>
      <div className={styles.container_field_image}>
        <label>
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
      <PhotoUpLoaderItem items={filesList} onDelete={onClickDelete} />
    </div>
  );
};

export default Uploader;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
