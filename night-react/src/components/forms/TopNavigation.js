import React from 'react';

const TopNavigation = ({ logging }) => {
	return (
	<div className="ui secondary pointing menu">
		<a href="/" className="item">
			<div id='test2'>
			<i className="icon cocktail" />BarGuide
			</div>
		</a>
		<div className="right menu">
			<div className="item">{logging}</div>
		</div>
	</div>
	)}


export default TopNavigation;


