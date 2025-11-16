const homeLogo = document.querySelector("#homeLogo");
const searchUI = document.querySelector("#searchUI");
const searchInput = document.querySelector("#searchInput");
const listArea = document.querySelector("#listArea");
const posterURL = 'https://image.tmdb.org/t/p/w200';
const moreBtn = document.querySelector("#moreBtn");
const listInfo = document.querySelector("#listInfo");
let currentMode = 'popular';
let currentKeyword = null;

function goHome(){
  searchInput.value = '';
  listArea.innerHTML = '';
  listInfo.textContent = "지금 인기있는 영화"
  currentMode = 'popular';
  currentKeyword = null;
  makeList();
}

homeLogo.addEventListener('click', goHome);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWJhZTg5YTdjOTVjYjMxZDU1ZGQ5NzIzMWU5Mzk1OCIsIm5iZiI6MTc2Mjc2OTQyNy4wMDE5OTk5LCJzdWIiOiI2OTExYmExMjEyNjVjOWFmY2FkMjViMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Db4wo9N9EB-dEyDxkfvuHkl80Q_Jww8qrFlQq4rOJ8M'
  }
};

async function getPopular(page, index) {
  const cacheKey = `popularMovies_page_${page}`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    console.log(`Page ${page} 캐시 데이터 사용`);
    const res = JSON.parse(cachedData);
    if(res.total_results <= listArea.childElementCount){
      moreBtn.style.display = "none";
      return;
    }
    listUpdate(res.results[index]);
    return;
  }
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`, options)
  const res = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify(res));
  console.log(`Page ${page} API 호출 및 캐시 저장 완료`);
  listUpdate(res.results[index]);
}
async function getSearch(keyword, page, index) {
  const cacheKey = `${keyword}_page_${page}`;
  const cacheData = localStorage.getItem(cacheKey);
  if (cacheData) {
    console.log(`Page ${page} 캐시 데이터 사용`);
    const res = JSON.parse(cacheData);
    if(res.total_results <= listArea.childElementCount){
      moreBtn.style.display = "none";
      return;
    }
    listUpdate(res.results[index]);
    return;
  }
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}&include_adult=false&language=ko-KR&page=${page}`, options)
  const res = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify(res));
  console.log(`Page ${page} API 호출 및 캐시 저장 완료`);
  listUpdate(res.results[index]);
}
function listUpdate(movieData){
  if (!movieData) return;

  const movie = document.createElement("div");
  const poster = document.createElement("img");
  const title = document.createElement("p");
  const score = document.createElement("div");
  const star = document.createElement("img");
  poster.src = `${posterURL}${movieData.poster_path}`;
  poster.style.borderRadius = "20px";
  poster.style.width = "100%";
  title.textContent = `${movieData.title}`;
  title.style.color = "white";
  title.style.marginTop = "0";
  title.style.marginBottom = "10px";
  score.textContent = `${movieData.vote_average.toFixed(1)}`;
  score.style.color = "white";
  score.style.marginBottom = "20px";
  star.src = "./src/assets/star.svg";
  score.appendChild(star);
  movie.appendChild(poster);
  movie.appendChild(title);
  movie.appendChild(score);
  listArea.appendChild(movie);
  moreBtn.style.display = "block";
}

searchUI.addEventListener('submit', function(e){
  e.preventDefault();
  const searchKeyword = searchInput.value;
  listInfo.textContent = `"${searchKeyword}" 검색 결과`;
  listArea.innerHTML = '';

  localStorage.clear();

  currentMode = 'search';
  currentKeyword = searchKeyword;

  makeList();
  searchInput.value = '';
});

(function init(){
  currentMode = 'popular';
  currentKeyword = null;
  makeList();
})();

async function makeList(){
  for (let i = 0; i<8; i++){
    const index = listArea.childElementCount;
    if(currentMode === 'search' && currentKeyword){
      await getSearch(currentKeyword, Math.floor(index/20)+1, index%20);
    }
    else{await getPopular(Math.floor(index/20)+1, index%20)}
  }
}

moreBtn.addEventListener('click', makeList);