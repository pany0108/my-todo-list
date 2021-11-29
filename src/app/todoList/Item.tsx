import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Button, Checkbox } from 'semantic-ui-react';
import TodoListStore from '../service/store/TodoListStore';

import '../todoItem.css';

interface Props {
  index: number;
}

@observer
class Item extends Component<Props> {
  checkItem = () => {
    const { index } = this.props;
    const { itemList } = TodoListStore;

    TodoListStore.checkItem(itemList[index].index, itemList[index].checked);

    // console.log('item changed');
  };

  deleteItem = () => {
    const { index } = this.props;
    const { itemList } = TodoListStore;

    TodoListStore.deleteItem(itemList[index].index);

    // console.log('item deleted');
  };

  render() {
    const { index } = this.props;
    const { itemList } = TodoListStore;

    return (
      <>
        <div
          className={
            itemList[index].checked ? 'todo-item checked' : 'todo-item'
          }
        >
          <Checkbox
            className="checkbox-item"
            label={itemList[index].title}
            checked={itemList[index].checked ? true : false}
            onClick={this.checkItem}
          />
          <Button
            icon="close"
            basic
            circular
            compact
            onClick={this.deleteItem}
          ></Button>
        </div>
      </>
    );
  }
}

export default Item;
