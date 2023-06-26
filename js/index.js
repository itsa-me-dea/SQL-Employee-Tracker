// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const { writeFile } = require('fs').promises;
const { Circle, Triangle, Square } = require('./lib/generateSVG');

// Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
    {
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    },
]).then((answers) => {
    // NMT 3 characters warning
    if (answers.text.length > 3) {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'toDo',
                message: 'What would you like to do?',
                choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
            },
            {
                type: 'input',
                name: 'shapeColor',
                message: 'Enter a shape color or hexidecimal:',
            },
        ]);
    } else {
      writeToFile("generated-logo.svg", answers);
    }
  });
};


// Create a function to write SVG file
function writeToFile(filename, answers) {
    let SVGshape = "";
    if (answers.shape === "Circle") {
        SVGshape = new Circle();
    } else if (answers.shape === "Triangle") {
        SVGshape = new Triangle();
    } else {
        SVGshape = new Square(); 
    }

    // set user input values for shape classes
    SVGshape.setColor(answers.shapeColor);
    SVGshape.setText(answers.text);
    SVGshape.setTextColor(answers.fontColor);
   
    // create text for svg file
    SVGinfo = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    <!-- https://www.w3schools.com/graphics/svg_rect.asp -->
    ${SVGshape.render()}
    
    </svg>`;

    const filePath = "./gen-logo/generated-logo.svg";

    fs.writeFile(filePath, SVGinfo, function (err) {
        err ? console.log(err) : console.log("Sucessfully created " + filename)
    });
}

// run questions when prompted with node
questions();