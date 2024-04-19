import React from 'react';
import { hydrate } from 'react-dom';
import createSsr from '@issr/core';
import { App } from './App';

const SSR_DATA = window.SSR_DATA || {}; // Ensure SSR_DATA exists

if (Object.keys(SSR_DATA).length > 0) {
  const SSR = createSsr(SSR_DATA);

  hydrate(
    <SSR>
      <App />
    </SSR>,
    document.getElementById('root')
  );
}
