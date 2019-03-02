import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/index'
ReactDOM.render(<Home initCount={10} />,document.querySelector('#root'));
