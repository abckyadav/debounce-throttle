const key = "bd11134c";

let movie_wait;

let movies_div = document.getElementById("searchDiv");
let content_div = document.getElementById("contentDiv");

async function searchMovie() {
  try {
    let query = document.getElementById("movie").value;
    if (query.length <= 2) {
      return false;
    }

    let response = await fetch(
      `https://www.omdbapi.com/?apikey=${key}&s=${query}`
    );

    let data = await response.json();
    let movies_arr = data.Search;
    console.log("movies_arr:", movies_arr);

    appendMovies(movies_arr);
  } catch (err) {
    console.log("err:", err);
  }
}

function appendMovies(movies) {
  movies_div.innerHTML = null;

  if (movies === undefined) {
    return false;
  }
  movies.forEach(function (el) {
    let p = document.createElement("p");
    p.innerText = el.Title;
    p.onclick = function () {
      display_movies(el);
    };

    movies_div.append(p);
  });
}

function display_movies(el) {
  content_div.innerHTML = null;
  movies_div.style.display = "none";

  let img_div = document.createElement("div");
  img_div.setAttribute("id", "img_div");

  let image = document.createElement("img");
  image.src = el.Poster;

  let text_div = document.createElement("div");
  text_div.setAttribute("id", "text_div");

  let title = document.createElement("p");
  title.innerText = el.Title;

  let type = document.createElement("p");
  type.innerText = el.Type;

  let year = document.createElement("p");
  year.innerText = el.Year;

  img_div.append(image);
  text_div.append(title, type, year);

  content_div.append(img_div, text_div);
}

//typing-speed optimization
function debounce(func, delay) {
  if (movie_wait) {
    //removing previous timeout
    clearTimeout(movie_wait);
  }

  movie_wait = setTimeout(function () {
    func(); //searchmovie() executes after 3 seconds
    movies_div.style.display = "block";
  }, delay);
}

/**Debouncing is a programming practice used to ensure that time-consuming
 *  tasks do not fire so often, that it stalls the performance of the web page.
 *  In other words, it limits the rate at which a function gets invoked. */

/**
 * Closures
A closure is the combination of a function bundled together (enclosed) with 
references to its surrounding state (the lexical environment). In other words,
 a closure gives you access to an outer function's scope from an inner function. 
 In JavaScript, 
closures are created every time a function is created, at function creation time.
 */
