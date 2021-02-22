import React from 'react';

const Loading = ({ error, retry, timedOut, pastDelay }) => {
  if (error) {
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (pastDelay) {
    return <div>Please wait...</div>;
  }
  return null;
};

export default Loading;
