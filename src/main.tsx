import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { openFile } from './openFile';

openFile(`/splashtexts/${(Math.round(Math.random() * 6 + 1))}.txt`, (text) => console.log(`%c${text}`, 'color: #03fcf0'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
