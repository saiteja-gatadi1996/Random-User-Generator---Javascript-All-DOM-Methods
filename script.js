const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// at start, we will get this randomUser func called for 3 times, so that we see three users
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  // console.log(data.results[0]);
  const { first, last } = data.results[0].name;
  const newUser = {
    name: `${first} ${last}`,
    money: Math.floor(Math.random() * 100000),
  };
  // console.log(newUser);
  addData(newUser);
}

// we are copying everything that is in the user that is nothing but name and money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  //everytime we change something, we have to call this func
  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  //everytime we change something, we have to call this func
  updateDOM();
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  //everytime we change something, we have to call this func
  updateDOM();
}

// Update DOM
// If we are not passing anything then we need to take the default value, that is why we are mentioning the = data
function updateDOM(providedData = data) {
  // Clear main div, taken from index.html main tag
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}


// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
