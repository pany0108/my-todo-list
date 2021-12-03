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

  render() {
    const { timeValue } = this.state;

    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={timeValue}
            onChange={(newTimeValue: any) => {
              TodoListStore.getTime(newTimeValue);
              this.setState({ timeValue: newTimeValue });
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </>
    );
  }
}

export default TimeSet;
