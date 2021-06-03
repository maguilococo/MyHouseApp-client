import React from 'react';
import useCreatePost from '../hooks/useCreatePost';
import { useForm, Controller } from 'react-hook-form';
import NextButton from './NextButton';
import style from './Form.module.css';

const InputComponents = {
  textarea: (field, ...args) => <textarea {...field}></textarea>,
  select: (field, ...args) => {
    const [componetConfig] = args;
    const { type } = componetConfig;
    return (
      <select {...field}>
        {type.map((optionItem, key) => (
          <option key={key}>{optionItem}</option>
        ))}
      </select>
    );
  },
  text: (field, ...args) => {
    const [componetConfig] = args;
    const { type } = componetConfig;

    if (type === 'number') {
      return <input type={type} min='0' {...field} />;
    }
    return <input type={type} {...field} />;
  },
};

const Form = ({ config }) => {
  const { setPostDetails, postDetails, current, setCurrent, steps } =
    useCreatePost();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setPostDetails({ ...postDetails, ...data });
    // console.log('current before next ',current)
    let element = document.getElementById(current)
    element.className = 'active';
    setCurrent(current + 1);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      {config.map((componentConfig) => (
        <div className={style.col}>
          <div className={style.field}>
            <label htmlFor={componentConfig.name}>{componentConfig.label}</label>
            <Controller
              name={componentConfig.name}
              control={control}
              defaultValue={postDetails[componentConfig.name]}
              rules={{ required: componentConfig.type !== 'checkbox' }}
              render={({ field }) => {
                return InputComponents[componentConfig.tag](
                  field,
                  componentConfig
                );
              }}
            />
            {errors[componentConfig.name] && <span className={style.pdanger}>El campo es requerido</span>}
          </div>
        </div>
      ))}
      <NextButton />
    </form>
  );
};

export default Form;
