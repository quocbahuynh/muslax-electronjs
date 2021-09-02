// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


document
  .getElementsByClassName("apply")[0]
  .addEventListener("click", selectSound);

const checkBox = document.getElementsByName("sound");

function keepSelect() {
  const getValue = localStorage.getItem("xxx");
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].value === getValue) {
      checkBox[i].checked = true;
    }
  }
}
keepSelect();

function selectOnlyThis(id) {
  for (var i = 0; i < checkBox.length; i++) {
    document.getElementById("Check" + i).checked = false;
  }
  document.getElementById(id).checked = true;
}

function play(sound) {
  const audio = new Audio(`asstes/sounds/${sound}.mp3`);
  audio.play();
}

function selectSound() {
  for (let i = 0; i <= checkBox.length; i++) {
    if (checkBox[i].checked === true) {
      localStorage.clear();
      localStorage.setItem("xxx", checkBox[i].value);
      play(checkBox[i].value);
    }
  }
}

navigator.getBattery().then(function (battery) {
  function updateAllBatteryInfo() {
    updateChargeInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener("chargingchange", function () {
    updateChargeInfo();
  });
  function updateChargeInfo() {
    if (battery.charging) {
      const cat = localStorage.getItem("xxx");
      play(cat);
    }
  }
});

//UI

let flagPage = false;
document.querySelector(
  "body > div > div > div:nth-child(2) > div > div"
).style.display = "none";

// Home Page
document
  .querySelector(
    "body > div > div > div.tile.is-4.is-vertical.is-parent > div > aside > ul:nth-child(2) > li:nth-child(1)"
  )
  .addEventListener("click", selectHome);

function selectHome() {
  if (flagPage === true) {
    document.querySelector(
      "body > div > div > div:nth-child(2) > div > div"
    ).style.display = "none";

    document.querySelector(
      "body > div > div > div:nth-child(2) > div > nav"
    ).style.display = "block";

    flagPage = false;
  }
}

// Document Page
document
  .querySelector(
    "body > div > div > div.tile.is-4.is-vertical.is-parent > div > aside > ul:nth-child(4) > li:nth-child(1)"
  )
  .addEventListener("click", selectDocs);

function selectDocs() {
  if (flagPage === false) {
    document.querySelector(
      "body > div > div > div:nth-child(2) > div > div"
    ).style.display = "block";

    document.querySelector(
      "body > div > div > div:nth-child(2) > div > nav"
    ).style.display = "none";

    flagPage = true;
  }
}
