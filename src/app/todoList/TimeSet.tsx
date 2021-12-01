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
    timeValue: new Date(),
  };

  getTime = (newTimeValue: any) => {
    this.setState({ timeValue: newTimeValue });

    let hour = newTimeValue.getHours();
    let minutes = newTimeValue.getMinutes();
    let ampm = '';

    hour < 12 ? (ampm = 'am') : (ampm = 'pm');
    hour > 12 ? (hour = hour - 12) : (hour = hour);
    minutes === 0 ? (minutes = '00') : (minutes = minutes);

    TodoListStore.time =
      hour.toString() + ':' + minutes.toString() + ' ' + ampm;
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
