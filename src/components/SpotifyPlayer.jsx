import SpotifyWebPlayer from 'react-spotify-web-playback';

// eslint-disable-next-line react/prop-types
const SpotifyPlayerComponent = ({ token, uris }) => {
  const playerStyles = {
    bgColor: '#282c34',
    color: '#ffffff',
    loaderColor: '#ffffff',
    sliderColor: '#1cb954',
    savedColor: '#ffffff',
    trackNameColor: '#ffffff',
    trackArtistColor: '#888888',
    trackDurationColor: '#888888',
    sliderHandleColor: '#1cb954',
  };

  return (
    <div className='player'>
      <SpotifyWebPlayer
        styles={playerStyles}
        play={true}
        syncExternalDevice
        showSaveIcon
        token={token}
        uris={uris}
      />
    </div>
  );
};

export default SpotifyPlayerComponent;

