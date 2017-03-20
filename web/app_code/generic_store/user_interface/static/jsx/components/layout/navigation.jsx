"use strict";
import React from "react";
import { IndexLink, Link } from "react-router";

export default class Navigation extends React.Component {

	isActiveClass(path) {
		let routing = this.props.routing;
		return path === routing.locationBeforeTransitions.pathname;
	}

	toggleCollapse() {
		let NavigationState = this.props.NavigationState;
		this.props.actions.toggleCollapse(NavigationState.collapsed);
	}

	render() {
		let navigations = this.props.AppConstantState.navigation;
		let collapsed = this.props.NavigationState.collapsed;
		//make sure states does not change
		navigations = [].concat(navigations); 
		//bind functions to use for events
		this.toggleCollapse = this.toggleCollapse.bind(this);

		navigations.sort((a, b) =>{
			return a.id - b.id;
		});
		let navMenus = navigations.map((element, index) => {
			let path = element.constant_code === "home" ? '/' : `/${element.constant_code}`;
			let imageUrl = `static/images/nav-menu/${element.constant_code}.jpg`;
			let active = this.isActiveClass(path);
			if(element.constant_code === "home") {
				return (
					<li key={`li${index}`} onClick={this.toggleCollapse}>
						<IndexLink key={`link${index}`} to={path}>
							<img key={`img${index}`} class="img-responsive" src={imageUrl}  alt="" />
							<div class={active ? 'active' : ''}>
								{element.constant_value}
							</div>
						</IndexLink>
					</li>
				);
			}
			else{
				return (
					<li key={`li${index}`} onClick={this.toggleCollapse}>
						<Link key={`link${index}`} to={path}>
							<img key={`img${index}`} class="img-responsive" src={imageUrl} alt="" />
							<div class={active ? 'active' : ''}>
								{element.constant_value}
							</div>
						</Link>
					</li>
				);
			}
		});

		let navHeight = {
			maxHeight: collapsed ? "0px" : "500px"
		};

		return (
			<div class="row">
				<div class="col-md-4 col-sm-5">
				</div>
				<div class="col-md-8 col-sm-7">
					<div class="navbar navbar-default navbar-right" role="navigation">
						<div class="container-fluid">
							<div class="navbar-header">
								<button type="button" class="navbar-toggle" onClick={this.toggleCollapse}>
									<span class="sr-only">Toggle navigation</span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
								</button>
							</div>
							<div class="navbar-collapse nav-animate" style={navHeight} >
								<ul class="nav navbar-nav">
									{navMenus}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}