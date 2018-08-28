import React from 'react';
import ReactDOM from 'react-dom';
import {Pie} from './index';

document.addEventListener('DOMContentLoaded',function() {
  const container = document.getElementById('app');
  if(container) {
    ReactDOM.render(<Pie/>,container);
  }else {
    console.warn('cannot find the container');
  }
});
