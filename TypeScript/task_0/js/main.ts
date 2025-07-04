// Define the Student interface
interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

// Create 2 students
const student1: Student = {
  firstName: 'Ed',
  lastName: 'Rikku',
  age: 15,
  location: 'Resembool'
};

const student2: Student = {
  firstName: 'Al',
  lastName: 'Rikku',
  age: 13,
  location: 'Ishval'
};

// Put them into an array
const studentsList: Student[] = [student1, student2];

// Render table to the DOM
const table = document.createElement('table');
const tableHeader = document.createElement('tr');
const th1 = document.createElement('th');
th1.textContent = 'First Name';
const th2 = document.createElement('th');
th2.textContent = 'Location';
tableHeader.appendChild(th1);
tableHeader.appendChild(th2);
table.appendChild(tableHeader);

// Add rows for each student
studentsList.forEach((student) => {
  const row = document.createElement('tr');
  const firstNameCell = document.createElement('td');
  firstNameCell.textContent = student.firstName;
  const locationCell = document.createElement('td');
  locationCell.textContent = student.location;
  row.appendChild(firstNameCell);
  row.appendChild(locationCell);
  table.appendChild(row);
});

// Add the table to the document
document.body.appendChild(table);
