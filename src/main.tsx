import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import './styles.css';
import 'highlight.js/styles/github.min.css';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider context={helmetContext}>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
);