let nameH1;
let filmsDiv;
let planetDiv;
let producer;
let director;
let releaseDate;
let episodeID;
let openingCrawl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  producer = document.querySelector("span#producer");
  director = document.querySelector("span#director");
  releaseDate = document.querySelector("span#release_date");
  episodeID = document.querySelector("span#episode_id");
  openingCrawl = document.querySelector("span#opening_crawl");
  planetUl = document.querySelector("#planets>ul");
  characterUl = document.querySelector("#characters>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
  console.log(id.title);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.planets = await fetchPlanets(film);
    film.characters = await fetchCharacters(film);
    console.log(film.planets.name);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planet = await fetch(url).then((res) => res.json());
  localStorage.setItem("Planets", JSON.stringify(planet));
  console.log("Data fetched and stored in local storage:", planet);

  return planet;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

const renderFilm = (film) => {
  const savedData = JSON.parse(localStorage.getItem("Planets"));
  document.title = `SWAPI - ${film?.title}`; // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  producer.textContent = film?.producer;
  director.textContent = film?.director;
  releaseDate.textContent = film?.release_date;
  episodeID.textContent = film?.episode_id;
  openingCrawl.textContent = film?.opening_crawl;
  if (savedData) {
    //   const planetLis = film?.planets?.map(
    //   (planets) =>
    //     `<li><a href="/planet.html?id=${planets.id}">${planets.name}</li>`
    // );
    // planetUl.innerHTML = planetLis.join("");
    // const ul = document.createElement("ul");

    savedData.forEach((item) => {
      const planetLis = film?.planets?.map(
        (planets) =>
          `<li><a href="/planet.html?id=${planets.id}">${planets.name}</li>`
      );
      planetUl.innerHTML = planetLis.join("");
    });

    // listContainer.appendChild(ul);
  } else {
    planetLis.textContent = "No data found";
  }
  // }

  const characterLis = film?.characters?.map(
    (characters) =>
      `<li><a href="/character.html?id=${characters.id}">${characters.name}</li>`
  );
  characterUl.innerHTML = characterLis.join("");
};
const renderCharacters = (characters) => {
  const divs = characters.map((characters) => {
    const el = document.createElement("div");
    el.addEventListener("click", () => goToCharacterPage(film.id));
    el.textContent = characters.name;
    return el;
  });
  charactersList.replaceChildren(...divs);
  console.log(characters);
};

const goToPlanetPage = (id) => (window.location = `/Planets.html?id=${id}`);
