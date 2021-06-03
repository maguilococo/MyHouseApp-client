import styles from './PhotoUploaderItem.module.css';
const PhotoUpLoaderItem = ({ items, onDelete }) => {
  return (
    <div className={styles.itemsContainer}>
      {items.map((image, key) => {
        return (
          <div className={styles.imageItem}>
            <img
              key={key}
              onClick={() => onDelete(image)}
              src={image}
              alt='preety house'
            />
          </div>
        );
      })}
    </div>
  );
};

export default PhotoUpLoaderItem;
