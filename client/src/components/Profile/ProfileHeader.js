import React from 'react';

import BG from '../../assets/images/bg.png';
import PP from '../../assets/images/PP.jpg';

const ProfileHeader = ({ username }) => (
  <header
    style={{
      backgroundImage: `url(${BG})`,
      height: 222,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        background: 'linear-gradient(to top, #2b3237 10px, transparent)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 1,
      }}
    />
    <img
      src={PP}
      alt="profile_picture"
      style={{
        zIndex: 5,
        maxWidth: 80,
        maxHeight: 80,
        borderRadius: '50%',
      }}
    />
    <h2 style={{ color: '#fff', zIndex: 5 }}> {username} </h2>
  </header>
);

export { ProfileHeader };
