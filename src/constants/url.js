export const BASE_URL = 'https://api.themoviedb.org/3/';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
import { getPage } from "./elements";



export function getPopularBaseUrl(){
	const nowPage = getPage();
	return BASE_URL + "movie/popular?api_key="+import.meta.env.VITE_API_KEY + `&language=ko-KR&page=${nowPage}`;
}

