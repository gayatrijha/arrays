'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i, arr) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, val) => acc + val, 0);
  labelBalance.innerHTML = `${acc.balance} EUR`;
};
const displaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}EUR`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, val) => acc + val);
  labelSumOut.textContent = `${Math.abs(out)}EUR`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.innerHTML = `${interest}EUR`;
};
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  displayBalance(acc);
  displaySummary(acc);
};
// EVENT HANDLERS
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === parseInt(inputLoginPin.value)) {
    // display ui msg
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;

    // clear filds
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = parseInt(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

// loan req

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    parseInt(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
//slice

let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));

// console.log(arr.slice());
// console.log([...arr]);

// console.log(arr);

// splice

// console.log(arr);
// console.log(arr.splice(2));
// console.log(arr.splice(-1));
// console.log(arr);
// console.log(arr.splice(1));
// console.log(arr);

// revere
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['i', 'j', 'k', 'l'];
// console.log(arr2.reverse());
// console.log(arr2);

// concat
const letters = arr.concat(arr2);
// console.log(letters);

// console.log([...arr, ...arr2]);

// join
// console.log(letters.join(' - '));

// for ..of
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const movement of movements) {
  if (movement > 0) {
    // console.log(`you deposited ${movement}`);
  } else {
    // console.log(`you withdrew ${Math.abs(movement)}`);
  }
}

// forEach

movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    // console.log(`movement ${i + 1}: you deposited ${movement}`);
  } else {
    // console.log(`movement ${i + 1} :you  withdrew ${Math.abs(movement)}`);
  }
});

// forEach with map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  // console.log(`${key} :${value}`);
});

// forEach with set

const currenciesUnique = new Set(['USD', 'EU', 'USD', 'GBP']);
// console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _v, map) {
  // console.log(`${value} :${value}`);
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored 
the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
 A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow 
copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or
 a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const j_array = [3, 5, 2, 12, 7];
const k_array = [4, 1, 15, 8, 3];

const checkDogs = function (arr1, arr2) {
  const j_dog = arr1.slice();
  const j_correct = j_dog.splice(1);
  j_correct.splice(-2);
  //console.log(j_correct);
  const totaldogs = j_correct.concat(arr2);
  totaldogs.forEach(function (value, index) {
    if (value >= 3) {
      // console.log(
      //   `dog nummber ${index + 1} is an adult , and is ${value}  years old`
      // );
    } else {
      // console.log(`dog nummber ${index + 1} is still a puppy`);
    }
  });
};

//console.log(checkDogs(j_array, k_array));

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages 
and calculate 
the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the 
following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old,
 humanAge = 2 * dogAge. If the dog is
 > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that 
  are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges
   how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (arrDog) {
  const humanAges = arrDog.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  const adults = humanAges.filter(adult => adult >= 18);
  const averages =
    adults.reduce((acc, age, index, arr) => acc + age, 0) / adults.length;
  return averages;
  // .map(function (arr) {
  //   if (arr <= 2) {
  //     return (humanAge = 2 * arr);
  //   } else if (arr > 2) {
  //     return (humanAge = 16 + arr * 4);
  //   }
  // }
  // )
  // .filter(age => age <= 18)
  // .reduce((val, acc) => val + acc, 0);
};
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

const calcAverageHumanAgeChain = ages =>
  ages
    .map(arr => (arr <= 2 ? arr * 2 : 16 + arr * 4))
    .filter(adult => adult >= 18)
    .reduce((acc, age, index, arr) => acc + age, 0) / arr.length;
const chainAge = calcAverageHumanAgeChain([5, 2, 4, 1, 15, 8, 3]);
// console.log(Math.abs(chainAge));
// chain methods
const euroToUSD = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * euroToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);

//console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, 
but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// findmethod
const firstWithdrawal = movements.find(mov => mov < 0);
//console.log(movements, firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
//console.log(account);

for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    //console.log(acc);
  }
}

// some and every
// console.log(movements.includes(-130));
const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// every
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

const deposit = mov => mov > 0;
// console.log(movements.every(deposit));

// flat/flatMap

const arrFlat = [[1, 2, 3], [3, 4, 5], 7, 8];
// console.log(arrFlat.flat());

const arrayDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrayDeep.flat(1));

const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

const totalMovements = accountMovements.flat();
// console.log(totalMovements);
const overallBalance = totalMovements.reduce((acc, val) => acc + val, 0);
// console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  // .flat()
  .reduce((acc, val) => acc + val, 0);
// console.log(overallBalance2);

// sort
const owner = ['jonas', 'gaya', 'ram'];
// console.log(owner.slice().sort());
// console.log(owner);
// console.log(movements.sort());

movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});

// array from
// console.log(new Array(1, 2, 3, 4));

const x = new Array(7);
x.fill(9, 3);
// console.log(x);
const b = new Array(1, 2, 3, 4, 5, 6);
b.fill(23, 4, 5);
// console.log(b);

const c = Array.from({ length: 7 }, () => 1);
// console.log(c);

const d = Array.from({ length: 6 }, (_, i) => i + 1);
// console.log(d);

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementUI);
  const movementUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementUI2);
});

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the
 object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. 
 (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little.
 HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who 
eat too little ('ownersEatTooLittle').


HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: 
current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the
 recommended portion.

*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);
// 2.
const dogS = dogs.find(dog => dog.owners.includes('Sarah'));
if (dogS.curFood > dogS.recFood) {
  console.log(`eating too much`);
}
console.log(dogS);

//3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!"
//and "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')} dog eats too much`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
