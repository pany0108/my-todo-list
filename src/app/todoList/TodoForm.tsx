import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Input,
  Segment,
  Icon,
  Grid,
} from 'semantic-ui-react';
import TodoListStore from '../service/store/TodoListStore';
import { ModalNoContents, ModalNoTime } from './modal';
import TimeSet from './TimeSet';
import '~/app/style/todoForm.css';
import { debug } from 'console';

interface State {
  modalOpenNoContents: boolean;
  modalOpenSetTime: boolean;
  resetTime: boolean;
  // allDay: boolean;
}

@observer
class TodoForm extends Component {
  state: State = {
    modalOpenNoContents: false,
    modalOpenSetTime: false,
    resetTime: false,
    // allDay: false,
  };

  addItem = () => {
    // const { allDay } = this.state;
    const { itemList, allDay } = TodoListStore;

    const index =
      itemList.length > 0 ? itemList[itemList.length - 1].index + 1 : 1;

    if (TodoListStore.title === '') {
      this.setState({ modalOpenNoContents: true });
    }
    if (TodoListStore.title !== '' && TodoListStore.time === '') {
      this.setState({ modalOpenSetTime: true });
    }
    if (TodoListStore.title !== '' && TodoListStore.time !== '') {
      TodoListStore.addItem(index);
      this.setState({ resetTime: true });
      TodoListStore.title = '';
      TodoListStore.time = '';
    }
    if (allDay && TodoListStore.title !== '') {
      TodoListStore.addItem(index);
      this.setState({ modalOpenSetTime: false });
      this.setState({ resetTime: true });
      TodoListStore.title = '';
      TodoListStore.time = '';
      TodoListStore.allDay = false;
    }

    // console.log('item added');
  };

  handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  };

  resetInput = () => {
    TodoListStore.title = '';
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpenNoContents, modalOpenSetTime, resetTime } = this.state;
    const { title } = TodoListStore;

    return (
      <>
        <Segment className="todolist-form">
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Input
                  fluid
                  value={title}
                  onChange={(e: any) => {
                    TodoListStore.title = e.target.value;
                  }}
                  onKeyPress={this.handleKeyPress}
                  action={{
                    className: TodoListStore.title === '' ? 'hide' : '',
                    content: <Icon name="delete" fitted />,
                    onClick: this.resetInput,
                  }}
                  placeholder="할 일을 입력해주세요"
                />
              </Grid.Column>

              <Grid.Column
                width={16}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <TimeSet resetTime={resetTime} />
                <Checkbox
                  className="all-day"
                  label="종일"
                  checked={TodoListStore.allDay ? true : false}
                  onChange={(e: any) => {
                    TodoListStore.allDay = !e.target.previousSibling.checked;
                  }}
                  toggle
                />

                <Button
                  className="add-btn"
                  inverted
                  circular
                  onClick={() => {
                    this.addItem();
                  }}
                  style={{ padding: '1.4rem 2rem', marginLeft: 'auto' }}
                >
                  <Icon name="add" /> ADD
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <ModalNoContents
          modalOpen={modalOpenNoContents}
          handleClose={() => {
            this.setState({ modalOpenNoContents: false });
          }}
        />
        <ModalNoTime
          modalOpen={modalOpenSetTime}
          handleClose={() => {
            this.setState({ modalOpenSetTime: false });
          }}
        />
      </>
    );
  }
}

export default TodoForm;
