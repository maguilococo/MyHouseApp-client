import { useContext } from 'react';
import { CreatePostContext } from '../Contexts/CreatePostContext';

function useCreatePost() {
  const createPostContex = useContext(CreatePostContext);
  return { ...createPostContex };
}

export default useCreatePost
