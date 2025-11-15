import { popularMovieApi } from '../apis/popularMovieApi.js';
import { renderMovieList } from './renderMovies.js';
import { addMovies } from '../events/addMovies.js';
import { setIsMain, setIsBtn, isBtn, setRenderTitle } from '../constants/elements.js';

export const mainContainer = document.getElementById('main');
export let btnContainer = null;



export async function loadMovies(movies, query){
	if(!movies){
		movies = await popularMovieApi();
		renderMovieList(movies, mainContainer, query);
		if(!isBtn){
			const btnContainer = document.createElement('div');
			btnContainer.classList.add('btn_container');
			document.body.appendChild(btnContainer);
			const mainBtn = document.createElement('button');
			mainBtn.classList.add('plus_btn');
			mainBtn.textContent = '더 보기';
			btnContainer.appendChild(mainBtn);
			setIsBtn(true);

			addMovies();
		}
	}
	else{
		setIsBtn(true);
		setIsMain(false);
		setRenderTitle(false);
		mainContainer.innerHTML='';
		const oldBtn = document.querySelector('.plus_btn');
  	if (oldBtn) oldBtn.remove();
		if(movies.length === 0){

			const errContainer = document.createElement('div');
			errContainer.classList.add('err_container');
			mainContainer.appendChild(errContainer);

			const msg = document.createElement('p');
			msg.classList.add('no_result');
			msg.innerText = '검색 결과가 없습니다.';
			errContainer.appendChild(msg);
		}else{
			let showCount = 8;
			renderMovieList(movies.slice(0,showCount),mainContainer,query);
			if(movies.length>showCount){
				btnContainer = document.createElement('div');
				btnContainer.classList.add('btn_container');
				document.body.appendChild(btnContainer);
				const newBtn = document.createElement('button');
				newBtn.classList.add('plus_btn');
				newBtn.textContent = '더 보기';
				btnContainer.appendChild(newBtn);

				let currentCount = showCount;

				newBtn.addEventListener('click', ()=>{
					const nextMovies = movies.slice(currentCount, currentCount + showCount);
  				renderMovieList(nextMovies, mainContainer);
					currentCount += nextMovies.length;

					if(currentCount >= movies.length) {
    				newBtn.remove();
  				}

				})
			}

		}
	}
}
