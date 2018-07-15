var inquirer = require("inquirer");
var mysql = require('mysql');
var config = require('./config');



var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: config.password,
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    selection();
});

function selection() {

    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Buy something",
                "Find out how many are in stock",
                "Find item cost",
            ]
        })
        .then(function (res) {

            switch (res.selection) {
                case "Buy something":
                    order();
                    break;

                case "Find item cost":
                    cost();
                    break;

                case "Find out how many are in stock":
                    stockNum();
                    break;

                default:
                    console.log("Thanks for making a selection.")

            }
        })

}

function order() {

    connection.query("SELECT * FROM listItems", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "item",
                type: "list",
                message: "What would you like to purchase?",
                choices: [
                    "pots", "tuna", "eggs", "wheels", "slippers", "beans", "tire", "dvd", "underwear", "tshirt"
                ]
            },
            {
                name: "number",
                type: "input",
                message: "How many would you like to order?",

            }])
            .then(function (answer) {
                console.log(answer);
                var itemCount;
                var total;
                var itemsRemaining;
                var item = answer.item;
                var itemsOrdered = parseInt(answer.number);

                for (var i = 0; i < res.length; i++) {
                    itemCount = +(res[i].item_quantity);
                    itemsRemaining = itemCount - itemsOrdered;
                    total = parseInt(+(res[i].item_cost) * itemsOrdered);
                }

                console.log(answer.number + " " + item + " Selected for purchase.\n");
                console.log("$" + total);
                console.log("==================================================================\n")
                console.log(itemsRemaining + " Remaining in inventory.\n");


                if (answer.number > itemsRemaining) {
                    console.log("==================================================================\n")
                    console.log("Sorry, we do not have enough units to complete your order request.");
                    console.log("==================================================================\n")
                    selection();
                } else {
                    connection.query(
                        "UPDATE listItems SET ? WHERE ?", [{

                            item_quantity: itemsRemaining

                        },
                        {
                            item_name: item
                        }
                        ],
                        function (err) {
                            if (err) throw err;
                            console.log("=================================================")
                            console.log("Your order was submitted successfully. Thank you!")
                            console.log("=================================================")
                            selection();
                        }
                    );
                }

            })
    })
}

function cost() {

    connection.query("SELECT * FROM listItems", function (err, res) {
        if (err) throw err;

        inquirer.prompt({

            name: "item",
            type: "list",
            message: "What item's price would you like to check?",
            choices: [
                "pots", "tuna", "eggs", "wheels", "slippers", "beans", "tire", "dvd", "underwear", "tshirt"
            ]
        })
            .then(function (answer) {

                connection.query("SELECT * FROM listItems WHERE item_name=?", [answer.item], function (err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        console.log(res[i].item_name + " | " + "$" + res[i].item_cost);
                    }
                    selection();
                })

            })

    })
}

function stockNum() {

    connection.query(
        "SELECT * FROM listItems", function (err, res) {
            if (err) throw err + "unable to calculate quantity";

            for (var i = 0; i < res.length; i++) {

                console.log(res[i].id + " | " + res[i].item_name + " | " + "Currently: " + res[i].item_quantity + " in stock.");
                console.log("------------------------------------------------------------");
            }
            selection();
        })

}