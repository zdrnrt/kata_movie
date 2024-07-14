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
				this.getRate();
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
		rated: [],
	};

	componentDidMount() {
		// console.log('componentDidMount');
	}

	componentWillUnmount() {
		// console.log('componentWillUnmount');
	}

	changeTab = (key) => {
		this.setState((data) => {
			return { ...data, tab: key, status: { ...data.status, load: false, error: null, data: null } };
		});
	};

	changeQuery = (e) => {
		this.setState((data) => {
			return {
				...data,
				status: { ...data.status, data: null, load: false },
				request: { query: e.target.value ? e.target.value : null, page: 1 },
			};
		});
	};

	changePage = (page) => {
		this.setState((data) => {
			return {
				...data,
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
					return { ...data, status: { ...data.status, load: true, data: response } };
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
		this._tool
			.getRate(this.state.request)
			.then((response) => {
				let ratedList = [];
				for (let item of response.results) {
					ratedList.push({ id: item.id, value: item.rating });
				}

				this.setState((data) => {
					return {
						...data,
						status:
							data.tab == 1
								? data.status
								: { load: true, error: null, data: !!response ? response : null },
						rated: ratedList,
					};
				});
			})
			.catch((error) => {
				this.setState((data) => {
					return { ...data, status: { ...data.status, load: true, error: error } };
				});
			});
	};

	postRate = (request) => {
		console.log('App postRate', request);
		this._tool
			.postRate(request)
			.then((response) => {
				let ratedList = this.state.rated;
				let ratedItem = ratedList.find((el) => el.id == request.id);
				if (ratedItem) {
					ratedItem.value = request.value;
				}

				this.setState((data) => {
					return { ...data, rated: ratedList };
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
			if (!this.state.status.load) {
				if (!!this.state.request.query) {
					find();
				} else {
					this.nowPlay();
				}
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
					rated={this.state.rated}
					listener={{ page: this.changePage, rate: this.postRate }}
				/>
			</main>
		);
	}
}
