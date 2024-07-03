import React, {useState, useEffect} from 'react';
import './scss/App.scss'
import Tool from './Components/Tool';
import List from './Components/List';
import Load from './Components/Load';

export default function App() {
	const tool = Tool();
	// let [status, setStatus] = useState({
	// 	load: true,
	// 	error: null,
	// 	data: []
	// });
	let [status, setStatus] = useState({
		load: false,
		error: null,
		data: []
	});
	if (!status.load){
		try {
			Tool().request.get('return').then((data) => {
				console.log('data', data);
				setStatus({
					load: true,
					error: null,
					data: data
				})
			});
		}
		catch (error) {
			console.log(error);
			setStatus({
				load: true,
				error: error,
				data: []
			})
		}
	}
	console.log('status', status);	
	return (
		<div className="container">
			<List props={status}/>
		</div>
	);
}
