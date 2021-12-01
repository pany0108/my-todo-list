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
import { ModalNoContents } from './modal';
import ModalSetTime from './modal/ModalSetTime';
import TimeSet from './TimeSet';
import '~/app/style/todoForm.css';

interface State {
  modalOpenNoContents: boolean;
  modalOpenSetTime: boolean;
}

@observer
class TodoForm extends Component {
  state: State = {
    modalOpenNoContents: false,
    modalOpenSetTime: false,
  };

  addItem = () => {
    const { itemList } = TodoListStore;

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
      TodoListStore.title = '';
      TodoListStore.time = '';
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
    const { modalOpenNoContents, modalOpenSetTime } = this.state;
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

              <Grid.Column width={16}>
                <TimeSet />
                <Checkbox label="종일" />
              </Grid.Column>

              <Grid.Column width={16}>
                <Button
                  inverted
                  size="large"
                  fluid
                  onClick={() => {
                    this.addItem();
                  }}
                >
                  저장
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
        <ModalSetTime
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
