import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import React, { Suspense, lazy } from 'react';
const App = lazy(() => import('./App'));

ReactDOM.render(
  <Suspense fallback={<h1 className='load'>loading...</h1>}>
      <App />
    </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
