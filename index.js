function createEmployeeRecord(inputArray) {
    let employeeRecord = {
      firstName: inputArray[0],
      familyName: inputArray[1],
      title: inputArray[2],
      payPerHour: inputArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
    return employeeRecord;
  }

  function createEmployeeRecords(inputArrayOfArrays) {
    let employeeRecords = [];
    for (let i = 0; i < inputArrayOfArrays.length; i++) {
      employeeRecords.push(createEmployeeRecord(inputArrayOfArrays[i]));
    }
    return employeeRecords;
  }

  function createTimeInEvent(employeeRecord, timeIn) {
    // Split the timeIn string into date and hour parts
    let date = timeIn.slice(0, 10);
    let hour = timeIn.slice(11);
    let newEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt (hour)
    };
    if (!employeeRecord.hasOwnProperty("timeInEvents")) {
      employeeRecord.timeInEvents = [];
    }
    employeeRecord.timeInEvents.push(newEvent);
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, timeOut){
    let date = timeOut.slice(0, 10);
    let hour = timeOut.slice(11);
    let newEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt (hour)
    };
    if (!employeeRecord.hasOwnProperty("timeOutEvents")) {
      employeeRecord.timeOutEvents = [];
    }
    employeeRecord.timeOutEvents.push(newEvent);
    return employeeRecord;
  }

function hoursWorkedOnDate(employeeRecord,date){
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour;
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour;
  const hoursWorked = (timeOut - timeIn) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payRate = employeeRecord.payPerHour;
  const wagesEarned = hoursWorked * payRate;
  return wagesEarned;
}

function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map(event => event.date);
  const wagesEarned = dates.reduce((totalWages, date) => {
    return totalWages + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
  return wagesEarned;
}

function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce((totalWages, employeeRecord) => {
    return totalWages + allWagesFor(employeeRecord);
  }, 0);
  return totalPayroll;
}


