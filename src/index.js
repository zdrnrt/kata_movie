import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ToolContext from './Components/Context';
import Tool from './Components/Tool';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ToolContext.Provider value={new Tool()}>
		<ToolContext.Consumer>
			{(tool) => {
				return <App tool={tool} />;
			}}
		</ToolContext.Consumer>
	</ToolContext.Provider>
);
