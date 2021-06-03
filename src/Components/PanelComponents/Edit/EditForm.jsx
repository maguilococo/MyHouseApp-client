import React from 'react';
import EditUser from './EditUser/EditUser';
import EditPosts from './EditPost/EditPost';
import EditBooking from './EditBooking/EditBooking';

function EditForm({ match }) {
  const { path, id } = match.params;
  console.log('ID', id)
  function display() {
    if (path === 'user') return <EditUser path={path} action="edit" id={id} />;
    if (path === 'post') return <EditPosts path={path} action="edit" id={id} />;
    if (path === 'booking') return <EditBooking path={path} action="edit" id={id} />;
    return null;
  }
  return (
    <div>
      {display()}
    </div>
  );
}

export default EditForm;
