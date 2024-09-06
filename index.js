var isNoWatermark = false;
var isBlocked = false;

function createIframe(url) {
  // Clear existing content
  document.body.innerHTML = '';

  // Create an iframe element
  var iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.position = "absolute";
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.overflow = "hidden";

  // Append the iframe to the body
  document.body.appendChild(iframe);
  document.body.appendChild(watermark);
  if (isNoWatermark) watermark.remove();
  pos = "tl";
}
document.querySelector("#search").onkeyup = search;

function search() {
  var games = document.querySelectorAll(".game-container");
  games.forEach((game) => {
    var firstSpan = game.querySelector('span');
    if (firstSpan && firstSpan.innerHTML.toLowerCase().includes(document.querySelector("#search").value.toLowerCase())) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  });
}

class Feature {
  constructor(srcc, img, name) {
    this.srcc = srcc;
    this.img = img;
    this.name = name;
  }
}

var feat = 0;

var fts = [
  new Feature("https://html-classic.itch.zone/html/8990635/index.html",
    "https://img.itch.zone/aW1nLzEzNzgyNzE0LnBuZw==/315x250%23c/%2B9oPzX.png", "PolyTrack"),
  new Feature("https://html-classic.itch.zone/html/7644089/Poker [WebGL]/index.html", "https://img.itch.zone/aW1nLzExNzE5MjQ5LnBuZw==/315x250%23c/K3v59v.png", "Poker"),
  new Feature("https://html-classic.itch.zone/html/2357437/index.html", "https://img.itch.zone/aW1nLzM2Mjc4ODAuanBlZw==/315x250%23c/nGpecF.jpeg", "BlackJack")
];

function gel(id) {
  return document.getElementById(id);
}

function changeFt(ft) {
  gel("ftimg").setAttribute("src", ft.img);
  gel("ftimg").setAttribute("alt", ft.name);
  gel("ftspan").innerHTML = ft.name;
  gel("ftspan").onclick = () => createIframe(ft.srcc);
}
changeFt(fts[feat]);

function scrollE(a) {
  feat += Number(a);
  if (feat > fts.length - 1) {
    feat = 0;
  }
  if (feat < 0) { feat = fts.length - 1; } changeFt(fts[feat]);
}

/* background effect */
function fillScreenWithCircles() {
  const margin = 5; // Margin in pixels
  const circleSize = 50; // Size of each circle in pixels
  const screenWidth = window.innerWidth - 2 * margin;
  const screenHeight = window.innerHeight - 2 * margin;
  const circleWidth = circleSize + 2 * margin; // Including margin
  const circleHeight = circleSize + 2 * margin; // Including margin

  // Calculate the number of circles that can fit in each dimension
  const numCirclesX = Math.floor(screenWidth / circleWidth) + 2;
  const numCirclesY = Math.floor(screenHeight / circleHeight) + 2;

  // Create and append the circles
  for (let i = 0; i < numCirclesX; i++) {
    for (let j = 0; j < numCirclesY; j++) {
      const circle = document.createElement('div');
      circle.className = 'circle';
      circle.style.left = `${i * circleWidth + margin}px`;
      circle.style.top = `${j * circleHeight + margin}px`;
      gel("circleHolder").appendChild(circle);
      circle.style.position = "fixed";
    }
  }
}

function scaleCircles(event) {
  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle => {
    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2));
    const scale = Math.max(0.1, 1.25 - distance / 100); // Adjust the divisor to control the scaling effect
    circle.style.transform = `scale(${scale})`;
  });
}

// Call the function to fill the screen with circles
fillScreenWithCircles();

const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
  const scale = 0.1
  circle.style.transform = `scale(${scale})`;
});
// Add event listener for mouse movement
document.addEventListener('mousemove', scaleCircles);
/* blocker */
var list = [
];
function rndFour() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var strr = "";
  for (var i = 0; i < 4; i++) {
    let rnd = Math.floor(Math.random() * chars.length);
    strr += chars[rnd];
  }
  return strr;
}
function setUniqueDeviceCookie() { let e = getCookie("__b__"); e || setCookie("__b__", e = rndFour(), 365); } function getCookie(e) { let t = document.cookie.split(";"); for (let i = 0; i < t.length; i++) { let o = t[i].split("="); if (e == o[0].trim()) return decodeURIComponent(o[1]) } return null } function setCookie(e, t, i) { let o = ""; if (i) { let n = new Date; n.setTime(n.getTime() + 864e5 * i), o = "; expires=" + n.toUTCString() } document.cookie = e + "=" + encodeURIComponent(t) + o + "; path=/" } setUniqueDeviceCookie();
function checkCode() {

  /* Start of all the Fethces */
  if (list.includes(getCookie("__b__"))) { console.log("stop"); window.close(); }
  var rawFileUrl = 'https://raw.githubusercontent.com/ChunkyMonkey00/KylesCollection/main/blocked.txt';
  fetch(rawFileUrl)
    .then(response => response.text())
    .then(text => {
      const lines = text.split('\n');
      const filteredLines = lines.filter(line => line.trim() !== '');
      console.log(filteredLines);
      if (filteredLines.includes(getCookie("__b__"))) { isBlocked = true; if (isBlocked) clearPageAndConsole(); }
    })
    .catch(error => console.error('Error fetching the file:', error));

  rawFileUrl = 'https://raw.githubusercontent.com/ChunkyMonkey00/KylesCollection/main/noWatermark.txt';
  fetch(rawFileUrl)
    .then(response => response.text())
    .then(text => {
      const lines = text.split('\n');
      const filteredLines = lines.filter(line => line.trim() !== '');
      console.log(filteredLines);
      if (filteredLines.includes(getCookie("__b__"))) {
        isNoWatermark = true; if (isNoWatermark && watermark != null) watermark.remove();
      }
    })
    .catch(error => console.error('Error fetching the file:', error));

  function clearPageAndConsole() {
    // Remove all child nodes of the document
    while (document.firstChild) {
      document.removeChild(document.firstChild);
    }

    // Clear all stylesheets
    for (let i = document.styleSheets.length - 1; i >= 0; i--) {
      document.styleSheets[i].disabled = true;
    }

    // Clear all scripts
    for (let i = document.scripts.length - 1; i >= 0; i--) {
      document.scripts[i].remove();
    }

    // Clear the console
    console.clear();
  }
}
var inPopup = false;
var pendingPopups = [];

function displayTip(text) {
  if (inPopup) {
    pendingPopups.push(text);
    return;
  }

  if (pendingPopups.includes(text)) pendingPopups.splice(pendingPopups.indexOf(text), 1);

  // Create a div element for the popup
  var popup = document.createElement('div');
  popup.className = 'popup';

  // Apply styles for the popup
  popup.style.position = 'fixed';
  popup.style.top = '0';
  popup.style.left = '0';
  popup.style.width = '100%';
  popup.style.height = '100%';
  popup.style.background = 'rgba(20, 20, 20, 0.7)'; // Slightly transparent gray background
  popup.style.display = 'flex';
  popup.style.justifyContent = 'center';
  popup.style.alignItems = 'center';
  popup.style.zIndex = "9";

  // Create a message element for the popup
  var message = document.createElement('div');
  message.textContent = text;
  message.style.paddingTop = "20px";
  message.style.paddingBottom = "20px";
  message.style.width = "60%";
  message.style.height = "150px";
  message.style.borderRadius = '10px';
  message.style.background = 'rgb(21, 21, 21)'; // Light gray background
  message.style.color = 'white'; // Dark gray text
  message.style.textAlign = 'center';
  message.style.border = '2px solid #4CAF50'; // Green border
  message.style.fontWeight = 'bold'; // Bold font
  message.style.fontSize = '21px'; // Larger font size
  message.style.display = 'flex';
  message.style.justifyContent = 'center';
  message.style.alignItems = 'center';

  // Create a button
  var button = document.createElement('button');
  button.textContent = 'Close';
  button.style.padding = '10px 20px';
  button.style.borderRadius = '20px';
  button.style.background = 'rgb(255, 60, 60)'; // Smooth red with a white tint
  button.style.color = 'white'; // White text
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.top = "0";
  button.style.right = "0";
  button.style.position = "absolute";
  button.style.zIndex = String(9 ** 4);

  // Append the button to the message
  document.body.appendChild(button);

  // Append the message to the popup
  popup.appendChild(message);

  // Append the popup to the body
  document.body.appendChild(popup);

  document.body.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      popup.remove();
      popup = null;
      button.remove();
      button = null;

      inPopup = false;
      if (pendingPopups.length > 0) {
        displayTip(pendingPopups[0]);
      }
    }
  });
  button.onclick = () => { popup.remove(); popup = null; button.remove(); button = null; }
}
checkCode();

var watermark = document.createElement("span");
watermark.style.fontSize = "65px";
watermark.style.backgroundColor = "rgba(31, 31, 31, 0.2)";
watermark.style.color = "rgba(231, 150, 150, 0.3)";
watermark.style.fontWeight = "bold";
watermark.style.position = "fixed";
watermark.style.zIndex = 999999;
watermark.style.top = "0";
watermark.style.left = "0";
watermark.innerHTML = getCookie("__b__");
watermark.id = "_wh"
document.body.appendChild(watermark);
if (isNoWatermark) watermark.remove();
var pos = "tl";
function switchPos() {
  var wh = gel("_wh");

  wh.style.right = "";
  wh.style.bottom = "";
  wh.style.left = "";
  wh.style.top = "";
  console.log(pos);
  if (pos == "tl") {
    wh.style.right = "0";
    pos = "tr";
  } else if (pos == "tr") {
    wh.style.bottom = "0";
    wh.style.right = "0";
    pos = "br";
  } else if (pos == "br") {
    wh.style.left = "0";
    wh.style.bottom = "0";
    pos = "bl";
  } else if (pos == "bl") {
    wh.style.top = "0";
    pos = "tl";
  }
}

watermark.onclick = switchPos;

// lazy fix to the images not doing anything

const gameContainers = document.querySelectorAll('.game-container');

// Iterate over each game container
gameContainers.forEach(container => {
  // Get the image and span elements within the container
  const image = container.querySelector('img');
  const span = container.querySelector('span');

  // Add click event listener to the image
  image.addEventListener('click', function () {
    // Get the URL from the span element and call createIframe function
    const url = span.getAttribute('onclick').match(/'([^']+)'/)[1];
    createIframe(url);
  });
});


/* favorites */
var onFavs = false;

const favBtn = gel('switchView');
favBtn.onclick = switchViews;

function switchViews() {
  if(onFavs) {
    /* switch to not favs */
    document.querySelector("h1").innerHTML = "The Collection";
    document.querySelector(".featured-section").style.display = "block";
    favBtn.innerHTML = "Favorites ★";
    var games = document.querySelectorAll(".game-container");
    games.forEach((game) => {
      game.style.display = "block";
    });
  } else {
    /* switch to favs */
    document.querySelector("h1").innerHTML = "Favorites";
    document.querySelector(".featured-section").style.display = "none";
    favBtn.innerHTML = "Default ☰";
    var games = document.querySelectorAll(".game-container");
    games.forEach((game) => {
      if (game.classList.contains("favorite")) {
        game.style.display = "block";
      } else {
        game.style.display = "none";
      }
    });
  }

  onFavs = !onFavs;
}

/* get favs */
function getFavs() {
  const favsJSON = localStorage.getItem('favs');

  if (!favsJSON) {
    const initialFavs = [];
    localStorage.setItem('favs', JSON.stringify(initialFavs));
    return initialFavs;
  }

  return JSON.parse(favsJSON);
}

var favs = getFavs();

function setFavs(favsArray) {
  const lowercaseFavsArray = favsArray.map(t => t.toLowerCase());
  const favsJSON = JSON.stringify(lowercaseFavsArray);
  localStorage.setItem('favs', favsJSON);
}

function populateFavs() {
  var c = document.querySelectorAll("span");
  c.forEach((g) => {
    if(favs.includes(g.innerHTML.toLowerCase())) {
      g.parentElement.classList.add("favorite");
    } else {
      g.parentElement.classList.remove("favorite");
    }
  });
}
populateFavs();

function handleRightClick(event) {
  if(event.target.id.substr(0, 2) == "ft" || event.target.classList.contains("featured-section")) return;
  event.preventDefault();

  let favItem;

  if (event.target.tagName === 'DIV') {
    favItem = event.target.querySelector('span').innerHTML.toLowerCase();
  } else if (event.target.tagName === 'IMG') {
    const parentElement = event.target.parentElement;
    favItem = parentElement.querySelector('span').innerHTML.toLowerCase();
  } else if (event.target.tagName === 'SPAN') {
    favItem = event.target.innerHTML.toLowerCase();
  }

  if (!favs.includes(favItem)) {
    favs.push(favItem);
  } else {
    favs.splice(favs.indexOf(favItem), 1);
  }

  console.log(favs);

  setFavs(favs);
  populateFavs();
}

gameContainers.forEach(s => {
  s.addEventListener('contextmenu', handleRightClick);
});

document.body.addEventListener('contextmenu', (e) => {e.preventDefault();});


/* Changelog */

if (!localStorage.getItem("logDisplayed")) displayTip("Tip: right click to favorite a game!");
localStorage.setItem("logDisplayed", true);

if (!localStorage.getItem("log1Displayed")) displayTip("PolyTrack has been fixed!");
localStorage.setItem("log1Displayed", true);
