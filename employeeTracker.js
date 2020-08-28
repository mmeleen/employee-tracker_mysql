var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "mysqlpass",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  startTracker();
});

function startTracker() {
  console.log("\n");
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "VIEW - departments, roles, employees",
        "ADD - department, role, employee",
        "UPDATE - employee role, employee manager",
        // "DELETE - department, role, employee",
        // "BUDGET - total budget per department",
        "EXIT"
      ]
    }
    ).then(function (answer) {
      switch (answer.action) {
        case "VIEW - departments, roles, employees":
          viewPrompt();
          break;
        case "ADD - department, role, employee":
          addPrompt();
          break;
        case "UPDATE - employee role, employee manager":
          updatePrompt();
          break;
        // case "DELETE - department, role, employee":
        //   deletePrompt();
        //   break;
        // case "BUDGET - view total budget per department":
        //   budgetPrompt();
        //   break;
        case "EXIT":
          console.log("\nExiting...");
          connection.end();
      }
    })
}
function viewPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "View all:",
      choices: [
        "DEPARTMENTS",
        "ROLES",
        "EMPLOYEES"
      ]
    }
    ).then(function (answer) {
      switch (answer.action) {
        case "DEPARTMENTS":
          connection.query("SELECT * FROM department", (err, res) => {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            startTracker();
          })
          break;
        case "ROLES":
          connection.query("SELECT * FROM roles", (err, res) => {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            startTracker();
          })
          break;
        case "EMPLOYEES":
          connection.query("SELECT * FROM employees", (err, res) => {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            startTracker();
          })
          break;

      }
    })
}

function addPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Add a:",
      choices: [
        "DEPARTMENT",
        "ROLE",
        "EMPLOYEE"
      ]
    }
    ).then(function (answer) {
      switch (answer.action) {
        case "DEPARTMENT":
          inquirer
            .prompt({
              name: "department",
              type: "input",
              message: "Enter department name to add:"
            })
            .then(function (answer) {
              var query = "INSERT INTO department (name) VALUES (?)";
              connection.query(query, [answer.department], function (err, res) {
                if (err) throw err;
                console.log("\nNew department added!");
                startTracker();
              });
            });
          break;
        case "ROLE":
          inquirer
            .prompt([
              {
                name: "role",
                type: "input",
                message: "Enter role title to add:"
              },
              {
                name: "salary",
                type: "input",
                message: "Enter role salary:"
              },
              {
                name: "roleDept",
                type: "input",
                message: "Enter role department id:"
              }
            ])
            .then(function (answer) {
              var query = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
              connection.query(query, [answer.role, answer.salary, answer.roleDept], function (err, res) {
                if (err) throw err;
                console.log("\nNew role added!");
                startTracker();
              });
            });
          break;
        case "EMPLOYEE":
          inquirer
            .prompt([
              {
                name: "empFirst",
                type: "input",
                message: "Enter employee first name:"
              },
              {
                name: "empLast",
                type: "input",
                message: "Enter employee last name:"
              },
              {
                name: "empRole",
                type: "input",
                message: "Enter employee role id:"
              },
              {
                name: "empManager",
                type: "input",
                message: "Enter employee manager id:"
              }
            ])
            .then(function (answer) {
              var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
              connection.query(query, [answer.empFirst, answer.empLast, answer.empRole, answer.empManager || null], function (err, res) {
                if (err) throw err;
                console.log("\nNew employee added!");
                startTracker();
              });
            });
          break;

      }
    })
}

function updatePrompt() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    // console.log(res);
    inquirer
      .prompt([{
        name: "empId",
        type: "list",
        message: "Choose employee to update:",
        choices: res.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }))
      }, {
        name: "action",
        type: "list",
        message: "Update:",
        choices: ["Role", "Manager"]
      },
      {
        name: "newId",
        type: "input",
        message: "Enter updated id:"
      }]).then(function (answer) {
        switch (answer.action) {
          case "Role": {
            let query = "UPDATE employees SET role_id = ? WHERE id = ?";
            connection.query(query, [answer.newId, answer.empId], function (err, res) {
              if (err) throw err;
              console.log("\nEmployee updated!");
              startTracker();
            });
          }
            break;
          case "Manager": {
            let query = "UPDATE employees SET manager_id = ? WHERE id = ?";
            connection.query(query, [answer.newId, answer.empId], function (err, res) {
              if (err) throw err;
              console.log("\nEmployee updated!");
              startTracker();
            });
          }
            break;
        }
      });
  })
}