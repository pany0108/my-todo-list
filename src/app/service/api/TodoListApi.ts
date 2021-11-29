import Axios from 'axios';

class TodoListApi {
  setItemList = async () => {
    const data = await Axios.get('http://localhost:80/item').catch(
      (error: any) => error.response.data,
    );

    return data;
  };

  addItem = async (payload: object) => {
    const data = await Axios.post('http://localhost:80/item', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error: any) => error.reponse.data);

    return data;
  };

  deleteItem = async (index: number) => {
    const data = await Axios.delete(`http://localhost:80/item/${index}`).catch(
      (error: any) => error.response.data,
    );

    return data;
  };

  checkItem = async (index: number, checked: boolean) => {
    const data = await Axios.put(`http://localhost:80/item/${index}`, {
      checked: !checked,
    }).catch((error: any) => error.response.data);

    return data;
  };
}

export default new TodoListApi();
