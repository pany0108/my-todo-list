import React, { Component } from 'react';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import { TodoListStore } from '~/app/service';
import { observer } from 'mobx-react';

interface State {
  timeValue: any;
}

@observer
class TimeSet extends Component {
  state: State = {
    timeValue: '',
  };

  constructor(props: any) {
    super(props);

    TodoListStore.time = this.state.timeValue;
  }

  initTime = () => {};

  getTime = (newTimeValue: any) => {
    this.setState({ timeValue: newTimeValue });

    var hours = newTimeValue.getHours();
    var minutes = newTimeValue.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    TodoListStore.time = hours + ':' + minutes + ' ' + ampm;
  };

  render() {
    const { timeValue } = this.state;

    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={timeValue}
            onChange={(newTimeValue: any) => {
              this.getTime(newTimeValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </>
    );
  }
}

export default TimeSet;
