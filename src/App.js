import React, { Component } from 'react';
import _ from 'lodash';
import './scss/App.scss';
import { Input } from 'antd';

import List from './Components/List';
import Tab from './Components/Tab';

export default class App extends Component {
	constructor(props) {
		super(props);
		this._tool = props.tool;
		this._tool
			.getGenre()
			.then((response) => {
				this.genre = response.genres;
			})
			.catch((error) => {
				this.setState((data) => {
					return { ...data, status: { ...data.status, load: true, error: error } };
				});
			})
			.then(() => {
				this.nowPlay();
			});
	}

	state = {
		tab: 1,
		request: {
			query: null,
			page: 1,
		},
		status: {
			load: false,
			error: null,
			data: null,
		},
	};

	componentDidMount() {
		console.log('componentDidMount');
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	changeTab = (key) => {
		this.setState((data) => {
			return { ...data, tab: key, status: { load: false, error: null, data: null } };
		});
	};

	changeQuery = (e) => {
		this.setState((data) => {
			return {
				status: { ...data.status, data: null, load: false },
				request: { query: e.target.value ? e.target.value : null, page: 1 },
			};
		});
	};

	changePage = (page) => {
		this.setState((data) => {
			return {
				status: { ...data.status, load: false },
				request: { ...data.request, page: page },
			};
		});
	};

	nowPlay = () => {
		this._tool
			.nowPlay(this.state.request)
			.then((response) => {
				this.setState((data) => {
					return { ...data, status: { load: true, error: null, data: response } };
				});
				console.log('App nowPlay', response, this.state);
			})
			.catch((error) => {
				this.setState((data) => {
					return { ...data, status: { ...data.status, load: true, error: error } };
				});
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

	getRate = () => {
		console.log('App getRate');
		this._tool
			.getRate(this.state.request)
			.then((response) => {
				console.log('App getRate', response);
				this.setState((data) => {
					return { ...data, status: { load: true, error: null, data: !!response ? response : null } };
				});
			})
			.catch((error) => {
				this.setState((data) => {
					return { ...data, status: { ...data.status, load: true, error: error } };
				});
			});
	};

	render() {
		let find = _.debounce(this.findMovie, 1000);
		console.log('state', this.state, this.state.tab == 1);
		if (this.state.tab == 1) {
			console.log('!this.state.status.load', !this.state.status.load);
			if (!this.state.status.load) {
				console.log('!this.state.request.query', !!this.state.request.query);
				if (!!this.state.request.query) {
					find();
				} else {
					this.nowPlay();
				}
			} else {
			}

			if (!this.state.status.load && !!this.state.request.query) {
				// find();
			} else if (!this.state.status.load) {
				// console.log('!this.state.status.load && !!this.state.request.query', (!this.state.status.load && !!this.state.request.query))
				// console.log('this.state.status.load this.state.request.query', this.state.status.load, this.state.request.query)
				// this.nowPlay();
			}
		} else {
			if (!this.state.status.load) {
				this.getRate();
			}
		}

		return (
			<main className="container">
				<Tab className="tab" active={this.state.tab} listener={this.changeTab} />
				{this.state.tab == 1 && (
					<Input
						value={this.state.request.query}
						placeholder="Type to search..."
						size="large"
						onChange={this.changeQuery}
					/>
				)}
				<List
					genre={this.genre}
					request={this.state.request}
					status={this.state.status}
					listener={{ page: this.changePage }}
				/>
			</main>
		);
	}
}
