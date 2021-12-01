import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Input, Segment } from 'semantic-ui-react';
import TodoListStore from '../service/store/TodoListStore';
import { ModalAlert } from './modal';
import TimeSet from './TimeSet';

interface State {
  modalOpen: boolean;
}

@observer
class TodoForm extends Component {
  state: State = {
    modalOpen: false,
  };

  addItem = () => {
    const { itemList } = TodoListStore;

    const index =
      itemList.length > 0 ? itemList[itemList.length - 1].index + 1 : 1;

    TodoListStore.title === ''
      ? this.setState({ modalOpen: true })
      : TodoListStore.addItem(index);

    TodoListStore.title = '';
    TodoListStore.time = '';

    // console.log('item added');
  };

  handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen } = this.state;
    const { title } = TodoListStore;

    return (
      <>
        <Segment className="todolist-form">
          <Input
            fluid
            value={title}
            onChange={(e: any) => {
              TodoListStore.title = e.target.value;
            }}
            onKeyPress={this.handleKeyPress}
            action={{
              content: 'Add',
              onClick: this.addItem,
            }}
            placeholder="뭐할까?"
          />

          <TimeSet />
        </Segment>

        <ModalAlert
          modalOpen={modalOpen}
          handleClose={() => {
            this.setState({ modalOpen: false });
          }}
        />
      </>
    );
  }
}

export default TodoForm;
