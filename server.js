const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const Table = require('cli-table3');

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
      case "Delete...":
        deleteOptions();
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
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        new inquirer.Separator(),
        "Delete...",
        "Quit"
      ]
    }
  ]).then((answers) => {
    if (answers.task === "Delete...") {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'deleteTask',
          message: 'What would you like to delete?',
          choices: ["Employee", "Role", "Department", "Exit"]
        }
      ]);
    }
    return answers;
  });
};

const viewAllEmployees = () => {
  const query = `
    SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title AS role, 
      department.name AS department, 
      role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM 
      employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return;
    }

    // Display the employee data as a table
    const table = new Table({
      head: ['ID', 'First Name', 'Last Name', 'Job Title', 'Department', 'Salary', 'Manager'],
      colWidths: [10, 20, 20, 20, 20, 15, 25]
    });

    results.forEach(employee => {
      table.push([
        employee.id,
        employee.first_name,
        employee.last_name,
        employee.role,
        employee.department,
        employee.salary,
        employee.manager
      ]);
    });

    console.log('All Employees:');
    console.log(table.toString());

    startApp();
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter employee first name:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter employee last name:'
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter employee role ID:'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter employee manager ID (optional, leave blank if none):'
      }
    ])
    .then(answers => {
      const { firstName, lastName, roleId, managerId } = answers;

      const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
      `;

      const values = [firstName, lastName, roleId, managerId || null];

      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          return;
        }

        console.log('Employee added successfully!');
        startApp();
      });
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee you want to update:'
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the new role ID for the employee:'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the new manager ID for the employee (optional, leave blank if none):'
      }
    ])
    .then(answers => {
      const { employeeId, roleId, managerId } = answers;

      const query = `
        UPDATE employee 
        SET role_id = ?, manager_id = ? 
        WHERE id = ?
      `;

      const values = [roleId, managerId || null, employeeId];

      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          return;
        }

        console.log('Employee updated successfully!');
        startApp();
      });
    });
};

const viewRoles = () => {
  const query = `
    SELECT 
      role.id AS role_id,
      role.title AS job_title,
      role.salary,
      department.name AS department
    FROM 
      role
    LEFT JOIN department ON role.department_id = department.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return;
    }

    const table = new Table({
      head: ['Role ID', 'Job Title', 'Salary', 'Department'],
      colWidths: [15, 30, 15, 30]
    });

    results.forEach(role => {
      table.push([role.role_id, role.job_title, role.salary, role.department]);
    });

    console.log('All Roles:');
    console.log(table.toString());

    startApp();
  });
};

const addRole = () => {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary:'
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter department ID:'
    }
  ])
  .then(answers => {
    const { roleTitle, salary, departmentId } = answers;

    const query = `
      INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)
    `;

    const values = [roleTitle, salary, departmentId];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return;
      }

      console.log('Role added successfully!');
      startApp();
    });
  });
};

const viewDepartments = () => {
  const query = `
    SELECT 
      department.id AS department_id,
      department.name AS department_name,
      SUM(role.salary) AS budget
    FROM 
      department
    LEFT JOIN role ON department.id = role.department_id
    LEFT JOIN employee ON role.id = employee.role_id
    GROUP BY department.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return;
    }

    const table = new Table({
      head: ['Department ID', 'Department Name', 'Budget'],
      colWidths: [20, 30, 20]
    });

    results.forEach(department => {
      table.push([department.department_id, department.department_name, department.budget]);
    });

    console.log('All Departments:');
    console.log(table.toString());

    startApp();
  });
};

const addDepartment = () => {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter department name:'
    }
  ])
  .then(answers => {
    const { departmentName } = answers;

    const query = `
      INSERT INTO department (name)
      VALUES (?)
    `;

    const values = [departmentName];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return;
      }

      console.log('Department added successfully!');
      startApp();
    });
  });
};

const deleteOptions = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'deleteTask',
        message: 'What would you like to delete?',
        choices: ["Employee", "Role", "Department", "Exit"]
      }
    ])
    .then(answers => {
      const { deleteTask } = answers;

      if (deleteTask === "Employee") {
        deleteEmployee();
      } else if (deleteTask === "Role") {
        deleteRole();
      } else if (deleteTask === "Department") {
        deleteDepartment();
      } else {
        startApp();
      }
    });
};

const deleteEmployee = () => {
  
};

const deleteRole = () => {
  
};

const deleteDepartment = () => {
  
};