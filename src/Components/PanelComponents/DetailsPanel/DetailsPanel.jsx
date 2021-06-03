import React from 'react';
import PostDetails from './PostDetails/PostDetails';
import UserDetails from './UserDetails/UserDetails';
import BookingDetails from './BookingDetails/BookingDetails';

function DetailsPanel({ match }) {
  const { path, id } = match.params;
  function display() {
    if (path === 'post') {
      return (
        <>
          <PostDetails id={id} />
        </>
      );
    }
    if (path === 'user') {
      return (
        <>
          <UserDetails id={id} />
        </>
      );
    }
    if (path === 'booking') {
      return (
        <>
          <BookingDetails id={id} />
        </>
      );
    }
    return null;
  }
  return (
    <>
      {display()}
    </>
  );
}

export default DetailsPanel;
