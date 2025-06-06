// Homework: Mastering Advanced JavaScript Features

// 1. Create an async generator that yields random numbers between 1 and 100
console.log("== Async Generator: Random Numbers ==");

 async function* randomNumbers() {
   while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    let randomNumber = Math.floor(Math.random() * (100 - 1 +1) + 1);
    yield randomNumber;
   }
 }

// 2. Create an async function that uses the above generator and logs numbers that are multiples of 5
console.log("\n== Async Function: Multiples of 5 ==");

async function* logMultiplesOfFive() {
  // Your code here
  let multiplesOfFive = 0;

  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    multiplesOfFive += 5;
    yield multiplesOfFive;
   }
}

// 3. Create an async generator that simulates fetching user data
console.log("\n== Async Generator: Fetch User Data ==");
async function fetchData(i) {
    await new Promise(resolve=> setTimeout(resolve, 2000));
    return ` Data: ${i} `
}
async function* fetchUserData(n) {
  // Your code here
  for (let i = 0;i <= n;i++) {
    let data = await fetchData(i);
    yield data;
  }
}

// 4. Create an async function that consumes the above generator and logs users whose age is above 30
console.log("\n== Async Function: Users Above 30 ==");

async function logUsersAbove30() {
  // Your code here
}

// 5. Create a Promise that resolves to 'Hello, World!' after 2 seconds
console.log("\n== Promise: Hello, World! ==");

function helloWorldPromise() {
  // Your code here
}

// 6. Create an async function that awaits the above Promise and logs the result
console.log("\n== Async Function: Await Hello, World! ==");

async function awaitHelloWorld() {
  // Your code here
}

// 7. Create an async generator that yields the current date every second
console.log("\n== Async Generator: Current Date ==");

async function* currentDateGenerator() {
  // Your code here
}

// 8. Create an async function that consumes the above generator and logs the date for 5 seconds
console.log("\n== Async Function: Log Date for 5 Seconds ==");

async function logDateForFiveSeconds() {
  // Your code here
}

// 9. Create a Promise that either resolves to 'Success' or rejects with 'Error' based on a random boolean
console.log("\n== Promise: Random Success or Error ==");

function randomOutcomePromise() {
  // Your code here
}

// 10. Create an async function that awaits the above Promise and handles both resolve and reject cases
console.log("\n== Async Function: Handle Random Outcome ==");

async function handleRandomOutcome() {
  // Your code here
}

// Start solving the problems
// Uncomment the lines below to test your solutions
(async () => {
    let dataStream = fetchUserData(5);
    for await (let num of  dataStream)
    console.log(num);
})();
// logUsersAbove30();
// awaitHelloWorld();
// logDateForFiveSeconds();
// handleRandomOutcome();
