import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Button, Checkbox, Item } from 'semantic-ui-react';
import { TodoListStore } from '~/app/service';
import '~/app/style/todoItem.css';

interface Prop {
  index: number;
}

interface State {
  isMoreBtnClicked: boolean;
}

@observer
class TodoItem extends Component<Prop> {
  private readonly moreRef: React.RefObject<any>;

  state: State = {
    isMoreBtnClicked: false,
  };

  constructor(props: Prop) {
    super(props);

    this.moreRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.initMoreBtn);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.initMoreBtn);
  }

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

  initMoreBtn = (event: any) => {
    if (!this.moreRef.current.contains(event.target)) {
      this.setState({ isMoreBtnClicked: false });
    }
  };

  render() {
    const { isMoreBtnClicked } = this.state;
    const { index } = this.props;
    const { itemList } = TodoListStore;

    return (
      <>
        <div
          className={`todo-item ${itemList[index].checked ? 'checked' : ''}`}
        >
          <Checkbox
            className="checkbox-item"
            label={itemList[index].title}
            checked={itemList[index].checked ? true : false}
            onClick={this.checkItem}
          />
          <Item.Meta>{itemList[index].time}</Item.Meta>
          <div ref={this.moreRef}>
            <Button.Group>
              <Button
                className="more-btn"
                icon="ellipsis horizontal"
                compact
                onClick={() => {
                  this.setState({ isMoreBtnClicked: !isMoreBtnClicked });
                }}
              ></Button>

              <Button
                className={`del-btn ${isMoreBtnClicked ? 'shown' : ''}`}
                icon="trash alternate outline"
                compact
                onClick={this.deleteItem}
              ></Button>
              <Button
                className={`edit-btn ${isMoreBtnClicked ? 'shown' : ''}`}
                icon="edit"
                compact
              ></Button>
            </Button.Group>
          </div>
        </div>
      </>
    );
  }
}

export default TodoItem;
