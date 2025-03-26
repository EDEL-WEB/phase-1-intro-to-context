const employeeRecord = [
    {
        firstName: 'John',
        familyName: 'Doe',
        title: 'Software Developer',
        payPerHour: 50, 
    },
];

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour, 
        timeInEvents: [],
        timeOutEvents: []
    };
}

const employeeArray = ['John', 'Doe', 'Software Developer', 50];
const employee = createEmployeeRecord(employeeArray);
console.log(employee);

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
}

const employeesArray = [
    ['John', 'Doe', 'Software Developer', 50],
    ['Jane', 'Smith', 'Project Manager', 60]
];
const employees = createEmployeeRecords(employeesArray);
console.log(employees);

function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
        type: 'TimeIn',
        date,
        hour: parseInt(hour, 10)
    });
    return employee;
}

const updatedEmployee = createTimeInEvent(employee, '2025-03-26 0900');
console.log(updatedEmployee);

function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date,
        hour: parseInt(hour, 10)
    });
    return employee;
}

const updatedEmployeeWithTimeOut = createTimeOutEvent(employee, '2025-03-26 1700');
console.log(updatedEmployeeWithTimeOut);

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

const hoursWorked = hoursWorkedOnDate(employee, '2025-03-26');
console.log(hoursWorked);

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour; 
}

const wagesEarned = wagesEarnedOnDate(employee, '2025-03-26');
console.log(wagesEarned);

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

const totalWages = allWagesFor(employee);
console.log(totalWages);

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
        const employeeWages = allWagesFor(employee);
        console.log(`Employee: ${employee.firstName} ${employee.familyName}, Wages: ${employeeWages}`);
        return total + employeeWages;
    }, 0);
}

const totalPayroll = calculatePayroll(employees);
console.log(`Total Payroll: ${totalPayroll}`);