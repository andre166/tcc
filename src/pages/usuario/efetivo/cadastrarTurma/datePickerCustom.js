import React, { useState } from "react";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { DatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickers:{
        backgroundColor: '#eeeeee',
        color: 'red'
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#8d93ab',
        color: 'red !important'
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        color: "red",
      },
    },
    MuiPickersYear: {
        year: {
            color: "red"
          },
    },
    MuiPickersDay: {
        year: {
        color: "red"
      },
      daySelected: {
        backgroundColor: lightBlue["400"],
      },
      dayDisabled: {
        color: lightBlue["100"],
      },
      current: {
    width: 200,
        color: 'red',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: 'red',
      },
    },
  },
});

function CssOverrides( { date, changeDate }) {

  return (
    <ThemeProvider theme={materialTheme}>
      <DatePicker
         variant="static"
         views={["year"]}
         label="Year only"
        value={date}
        onChange={changeDate}
       
      />
    </ThemeProvider>
  );
}

export default CssOverrides;