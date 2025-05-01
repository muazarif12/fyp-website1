import logo from './logo.svg';
import React from "react";
import AppRouter from './router/AppRouter';
import "."
import { TaskProvider } from './TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <AppRouter />
    </TaskProvider>
  );
};


export default App;
