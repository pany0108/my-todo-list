import { action, observable } from 'mobx';
import { TodoListApi } from '../api';

interface ItemType {
  index: number;
  title: string;
  checked: boolean;
  time: any;
  allDay: boolean;
}

class TodoListStore {
  @observable
  itemList: Array<ItemType>;

  @observable
  title: string;

  @observable
  checked: boolean;

  @observable
  time: any;

  @observable
  allDay: boolean;

  constructor() {
    this.itemList = [
      // { index: 1, title: 'Item 1', checked: false },
      // { index: 2, title: 'Item 2', checked: false },
      // { index: 3, title: 'Item 3', checked: true },
    ];
    this.title = '';
    this.checked = false;
    this.time = '';
    this.allDay = false;
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
      time: this.time,
      allDday: this.allDay,
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

  @action
  getTime = (newTimeValue: any) => {
    var hours = newTimeValue.getHours();
    var minutes = newTimeValue.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    this.time = hours + ':' + minutes + ' ' + ampm;
  };
}

export default new TodoListStore();
