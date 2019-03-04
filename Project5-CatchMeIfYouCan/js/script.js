let mapContent;
let map;
let markerPlace = false;
let nick;
let players = new Map()

setUserName();

// Pobiera lokalizację użytkownika i generuje mape
function initMap() {
  mapContent = {
    lat: -25.363,
    lng: 131.044
  };

  map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 8,
    center: mapContent,
    keyboardShortcuts: false
  })

  navigator.geolocation.getCurrentPosition(getUserLocation, getUserLocationFail);
  players.set('local', new google.maps.Marker({
    position: mapContent,
    map: map,
    draggable: true
  }))

  window.addEventListener("keydown", e => getUserPressedKey(e));
}

// Metoda do przestawiania wskaźnika
function getUserLocation(data) {
  const latlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude); 
  map.setCenter(latlng);
  players.get('local').setPosition(latlng);

  console.log("Wskaźnik ustawiony");

  markerPlace = true;
}

// Komunikat gdy nie uda się pobrać lokalizacji
function getUserLocationFail(err) {
  console.log(err);
  alert('Nie można pobrać Twojej lokacji, po prawej stronie paska URl, kliknij na ikone odnośnie śledzenia lokalizacji.')
}

// Metoda do przemieszczania znacznika użytkownika
function getUserPressedKey(e) {
  if (!markerPlace) return;
  let newLat;
  let newLng;

  if (e.target.tagName.toLowerCase() === "input") return;

  switch (e.key) {
    case "w":
      newLat = players.get('local').getPosition().lat() + 0.001;
      newLng = players.get('local').getPosition().lng();
      break;

    case "a":
      newLat = players.get('local').getPosition().lat();
      newLng = players.get('local').getPosition().lng() - 0.001;
      break;

    case "s":
      newLat = players.get('local').getPosition().lat() - 0.001;
      newLng = players.get('local').getPosition().lng();
      break;

    case "d":
      newLat = players.get('local').getPosition().lat();
      newLng = players.get('local').getPosition().lng() + 0.001;
      break;

    case "ArrowUp":
      newLat = players.get('local').getPosition().lat() + 0.001;
      newLng = players.get('local').getPosition().lng();
      break;

    case "ArrowLeft":
      newLat = players.get('local').getPosition().lat();
      newLng = players.get('local').getPosition().lng() - 0.001;
      break;

    case "ArrowDown":
      newLat = players.get('local').getPosition().lat() - 0.001;
      newLng = players.get('local').getPosition().lng();
      break;

    case "ArrowRight":
      newLat = players.get('local').getPosition().lat();
      newLng = players.get('local').getPosition().lng() + 0.001;
      break;

    default:
      return;
  }

  const latlng = new google.maps.LatLng(newLat, newLng);

  players.get('local').setPosition(latlng);

}

// Alert do pobrania nazwy użytkownika
//Potrzebne do Chat'u   TODO
function setUserName() {
  if (!nick) {
    nick = prompt("Wybierz swój nick:");
    if (!nick) {
      alert("Jeżeli nie podasz swojej nazwy nie bedziemy mogli się bawić!");
      setUserName();
    } else {
      console.log(`Wybrałeś nick: ${nick}`);
    }
  }
}

