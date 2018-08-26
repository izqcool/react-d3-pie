import React from 'react';
import ReactDOM from 'react-dom';
import {Pie} from './index';

const root = document.querySelector('#app');
console.log(root);

// document.addEventListener('DOMContentLoaded',function() {
//   const container = document.getElementById('app');
//   if(container) {
//     ReactDOM.render(vDomTree,container);
//   }else {
//     console.warn('cannot find the container');
//   }
// });

document.addEventListener('DOMContentLoaded',function() {
  const container = document.getElementById('app');
  if(container) {
    ReactDom.render(<Pie/>,container);
  }else {
    console.warn('cannot find the container');
  }
});
// setTimeout(()=>{
//   const root = document.querySelector('#app');
//   ReactDOM.render(<Pie/>,root);
// },1000);