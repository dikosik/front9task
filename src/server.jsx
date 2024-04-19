// Импортируем express и другие необходимые модули
import express from 'express';
import React from 'react';
import { serverRender } from '@issr/core';
import serialize from 'serialize-javascript';
import { App } from './App';

// Создаем экземпляр приложения express
const app = express();

// Указываем папку с статическими файлами
app.use(express.static('public'));

// Обрабатываем запросы к статическим файлам
app.get('/index.js', (req, res) => {
  res.sendFile('index.js', { root: './public' });
});

app.get('/', async (req, res) => {
  const { html, state } = await serverRender(() => <App />);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script>
          window.SSR_DATA = ${serialize(state, { isJSON: true })}
        </script>
    </head>
    <body>
        <div id="root">${html}</div>
        <script src="/index.js"></script>
    </body>
    </html>
  `);
});


// Запускаем сервер на порту 4000
app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});
