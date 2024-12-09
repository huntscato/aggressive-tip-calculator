// To enable calculator functionality ~

// DOM Loaded 

document.addEventListener("DOMContentLoaded", () => {

    const display = document.querySelector(".display p");
    const numberButtons = document.querySelectorAll(".number");
    const enterButton = document.querySelector(".enter");

    let input = "";
    let step = "meal";
    let tipPercentage = 20; // Default tip
    let mealCost = 0;
    let tipAmount = 0;
    let totalCost = 0;
    let yourCost = 0;
    let numPeople = 1; 

    // To update display ~ 

    const updateDisplay = (message) => {
        display.textContent = message; 
    }; 

    updateDisplay("Enter the total cost, fatty (ie. 7.99 for $7.99, obviously). ");

    // Button Clicks ~ 

    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const number = button.textContent;
            input += number; 
            if (step=== "meal") {
                updateDisplay(`Meal cost so far: ${input}`)
            } else if (step=== "tip") {
                updateDisplay (`Tip percentage so far: ${input}`);
            } else if (step === "people") {
                updateDisplay(`Number of people: ${input}`)
            }
        });
    });

    enterButton.addEventListener("click", () => {
        if (step === "meal") {
          // Process meal cost
          mealCost = parseFloat(input);
          if (isNaN(mealCost) || mealCost <= 0) {
            updateDisplay("Please enter a valid number for the meal cost.");
            return;
          }
          // Reset input for tip
          input = "";
          step = "tip";
          updateDisplay(
            `The meal is $${mealCost.toFixed(2)}. Now enter the tip percentage (ie. "20" for 20%). Standard is 20%, you cheap bastard.`
          );
        } else if (step === "tip") {
          // Process tip percentage
          tipPercentage = parseFloat(input);
          if (isNaN(tipPercentage) || tipPercentage <= 0) {
            updateDisplay("Please enter a valid tip percentage.");
            return;
          }
    
          // Reset input for number of people
          input = "";
          step = "people";
          updateDisplay("Now enter the number of people splitting the bill.");
        } else if (step === "people") {
          // Process number of people
          numPeople = parseInt(input);
          if (isNaN(numPeople) || numPeople <= 0) {
            updateDisplay("Please enter a valid number of people.");
            return;
          }
    
          // Calculate the costs
          tipAmount = (mealCost * tipPercentage) / 100;
          totalCost = mealCost + tipAmount;
          yourCost = totalCost / numPeople; // Split total cost by number of people
    
          // Update the display with the result
          updateDisplay(
            `The meal is $${mealCost.toFixed(2)}, with an added tip of $${tipAmount.toFixed(
              2
            )}, bringing the total to $${totalCost.toFixed(
              2
            )}. Each person's share is $${yourCost.toFixed(2)}. Pay up, bitch!`
          );
    
          // Reset for the next calculation
          input = "";
          step = "meal";
        }
      });
    });