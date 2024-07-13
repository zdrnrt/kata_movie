import React from 'react';
import { Tabs } from 'antd';

export default function Tab(props) {
	const items = [
		{
			key: 1,
			label: 'Search',
		},
		{
			key: 2,
			label: 'Rated',
		},
	];
	return (
		<Tabs
			activeKey={props.active}
			items={items}
			centered={true}
			onChange={(key) => props.listener(key)}
			style={{ width: 'fit-content', margin: '0 auto' }}
		/>
	);
}
