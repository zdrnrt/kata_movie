import React from 'react';
import ReactDOM from 'react-dom/client';
let title = <h1>react title</h1>;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(title);

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTUwZTkzMmNlOTljM2VmNmI4NjZjMzQ4OTFkZjkyYiIsIm5iZiI6MTcxOTUwNjYyNi4xOTAwNjMsInN1YiI6IjY2N2Q4ZDJkNzM2YjNhYzY4ZGZlMWZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaQkSfuUxhTAXn3Mel8yBWR8xg3JiQF8GMdf1DgYj5w'
//   }
// };

// fetch('https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

class ApiService {
	_apiBase = 'https://swapi.dev/api';

	async request(url, options = {}) {
		const result = await fetch(`${this._apiBase}/${url}`, options);
		if (!result.ok) {
			throw new Error('request error ', url, result.status);
		}
		return await result.json();
	}

	async getAllPeople() {
		const response = await this.request(`people/`);
		return response.results;
	}

	async getPerson(id) {
		return await this.request(`people/${id}/`);
	}
}

const Api = new ApiService();

Api.getAllPeople().then((people) => {
	console.info('getAllPeople');
	for (let person of people) {
		console.log(person.name);
	}
});
Api.getPerson(2).then((response) => {
	console.log('getPerson');
	console.log(response);
});
