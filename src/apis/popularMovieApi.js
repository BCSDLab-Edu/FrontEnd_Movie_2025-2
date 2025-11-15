import {getPopularBaseUrl} from '../constants/url.js';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjhjMzdhMmY0Mjc1YzNiMzFjNGU4MjhkNmY5MjAzZCIsIm5iZiI6MTc2Mjc2OTQ1MS45MDgsInN1YiI6IjY5MTFiYTJiZjJmN2UzYjFiNDg3NTM3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YB2DRvoEH8N6_0aOaAfb2SXife8O2Nhryxzo6V9tXZw'
  }
};
export async function popularMovieApi(){
  try {
    const res = await fetch(getPopularBaseUrl(), options);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}
