import React from 'react';
import ReactDOM from 'react-dom';

import Sample from './samples/Sample';

require('../less/style.less');

ReactDOM.render(
  <div>
    <h1>react-modal-login demo</h1>
    <hr />
    <Sample />
  </div>,
  document.getElementById('app')
);