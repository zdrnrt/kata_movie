import React, { useState, useEffect } from 'react';
import './scss/App.scss';
import Tool from './Components/Tool';
import List from './Components/List';
import Load from './Components/Load';

export default function App() {
	const tool = new Tool();
	let [state, changeAppState] = useState({
		request: {
			query: null,//'return',
			page: 1
		},
		status: {
			load: true,
			error: null,
			data: null,
		}
	});
	function changeQuery(query){
		changeAppState((state) => { return {status: {load: false, error: null, data: null}, request: {...state.request,  query}} })
	}
	function changePage(page){
		changeAppState((stastatetus) => { return {status: {load: false, error: null, data: null}, request: {...state.request, page}} })
	}
	if (!state.status.load) {
		tool.getMovie(state.request)
			.then((data) => {
				console.log('tool.getMovie', data);
				changeAppState((state) => { return {...state, status: {load: true, error: null, data}} })
			})
			.catch( (error) => {
				changeAppState((state) => { return {...state, status: {load: true, error, data: null}} })
			})
	}
	console.log('state', state);
	return (
		<div className="container">
			<List props={state} listener={{query: changeQuery, page: changePage}}/>
		</div>
	);
}
