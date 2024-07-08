import React, { Component } from 'react';

export default class Tool extends Component {
	headers = {
		accept: 'application/json',
		Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTUwZTkzMmNlOTljM2VmNmI4NjZjMzQ4OTFkZjkyYiIsIm5iZiI6MTcxOTUwNjYyNi4xOTAwNjMsInN1YiI6IjY2N2Q4ZDJkNzM2YjNhYzY4ZGZlMWZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaQkSfuUxhTAXn3Mel8yBWR8xg3JiQF8GMdf1DgYj5w`,
	};

	componentDidMount() {}

	async findMovie(request) {
		const options = {
			headers: this.headers,
			method: 'GET',
		};
		console.log('Tool', request);
		// return new Promise( (request) => setTimeout( () => {request}, 500))

		return await fetch(
			// 	//&include_adult=false&language=en-US
			`https://api.themoviedb.org/3/search/movie?query=${request.query}&page=${request.page}`,
			options
		).then((response) => {
			console.log('tool findMovie', response);
			if (response.ok) {
				return response.json();
			}
			// throw new Error('request resolve', error);
		});
	}

	async guestCreate(request) {
		const options = {
			headers: this.headers,
			method: 'GET',
		};
		console.log('Tool', request);
		this.guestSession = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options).then(
			(response) => {
				console.log(response);
				if (response.ok) {
					response.json();
				}
			}
		);
		/*
		{
			"success": true,
			"guest_session_id": "9bb86a9807a9708204a76f20ef753139",
			"expires_at": "2024-07-05 17:57:27 UTC"
		}
		*/
	}

	async tokenCreate(request) {
		const options = {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${this.guestSession.guest_session_id}`, //???
			},
			method: 'GET',
		};
		console.log('Tool', request);
		this.guestSession = await fetch('https://api.themoviedb.org/3/authentication/token/new', options).then(
			(response) => {
				console.log(response);
				if (response.ok) {
					response.json();
				}
			}
		);
		/*
		{
			"success": true,
			"guest_session_id": "9bb86a9807a9708204a76f20ef753139",
			"expires_at": "2024-07-05 17:57:27 UTC"
		}
		*/
	}

	async getGenre(request) {
		const options = {
			headers: this.headers, // ??
			method: 'GET',
		};
		console.log('Tool', request);
		this.guestSession = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options).then(
			(response) => {
				if (response.ok) {
					response.json();
				}
			}
		);
		/*
		{
			"genres": [
				{
					"id": 28,
					"name": "Action"
				},
				{
					"id": 12,
					"name": "Adventure"
				},
				{
					"id": 16,
					"name": "Animation"
				}
			]
		}
		*/
	}

	async getRate(request) {
		const options = {
			headers: this.headers,
			method: 'GET',
		};
		console.log('Tool', request);
		// return new Promise( (request) => setTimeout( () => {request}, 500))

		return await fetch(
			// 	//&include_adult=false&language=en-US
			`https://api.themoviedb.org/3/search/movie?query=${request.query}&page=${request.page}`,
			options
		).then((response) => {
			console.log(response);
			if (response.ok) {
				return response.json();
			}
			// throw new Error('request resolve', error);
		});
	}
}

/*
export default function Tool() {
	const request = {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTUwZTkzMmNlOTljM2VmNmI4NjZjMzQ4OTFkZjkyYiIsIm5iZiI6MTcxOTUwNjYyNi4xOTAwNjMsInN1YiI6IjY2N2Q4ZDJkNzM2YjNhYzY4ZGZlMWZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaQkSfuUxhTAXn3Mel8yBWR8xg3JiQF8GMdf1DgYj5w`,
		},
		get: async function (request) {
			request = {
				query: request.query,
				page: request.page || 1
			}
			const options = {
				headers: this.headers,
				method: 'GET',
			};

			return await fetch(
				`https://api.themoviedb.org/3/search/movie?query=${request.query}&include_adult=false&language=en-US&page=${request.page}`,
				options
			)
				.then(
					(response) => {
						if (response.ok) {
							return response.json();
						}
						throw new Error('request resolve', error);
					},
					// (error) => {
					// 	throw new Error('request reject', error);
					// }
				)
				// .catch((error) => {
				// 	throw new Error('request error', error);
				// });
		},
	};

	return { request };
}
*/
