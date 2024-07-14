import React, { Component } from 'react';
import { Typography, Row, Alert, Pagination } from 'antd';
const { Paragraph } = Typography;
import Tile from '../Tile';
import Load from '../Load';

export default class List extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const request = this.props.request;
		const status = this.props.status;
		const rated = this.props.rated;
		let result = null;
		let pagination = null;

		console.log('List', request, status, rated);

		if (status.load) {
			if (!!status.error) {
				result = (
					<Alert
						showIcon={true}
						message="Ошибка загрузки"
						description="Во время работы приложения, произошла ошибка приложения. Проверить ваше интернет соединение и попробуйте обновить страницу."
						type="error"
					/>
				);
			}

			if (!!status.data && status.data?.total_results > 0) {
				result = status.data.results.map((movie) => {
					// movie.rating = movie.rating || rated.find( (el) => el.id == movie.id ).value;
					let rating = rated.find((el) => el.id == movie.id);
					if (rating) {
						movie.rating = rating.value;
					}
					return (
						<Tile
							genre={this.props.genre}
							key={movie.id}
							props={movie}
							listener={this.props.listener.rate}
						/>
					);
				});
				pagination = (
					<Pagination
						style={{ maxWidth: 'fit-content', margin: '0 auto' }}
						hideOnSinglePage={true}
						showSizeChanger={false}
						showQuickJumper={false}
						current={status.data.page}
						total={status.data.total_pages}
						pageSize={5}
						pageSizeOptions={[5, 10]}
						onChange={(page) => this.props.listener.page(page)}
					/>
				);
			}

			if (!!request.query && status.data?.total_results == 0) {
				result = <Paragraph>{'Ничего не найдено'}</Paragraph>;
			}

			if (!request.query && !status.data) {
				result = <Paragraph>{'Ничего не найдено'}</Paragraph>;
			}
		} else {
			result = <Load />;
		}

		return (
			<div>
				{!!result && (
					<Row gutter={[36, 36]} align="stretch" style={{ padding: '34px 0' }}>
						{result}
					</Row>
				)}
				{pagination}
			</div>
		);
	}
}

/*
export default function List(props) {

	const request = props.request;
	const status = props.status;
	let result = null;
	let pagination = null;

	if (!status.load && !!request.query) {
		result = <Load />;
	}

	if (status.load) {
		if (!!status.error) {
			result = (
				<Alert
					showIcon={true}
					message="Ошибка загрузки"
					description="Во время работы приложения, произошла ошибка приложения. Проверить ваше интернет соединение и попробуйте обновить страницу."
					type="error"
				/>
			);
		}

		if (!!status.data && status.data?.total_results > 0) {
			result = status.data.results.map((movie) => <Tile key={movie.id} props={movie} />);
			pagination = (
				<Pagination
					style={{ maxWidth: 'fit-content', margin: [0, 'auto'] }}
					hideOnSinglePage={true}
					showSizeChanger={false}
					showQuickJumper={false}
					current={status.data.page}
					total={status.data.total_pages}
					pageSize={5}
					pageSizeOptions={[5, 10]}
					onChange={(page) => props.listener.page(page)}
				/>
			);
		}

		if (!!request.query && status.data?.total_results == 0) {
			result = <Paragraph>{'Ничего не найдено'}</Paragraph>;
		}
	}

	return (
		<div>
			{!!result && (
				<Row gutter={[36, 36]} align="stretch" style={{ padding: '34px 0' }}>
					{result}
				</Row>
			)}
			{pagination}
		</div>
	);
}
*/
