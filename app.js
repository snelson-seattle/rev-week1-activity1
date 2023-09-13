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
    4) Set item's bought status\n`,
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
          removeGroceryItem();
          break;
        case "4":
            changeGroceryItemStatus();
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
  if (groceryItems.length < 1) {
    console.log("There are no grocery items in the list yet.\n");
    mainMenu();
    return;
  }

  printGroceryList();
  mainMenu();
}

function printGroceryList() {
console.table(groceryItems);
}

function addNewGroceryItem() {
  const newGroceryItem = { bought: false };
  rl.question("What is the name of the item you wish to add?\n", (name) => {
    newGroceryItem.name = name.trim();
    rl.question("Enter the quantity needed\n", (qty) => {
      newGroceryItem.qty = parseInt(qty.trim());
      rl.question("Enter the item price\n", (price) => {
        newGroceryItem.price = parseFloat(price.trim());
        groceryItems.push(newGroceryItem);
        mainMenu();
      });
    });
  });
}

function removeGroceryItem() {
  if (groceryItems.length < 1) {
    console.log("There are no grocery items in the list yet.\n");
    mainMenu();
    return;
  }

  printGroceryList();
  rl.question("Enter the index number of the item you wish to remove\n", (answer) => {
    const index = parseInt(answer.trim());
    groceryItems.splice(index, 1);
    mainMenu();
  });
}

function changeGroceryItemStatus() {
  if (groceryItems.length < 1) {
    console.log("There are no grocery items in the list yet.\n");
    mainMenu();
    return;
  }

  printGroceryList();
  rl.question(
    "Enter the index number of the item that you wish to change the bought status for\n",
    (answer) => {
      const index = parseInt(answer.trim());
      groceryItems[index].bought = !groceryItems[index].bought;
      mainMenu();
    }
  );
}

mainMenu();
