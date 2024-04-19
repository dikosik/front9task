import React from 'react';
import fetch from 'node-fetch';
import { useSsrState, useSsrEffect } from '@issr/core';

const getTodos = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(data => data.json())
};

export const App = () => {
  const [todos, setTodos] = useSsrState([]);

  useSsrEffect(async () => {
    const todos = await getTodos()
    setTodos(todos);
  });

  return (
    <div>
      <h1>Hi</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};