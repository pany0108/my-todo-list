import { action, observable } from 'mobx';
import { TodoListApi } from '../api';

interface ItemType {
  index: number;
  title: string;
  checked: boolean;
}

class TodoListStore {
  @observable
  itemList: Array<ItemType>;

  @observable
  title: string;

  @observable
  checked: boolean;

  constructor() {
    this.itemList = [
      // { index: 1, title: 'Item 1', checked: false },
      // { index: 2, title: 'Item 2', checked: false },
      // { index: 3, title: 'Item 3', checked: true },
    ];
    this.title = '';
    this.checked = false;
  }

  @action
  setItemList = async () => {
    const result = await TodoListApi.setItemList();

    // console.log(result);
    this.itemList = result.data;
  };

  @action
  addItem = async (index: number) => {
    const payload = {
      id: index,
      index,
      title: this.title,
      checked: false,
    };

    await TodoListApi.addItem(payload);

    this.setItemList();
  };

  @action
  deleteItem = async (index: number) => {
    await TodoListApi.deleteItem(index);

    this.setItemList();
  };

  @action
  checkItem = async (index: number, checked: boolean) => {
    await TodoListApi.checkItem(index, checked);

    this.setItemList();
  };
}

export default new TodoListStore();
