import React from 'react';
import './Spinner.less';

export const Spinner = (): JSX.Element => {
  return (
    <div className='spinner_border' role="status">
      <span className='visually_hidden'>Loading...</span>
    </div>
  );
};
