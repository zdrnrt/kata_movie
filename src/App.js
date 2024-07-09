import React, { Component } from 'react';
import _ from 'lodash';
import './scss/App.scss';
import { Input } from 'antd';
import ToolContext from './Components/Context';
import Tool from './Components/Tool';
import List from './Components/List';
import Tab from './Components/Tab';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		tab: 1,
		request: {
			query: null,
			page: 1,
		},
		status: {
			load: true,
			error: null,
			data: null,
		},
	};

	componentDidMount() {}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	_tool = new Tool();

	changeTab = (key) => {
		console.log('changeTab', key);
		this.setState((data) => {
			return { ...data, tab: key };
		});
	};

	changeQuery = (e) => {
		this.setState((data) => {
			return { status: { ...data.status, load: false }, request: { ...data.request, query: e.target.value } };
		});
	};

	changePage = (page) => {
		this.setState((data) => {
			return { ...data, request: { ...data.request, page: page } };
		});
	};

	findMovie = () => {
		this._tool
			.findMovie(this.state.request)
			.then((response) => {
				console.log('App findMovie', response);
				this.setState((data) => {
					return { ...data, status: { load: true, error: null, data: response } };
				});
			})
			.catch((error) => {
				this.setState((data) => {
					return { ...data, status: { ...data.status, load: true, error: error } };
				});
			});
	};

	render() {
		// this.tool.getGenre()
		// 	.then( (data) => {console.log('getGenre', data)} )

		let find = _.debounce(this.findMovie, 1000);

		if (this.state.tab == 1) {
			if (!this.state.status.load) {
				find();
			}
		} else {
			if (!this.state.status.load) {
				// rate();
			}
		}

		return (
			<ToolContext.Provider value={new Tool()}>
				<main className="container">
					<Tab active={this.state.tab} listener={this.changeTab} />
					<ToolContext.Consumer>
						{(tool) => {
							return (
								<Input
									value={this.state.request.query}
									placeholder="Type to search..."
									size="large"
									onChange={this.changeQuery}
								/>
							);
						}}
					</ToolContext.Consumer>
					<List request={this.state.request} status={this.state.status} />
					{/* listener={{ page: changePage }}  */}
				</main>
			</ToolContext.Provider>
		);
	}
}

/*
export default function App() {
	const tool = new Tool();
	let [tabActive, updateTab] = useState(1);

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
*/
