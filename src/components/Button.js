import React from 'react';

const Button = ({ children, color = 'red', ...props }) => {
  return <button style={{ color }} {...props}>{children}</button>;
};

export default Button;
