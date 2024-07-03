import React, { useEffect, useState } from 'react';

export default function Tool() {
	const request = {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTUwZTkzMmNlOTljM2VmNmI4NjZjMzQ4OTFkZjkyYiIsIm5iZiI6MTcxOTUwNjYyNi4xOTAwNjMsInN1YiI6IjY2N2Q4ZDJkNzM2YjNhYzY4ZGZlMWZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaQkSfuUxhTAXn3Mel8yBWR8xg3JiQF8GMdf1DgYj5w`,
		},
		get: async function (query) {
			const options = {
				headers: this.headers,
				method: 'GET',
			};

			return await fetch(
				`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
				options
			)
				.then(
					(response) => {
						if (response.ok) {
							return response.json();
						}
						throw new Error('request resolve', error);
					},
					(error) => {
						throw new Error('request reject', error);
					}
				)
				.catch((error) => {
					throw new Error('request error', error);
				});
		},
	};

	return { request };
}
