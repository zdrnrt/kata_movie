import React from 'react';
import { Spin } from 'antd';

export default function Load() {
	return (
		<div style={{ flexBasis: '100%', padding: 30, textAlign: 'center' }}>
			<Spin size="large" />
		</div>
	);
}
