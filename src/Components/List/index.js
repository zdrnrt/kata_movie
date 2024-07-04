import React from 'react';
import { Typography, Row, Alert, Pagination, Input } from 'antd';
const { Paragraph } = Typography;
import Tile from '../Tile';
import Load from '../Load';

export default function List(props) {
	console.log('List', props.props);

	const request = props.props.request;
	const status = props.props.status;
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
		<div style={{ padding: '20px 0' }}>
			<Input
				value={request.query}
				placeholder="Type to search..."
				size="large"
				onChange={(event) => props.listener.query(event.target.value)}
			/>
			{!!result && (
				<Row gutter={[36, 36]} align="stretch" style={{ padding: '34px 0' }}>
					{result}
				</Row>
			)}
			{pagination}
		</div>
	);
}
