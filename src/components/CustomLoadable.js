import Loadable from 'react-loadable';
import Loading from './Loading';

const CustomLoadable = options => {
  return Loadable(
    Object.assign(
      {
        loading: Loading,
        delay: 300,
        timeout: 15000,
      },
      options
    )
  );
};

export default CustomLoadable;
