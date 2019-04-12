/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable template-curly-spacing */
/* eslint-disable no-multi-spaces */
import $ from 'jquery';
// eslint-disable-next-line import/no-unresolved
import './style.scss';

let counter = 0;

// this function takes care of incrementing the second counter and displaying it on the webpage
function Sec_Counter() {
  // eslint-disable-next-line no-plusplus
  // eslint-disable-next-line template-curly-spacing
  // eslint-disable-next-line no-plusplus
  setInterval(() => { $('#main').html(`You have been on this page for ${ counter++  } seconds.`); }, 1000);
}

Sec_Counter();
