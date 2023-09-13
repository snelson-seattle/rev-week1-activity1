const readline = require("readline");

const groceryItems = [];

const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout, // Write to standard output (console)
});


function mainMenu() {
  rl.question(
    `What would you like to do? (enter action number or press Ctrl+C to quit)\n
    1) View grocery list\n
    2) Add new item to grocery list\n
    3) Remove item from grocery list\n
    4) Change item status to bought\n`,
    (answer) => {
      switch (answer.trim()) {
        case "1":
            viewGroceryList();
            mainMenu();
          break;
        case "2":
            addNewGroceryItem();
            break;
            case "3":
                break;
        default:
          console.log("Please enter a valid action number");
          break;
      }
    }
  );

  rl.once("close", () => {
    // end of input
  });
}
function viewGroceryList() {
    printGroceryList();
    mainMenu();
}

function printGroceryList() {
    console.log(`\tNumber\t\t\tName\t\t\tQuantity\t\t\tPrice\t\t\tBought\n`);
    groceryItems.forEach((item, index) => {
       console.log(`\t${index + 1}\t\t\t${item.name}\t\t\t${item.qty}\t\t\t\t$${item.price}\t\t\t${item.bought ? "Yes": "No"}`);
    });
}

function addNewGroceryItem() {
    const newGroceryItem = {bought: false};
    rl.question("What is the name of the item you wish to add?\n", (name) => {
        newGroceryItem.name = name.trim();
        rl.question("Enter the quantity needed\n", (qty) => {
            newGroceryItem.qty = parseInt(qty.trim());
            rl.question("Enter the item price\n", (price) => {
                newGroceryItem.price = parseFloat(price.trim());
                groceryItems.push(newGroceryItem);
                mainMenu();
            })
        });    
    });
}




mainMenu();
