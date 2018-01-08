import React, { Component } from 'react';
import Header from './Header';

class App extends Component{

	componentDidMount(){
		console.log("App component Mount");
	}

	componentWillUnmount(){
		console.log("App component Unmount");
	}
	render() {
		return(
	    <div className="App">
	      <Header message="Hola desde component" />
	    </div>
		);
	}
}

export default App;
