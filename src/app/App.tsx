import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import TodoList from './todoList/TodoList';

class App extends React.Component {
  render() {
    return (
      <>
        <TodoList />
      </>
    );
  }
}

export default App;
