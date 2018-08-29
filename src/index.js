import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import todoReducers from './Reducers';
import App from './App';
import TodoItem from './TodoItem';

const store = createStore(
	todoReducers,     
	applyMiddleware(thunk)
	)
const AppRoutes = () => {
	return (
		<div>
			<Route exact path='/' component={App}/>
			<Route path={`/todo/:topicId`} component={TodoItem}/>
		</div>
		)
	}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	</BrowserRouter>, 
	document.getElementById('root')
);
