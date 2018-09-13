import React from 'react';
import ReactDOM from 'react-dom';
import {Pie} from './index';

const testData = [
  {value: 200, name: 'test1'},
  {value: 50, name: 'test2'},
  {value: 70, name: 'test3'},
  {value: 40, name: 'test4'},
];

document.addEventListener('DOMContentLoaded',function() {
  const container = document.getElementById('app');
  if(container) {
    ReactDOM.render(<Pie
        width={500}
        height={400}
        data={testData}
        innerRadius={0.4}
        outerRadius={0.8}
    />,container);
  }else {
    console.warn('cannot find the container');
  }
});
