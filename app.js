let today = [];
let history = JSON.parse(localStorage.getItem("history") || "[]");

function go(n) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById("page"+n).classList.remove("hidden");
}

function createAccount() {
  let user = {
    name: name.value,
    id: "BB-" + Math.floor(Math.random()*100000)
  };
  localStorage.setItem("user", JSON.stringify(user));
  loadUser();
  go(2);
}

function loadUser() {
  let u = JSON.parse(localStorage.getItem("user"));
  if (!u) return;
  userInfo.innerText = u.name + " | ID: " + u.id;
}
loadUser();
if (localStorage.getItem("user")) go(2);

function addExpense() {
  if (!type.value || !amount.value) return;
  today.push({ type: type.value, amount: Number(amount.value) });
  render();
  type.value = "";
  amount.value = "";
}

function render() {
  list.innerHTML = "";
  today.forEach(e => {
    list.innerHTML += `<li>${e.type} - ${e.amount} MMK</li>`;
  });
}

function goSummary() {
  go(4);
}

function saveDay() {
  let total = today.reduce((a,b)=>a+b.amount,0);
  let day = {
    date: new Date().toLocaleString(),
    items: today,
    total,
    receipt: "R-" + Date.now()
  };
  history.push(day);
  localStorage.setItem("history", JSON.stringify(history));
  today = [];
  list.innerHTML = "";
  go(2);
}

function printReceipt() {
  window.print();
}

function go(n) {
  if (n === 4) showReceipt();
  if (n === 5) showHistory();
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById("page"+n).classList.remove("hidden");
}

function showReceipt() {
  let u = JSON.parse(localStorage.getItem("user"));
  receiptInfo.innerText =
    `User: ${u.name}\nDate: ${new Date().toLocaleString()}`;
  summary.innerHTML = "";
  let total = 0;
  today.forEach(e => {
    summary.innerHTML += `<li>${e.type}: ${e.amount} MMK</li>`;
    total += e.amount;
  });
  document.getElementById("total").innerText = total;
}

function showHistory() {
  history.innerHTML = "";
  let box = document.getElementById("history");
  box.innerHTML = "";
  history.forEach(h => {
    box.innerHTML += `
      <div class="card">
        <b>${h.receipt}</b><br>
        ${h.date}<br>
        Total: ${h.total} MMK
      </div>
    `;
  });
}


