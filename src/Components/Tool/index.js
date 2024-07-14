import React, { Component } from 'react';

export default class Tool extends Component {
	key =
		'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTUwZTkzMmNlOTljM2VmNmI4NjZjMzQ4OTFkZjkyYiIsIm5iZiI6MTcxOTUwNjYyNi4xOTAwNjMsInN1YiI6IjY2N2Q4ZDJkNzM2YjNhYzY4ZGZlMWZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaQkSfuUxhTAXn3Mel8yBWR8xg3JiQF8GMdf1DgYj5w';
	// key = '2e50e932ce99c3ef6b866c34891df92b';
	base = 'https://api.themoviedb.org/3';
	headers = {
		'Content-Type': 'application/json;charset=utf-8',
		accept: 'application/json',
		Authorization: `Bearer ${this.key}`,
	};

	constructor(props) {
		super(props);
		//this.guestSession = 'f03a15e8ae0703a754ce63cf56beaf94';
		console.log(!!window.localStorage.getItem('movie_app') && JSON.parse(window.localStorage.getItem('movie_app')));
		if (!!window.localStorage.getItem('movie_app') && JSON.parse(window.localStorage.getItem('movie_app'))) {
			let local = JSON.parse(window.localStorage.getItem('movie_app'));
			console.log(local);
			console.log(Date.now() - new Date(Number(local.date)) < 3600000);
			if (Date.now() - new Date(Number(local.date)) < 3600000) {
				this.guestSession = local.session;
				localStorage.setItem('movie_app', `{"date": "${Date.now()}", "session": "${this.guestSession}"}`);
				return this;
			}
		}
		this.guestCreate().then((data) => {
			this.guestSession = data.guest_session_id;
			localStorage.setItem('movie_app', `{"date": ${Date.now()}, "session": "${data.guest_session_id}"}`);
			return data.guest_session_id;
		});
	}

	componentDidMount() {}

	async findMovie(request) {
		const options = {
			headers: this.headers,
			method: 'GET',
		};
		return await fetch(`${this.base}/search/movie?query=${request.query}&page=${request.page}`, options).then(
			(response) => {
				if (response.ok) {
					return response.json();
				}
			}
		);
	}

	async nowPlay(request) {
		const options = {
			headers: this.headers,
			method: 'GET',
		};
		return await fetch(
			// `${this.base}/movie/now_playing?language=ru-RU&page=${request.page}`,
			`${this.base}/movie/now_playing?language=en-US&page=${request.page}`,
			options
		).then((response) => {
			if (response.ok) {
				return response.json();
			}
		});
	}

	async guestCreate() {
		const options = {
			headers: this.headers,
			method: 'GET',
		};
		return await fetch(`${this.base}/authentication/guest_session/new`, options).then((response) => {
			if (response.ok) {
				return response.json();
			}
		});
	}

	async getGenre() {
		const options = {
			headers: this.headers, // ??
			method: 'GET',
		};
		return await fetch(
			// `${this.base}/genre/movie/list?language=ru`,
			`${this.base}/genre/movie/list?language=en`,
			options
		).then((response) => {
			if (response.ok) {
				return response.json();
			}
		});
	}

	async getRate(request) {
		const options = {
			headers: this.headers,
			method: 'GET',
		};
		return await fetch(
			// `${this.base}/guest_session/${this.guestSession}/rated/movies?language=ru-RU&page=${request.page}&sort_by=created_at.asc`,
			`${this.base}/guest_session/${this.guestSession}/rated/movies?language=en-US&page=${request.page}&sort_by=created_at.asc`,
			options
		).then((response) => {
			if (response.ok) {
				return response.json();
			}
		});
	}

	async postRate(request) {
		const options = {
			headers: this.headers,
			method: 'POST',
			body: JSON.stringify({ value: request.value }),
		};
		return await fetch(
			`${this.base}/movie/${request.id}/rating?guest_session_id=${this.guestSession}`,
			options
		).then((response) => {
			if (response.ok) {
				return response.json();
			}
		});
	}
}
/*
guest
{
    "success": true,
    "guest_session_id": "f03a15e8ae0703a754ce63cf56beaf94",
    "expires_at": "2024-07-14 15:04:44 UTC"
}
id 
	1022789

post rate
	const options = {
	method: 'POST',
	headers: {
		accept: 'application/json',
		'Content-Type': 'application/json;charset=utf-8',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTUwZTkzMmNlOTljM2VmNmI4NjZjMzQ4OTFkZjkyYiIsIm5iZiI6MTcyMDg4Mjg4NS4zMTUwMjIsInN1YiI6IjY2N2Q4ZDJkNzM2YjNhYzY4ZGZlMWZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dP090nX-lDIkw_SQ4pblSFCkNXX3NXhna_2YmR-A_KQ'
	},
	body: '{"value":10}'
	};

	fetch('https://api.themoviedb.org/3/movie/1022789/rating?guest_session_id=f03a15e8ae0703a754ce63cf56beaf94', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

get rate
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTUwZTkzMmNlOTljM2VmNmI4NjZjMzQ4OTFkZjkyYiIsIm5iZiI6MTcyMDg4Mjg4NS4zMTUwMjIsInN1YiI6IjY2N2Q4ZDJkNzM2YjNhYzY4ZGZlMWZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dP090nX-lDIkw_SQ4pblSFCkNXX3NXhna_2YmR-A_KQ'
		}
	};

	fetch('https://api.themoviedb.org/3/guest_session/f03a15e8ae0703a754ce63cf56beaf94/rated/movies?language=en-US&page=1&sort_by=created_at.asc', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

*/
