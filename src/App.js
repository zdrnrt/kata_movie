import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './scss/App.scss';
import Tool from './Components/Tool';
import List from './Components/List';
import Load from './Components/Load';

export default function App() {
	const tool = new Tool();
	let [state, changeAppState] = useState({
		request: {
			query: null, //'return',
			page: 1,
		},
		status: {
			load: true,
			error: null,
			data: null,
		},
	});
	function changeQuery(query) {
		changeAppState((state) => {
			return { status: { load: false, error: null, data: null }, request: { ...state.request, query } };
		});
	}

	function changePage(page) {
		changeAppState((stastatetus) => {
			return { status: { load: false, error: null, data: null }, request: { ...state.request, page } };
		});
	}

	function findMovie() {
		tool.getMovie(state.request)
			.then((data) => {
				console.log('tool.getMovie', data);
				changeAppState((state) => {
					return { ...state, status: { load: true, error: null, data } };
				});
			})
			.catch((error) => {
				changeAppState((state) => {
					return { ...state, status: { load: true, error, data: null } };
				});
			});
	}

	let find = _.debounce(findMovie, 1000);

	if (!state.status.load) {
		find();
	}

	return (
		<div className="container">
			<List props={state} listener={{ query: changeQuery, page: changePage }} />
		</div>
	);
}
