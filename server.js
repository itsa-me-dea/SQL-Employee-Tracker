const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'm@inWeiRDoR007598',
  database: 'company_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log(`
    ,ggggggg,                                                                               
  ,dP""""""Y8b                               ,dPYb,                                         
  d8'    a  Y8                               IP' Yb                                         
  88     "Y8P'                               I8  8I                                         
   8baaaa                                    I8  8'                                         
 ,d8P""""      ,ggg,,ggg,,ggg,   gg,gggg,    I8 dP    ,ggggg,   gg     gg   ,ggg,    ,ggg,  
 d8"          ,8" "8P" "8P" "8,  I8P"  "Yb   I8dP    dP"  "Y8gggI8     8I  i8" "8i  i8" "8i 
 Y8,          I8   8I   8I   8I  I8'    ,8i  I8P    i8'    ,8I  I8,   ,8I  I8, ,8I  I8, ,8I 
  Yba,,_____,,dP   8I   8I   Yb,,I8 _  ,d8' ,d8b,_ ,d8,   ,d8' ,d8b, ,d8I   YbadP'   YbadP' 
    "Y88888888P'   8I   8I    Y8PI8 YY88888P8P'"Y88P"Y8888P"   P""Y88P"888888P"Y888888P"Y888
                                 I8                                  ,d8I'                  
                                 I8                                ,dP'8I                   
                                 I8                               ,8"  8I                   
                                 I8                               I8   8I                   
                                 I8                                8, ,8I                   
                                 I8                                 Y8P"                    
                                 ,ggg, ,ggg,_,ggg,                                                                        
                                 dP  Y8dP  Y88P  Y8b                                                                       
                                 Yb,  88'   88'   88                                                                       
                                   "  88    88    88                                                                       
                                      88    88    88                                                                       
                                      88    88    88    ,gggg,gg   ,ggg,,ggg,     ,gggg,gg    ,gggg,gg   ,ggg,    ,gggggg, 
                                      88    88    88   dP"  "Y8I  ,8" "8P" "8,   dP"  "Y8I   dP"  "Y8I  i8" "8i   dP""""8I 
                                      88    88    88  i8'    ,8I  I8   8I   8I  i8'    ,8I  i8'    ,8I  I8, ,8I  ,8'    8I 
                                      88    88    Y8,,d8,   ,d8b,,dP   8I   Yb,,d8,   ,d8b,,d8,   ,d8I   YbadP' ,dP     Y8,
                                      88    88     Y8P"Y8888P" Y88P'   8I    Y8P"Y8888P" Y8P"Y8888P"888888P"Y8888P       Y8
                                                                                                  ,d8I'                    
                                                                                                ,dP'8I                     
                                                                                               ,8"  8I                     
                                                                                               I8   8I                     
                                                                                                8, ,8I                     
                                                                                                 Y8P"                      
  `)

  // Start the application after connecting to the database
  startApp();
});

const startApp = () => {
  questions().then((answers) => {
    switch (answers.task) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateEmployee();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "View All Departments":
        viewDepartments();
        break;
      case "Add Department":
        addDepartment();
        break;
      default:
        db.end(); // End MySQL inquirer when the user chooses to quit
        break;
    }
  });
};

const questions = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What would you like to do?',
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    },
  ]);
};

const viewAllEmployees = () => {
  const query = `SELECT * FROM employees`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return;
    }

    // Display the employee data
    console.log('All Employees:');
    results.forEach(employee => {
      console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role: ${employee.role_id}`);
    });

    startApp();
  });
};


const addEmployee = () => {
 
};

const updateEmployee = () => {
 
};

const viewRoles = () => {
 
};

const addRole = () => {
 
};

const viewDepartments = () => {
 
};

const addDepartment = () => {
 
};

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });