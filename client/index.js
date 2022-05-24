import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styles from './stylesheets/application.scss';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
