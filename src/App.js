import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './scss/App.scss';
import { Input } from 'antd';
import Tool from './Components/Tool';
import List from './Components/List';
import Tab from './Components/Tab';

export default function App() {
	const tool = new Tool();
	let [tabActive, updateTab] = useState(1);

	function changeTab(key) {
		updateTab(key);
	}

	let [request, changeRequest] = useState({
		query: null, //'return',
		page: 1,
	});
	function changeQuery(e) {
		changeRequest((request) => {
			return { ...request, query: e.target.value };
		});
	}
	function changePage(page) {
		changeRequest((request) => {
			return { ...request, page };
		});
	}
	console.log('request', request);

	let [status, changestatus] = useState({
		load: true,
		error: null,
		data: null,
	});

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

	function rate() {
		tool.getRate(state.request)
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

	if (tabActive == 1) {
		if (!state.status.load) {
			find();
		}
	} else {
		if (!state.status.load) {
			rate();
		}
	}

	return (
		<main className="container">
			<Tab active={tabActive} listener={changeTab} />
			{tabActive == 1 && (
				<Input value={request.query} placeholder="Type to search..." size="large" onChange={changeQuery} />
			)}
			<List request={request} status={status} listener={{ page: changePage }} />
		</main>
	);
}
