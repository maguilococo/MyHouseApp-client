import React from 'react';
import EditUser from '../Edit/EditUser/EditUser';
import EditPosts from '../Edit/EditPost/EditPost';
import EditBooking from '../Edit/EditBooking/EditBooking';

function CreateForm({ match }) {
  const { path } = match.params;
  function display() {
    if (path === 'user') return <EditUser action="create" />;
    if (path === 'post') return <EditPosts action="create" path={path} />;
    if (path === 'booking') return <EditBooking action="create" path={path} />;
    return null;
  }
  return (
    <div>
      {display()}
    </div>
  );
}

export default CreateForm;
