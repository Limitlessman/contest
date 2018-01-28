import React from 'react';
//import { hydrate } from "react-dom"
import ReactDOM from 'react-dom';
import App from './components/App';


ReactDOM.hydrate(
	<App initialData={window.initialData}/>,
	document.getElementById("root")
);
