let tbody = document.getElementById("tbody");
let closeBtn = document.getElementById("closeBtn");
const form = document.getElementById("myForm");
let openModal = document.getElementById("openModal");
let totalPrice = document.getElementById("totalPrice");
let pageId = document.getElementById("pageId");
let nightMode = document.getElementById("nightMode");
let body = document.getElementById("body");
let totalPriceColor = document.getElementById("totalPriceColor");
let currentItm = -1;
let searchVal = "";
let x = [
  {
    name: "Sirlik Lavash",
    price: 100,
    prepTime: 10,
    readyTime: "9:25",
    counter: 1
  },
  {
    name: "Mag'orlik Lavash",
    price: 200,
    prepTime: 20,
    readyTime: "10:23",
    counter: 1
  },
  {
    name: "Sutlik Lavash",
    price: 300,
    prepTime: 30,
    readyTime: "11:25",
    counter: 1
  }
];
let lavashs = localStorage.getItem("lavashs")===null? x :JSON.parse(localStorage.getItem("lavashs"));
function handleCheck(e){
  let x = e.target.checked;
  if(x){
    body.style.backgroundColor = "black"
    totalPriceColor.style.color = "white"
  }else {
    body.style.backgroundColor = ""
    totalPriceColor.style.color = ""
  }
}

function SaveToLocal(lavashsP){
  let x = JSON.stringify(lavashsP)
  localStorage.setItem("lavashs",x)
  Draw();
}


function Increase(index) {
  lavashs[index].counter++;
  CalcPrice();
  SaveToLocal(lavashs);
  Draw();
}

function Decrease(index) {
  if (lavashs[index].counter > 1) {
    lavashs[index].counter--;
  }
  CalcPrice();
  SaveToLocal(lavashs); 
  Draw();
}

function Del(index) {
  lavashs.splice(index, 1);
  SaveToLocal(lavashs);
  Draw();
}

function Save(e) {
  let obj = {
    name: e.target[0].value,
    price: e.target[1].value,
    prepTime: e.target[2].value,
    readyTime: e.target[3].value,
    counter: 1,
  };
  let x = localStorage.getItem("currentItm")==null?currentItm:localStorage.getItem("currentItm");
  if (x != -1) {
    lavashs[x] = obj;
    localStorage.setItem("currentItm",-1);
  } else {
    lavashs.push(obj);    
  }
  SaveToLocal(lavashs);
  Draw();
  form.reset();
  closeBtn.click();
}
function Edite(index) {
  form[0].value = lavashs[index].name;
  form[1].value = lavashs[index].price;
  form[2].value = lavashs[index].prepTime;
  form[3].value = lavashs[index].readyTime;
  currentItm = index;
  localStorage.setItem("currentItm",currentItm);
  SaveToLocal(lavashs);
  Draw();
}
function CalcPrice() {
  let s = 0;
  for (let i = 0; i < lavashs.length; i++) {
    s += lavashs[i].price * lavashs[i].counter;
  }
  SaveToLocal(lavashs);
  Draw();
  totalPrice.innerText = s + "$";
}

CalcPrice();

function SearchVal(e) {
  searchVal = e.target.value;
  Draw();
  SaveToLocal(lavashs);
}

function Draw() {
  let s = "";
  if (searchVal=="") {
    lavashs.map((item, index) => {
      return (s += `
      <tr>
      <td>${item.name}</td>
      <td>${item.price}$</td>
      <td>${item.prepTime}</td>
      <td>${item.readyTime}</td>
      <td>
      <div class="d-flex align-items-center gap-1">
        <button onClick="Increase(${index})" class="btn btn-success">+</button>
        <span style="font-size: large;">${item.counter}</span>
        <button onClick="Decrease(${index})"class="btn btn-danger">-</button>
      </div>
      </td>
      <td>
      <button onClick="Del(${index})" type="button" class="btn btn-warning" data-mdb-ripple-init>Delete</button>
          </td>
      <td>
      <button onClick="Edite(${index})" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#exampleModal" data-mdb-ripple-init type="button" class="btn btn-primary" data-mdb-ripple-init>Edit</button>
          </td>
      </tr>
      `);
    });
    tbody.innerHTML = s;
  } else {
    lavashs
      .filter((item1) => item1.name.toUpperCase().includes(searchVal.toUpperCase()))
      .map((item, index) => {
        return (s += `
      <tr>
      <td>${item.name}</td>
      <td>${item.price}$</td>
      <td>${item.prepTime}</td>
      <td>${item.readyTime}</td>
      <td>
      <div class="d-flex align-items-center gap-1">
        <button onClick="Increase(${index})" class="btn btn-success">+</button>
        <span style="font-size: large;">${item.counter}</span>
        <button onClick="Decrease(${index})"class="btn btn-danger">-</button>
      </div>
      </td>
      <td>
      <button onClick="Del(${index})" type="button" class="btn btn-warning" data-mdb-ripple-init>Delete</button>
          </td>
      <td>
      <button onClick="Edite(${index})" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#exampleModal" data-mdb-ripple-init type="button" class="btn btn-primary" data-mdb-ripple-init>Edit</button>
          </td>
      </tr>
      `);
      });
    tbody.innerHTML = s;
  }
}
Draw();
