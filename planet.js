let planetName;
let climate;
let surfaceWater;
let diameter;
let rotationPeriod;
let terrain;
let gravity;
let orbitalPeriod;
let population;
let filmsDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  planetName = document.querySelector("h1#name");
  climate = document.querySelector("span#climate");
  surfaceWater = document.querySelector("span#surface_water");
  diameter = document.querySelector("span#diameter");
  rotationPeriod = document.querySelector("span#rotation_period");
  terrain = document.querySelector("span#terrain");
  gravity = document.querySelector("span#gravity");
  orbitalPeriod = document.querySelector("span#orbital_period");
  population = document.querySelector("span#population");
  filmsUl = document.querySelector("#films>ul");
  charactersUl = document.querySelector("#characters>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    planet.films = await fetchFilms(planet);
    planet.characters = await fetchCharacters(planet);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planet/${id}`;
  return await fetch(planetUrl).then((res) => res.json());
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planet/${planet?.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planet/${planet?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  planetName.textContent = planet?.name;
  climate.textContent = planet?.climate;
  surfaceWater.textContent = planet?.surface_water;
  diameter.textContent = planet?.diameter;
  rotationPeriod.textContent = planet?.rotation_period;
  terrain.textContent = planet?.terrain;
  gravity.textContent = planet?.gravity;
  orbitalPeriod.textContent = planet?.orbital_period;
  population.textContent = planet?.population;
  const filmsLis = planet?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsUl.innerHTML = filmsLis.join("");
  const charactersList = planet?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  charactersUl.innerHTML = charactersList.join("");
};
