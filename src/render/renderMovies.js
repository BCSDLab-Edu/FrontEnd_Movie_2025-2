import { IMAGE_URL } from '../constants/url.js';
import { isMain } from '../constants/elements.js';
import { renderTitle, setRenderTitle } from '../constants/elements.js';

export function renderMovieList(movieList, mainContainer, value) {
  if(isMain && !renderTitle){
    const pageTitle = document.createElement('p');
    pageTitle.id = "page_title";
    pageTitle.textContent = "지금 인기있는 영화";
    mainContainer.appendChild(pageTitle);
    setRenderTitle(true);
  }
  else if(!isMain && !renderTitle){
    const pageTitle = document.createElement('p');
    pageTitle.id = "page_title";
    pageTitle.textContent = `"${value}" 검색 결과`;
    mainContainer.appendChild(pageTitle);
    setRenderTitle(true);
  }
  movieList.forEach((movie) => {
    const popularMovieContainer = document.createElement('div');
    popularMovieContainer.classList.add('popularMovie_container');


    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie_poster');
    moviePoster.src = IMAGE_URL + movie.poster_path;
    popularMovieContainer.appendChild(moviePoster);

    const movieName = document.createElement('a');
    movieName.classList.add('movie_name');
    movieName.innerText = movie.title;
    popularMovieContainer.appendChild(movieName);

    const rating_container = document.createElement('div');
    rating_container.classList.add('rating_container');

    const rating = document.createElement('span');
    rating.classList.add('rating');
    rating.innerText = (movie.vote_average).toFixed(1);

    const star = document.createElement('img');
    star.classList.add('star_icon');
    star.src = './src/assets/star.svg';

    rating_container.appendChild(rating);
    rating_container.appendChild(star);
    popularMovieContainer.appendChild(rating_container);

    mainContainer.appendChild(popularMovieContainer);
  });
}
