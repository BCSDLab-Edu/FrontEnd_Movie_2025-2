import { loadMovies } from "./render/loadMovies.js";
import { searchMovies } from "./apis/searchMovApi.js";
import { inputHandler } from "./events/inputHandler.js";
import { toMain } from "./events/toMain.js";

async function init(){
	await loadMovies();
	toMain();
	inputHandler(async (query)=>{
		const results = await searchMovies(query)
		await loadMovies(results, query);
	});
}
init();