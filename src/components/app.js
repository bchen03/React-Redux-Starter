'use strict';

import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchPosts, getPosts} from '../actions/action-posts';
import {changeTitleColor} from '../actions/action-title';
import {changePaymentType} from '../actions/action-payments';

import {postsSelector, top25PostsSelector} from '../selectors/selector-posts';

import {titleSelector} from '../selectors/selector-title';
import {paymentTypeSelector} from '../selectors/selector-payments';

import {MessageHoc, ColorHoc, PaymentView} from './recompose';
import {spreadTests} from './es6';
import {lodashTests} from './lodash';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            top25Posts: false
//            paymentType: "CASH"
        }

        this.getAllPosts = this.getAllPosts.bind(this);
        this.getTop25Posts = this.getTop25Posts.bind(this);
        this.setPayment = this.setPayment.bind(this);

        spreadTests();
        lodashTests();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate currentProps", this.props, 
                    ", nextProps: ", nextProps, 
                    ", currentState: ", this.state, 
                    ", nextState: ", nextState);
        return true;        
    }

    showPosts(posts) {
        console.log("showPosts posts: ", posts);

        if (posts.isFetching === true) {
            return <div>Loading posts...</div>;
        } 
        else if (posts.list && posts.list.data) {
            return (
                <div>
                    Posts:
                    { posts.list.data.map(item => <div key={item.id}>({item.id}): {item.title}</div>) }
                </div>
            );
        }   
        else if (posts.error) {
            return <div style={{ color: "red" }}>An error occurred: { posts.error }</div>;
        }
        else {
            return null;
        }
    }

    getAllPosts() {
        this.props.getPosts();
        this.setState({ top25Posts: false }); 
    }

    getTop25Posts() {
        this.props.getPosts();
        this.setState({ top25Posts: true }); 
    }

    setPayment(paymentType) {
        this.props.changePaymentType(paymentType);
    }

    render() {
        return (
            <div>
                <h1  style={{color: this.props.title.color}}>React Redux Starter Application</h1>
                <p /><p />
                MessageHoc using recompose mapProps: <MessageHoc text="Hello World" />
                <p /><p />
                ColorHoc using recompose withState: <ColorHoc />
                <p /><p />
                PaymentView using recompose compose/branch/renderComponent:
                <button onClick={() => this.setPayment("CASH")}>Cash</button>&nbsp;&nbsp;
                <button onClick={() => this.setPayment("VISA")}>VISA</button>&nbsp;&nbsp;
                <button onClick={() => this.setPayment("MASTERCARD")}>MasterCard</button>&nbsp;&nbsp;
                <PaymentView paymentType={this.props.paymentType} />
                <p /><p />
                Change Title Color using Redux action:
                <button onClick={() => this.props.changeTitleColor("red")}>Red title</button>&nbsp;&nbsp;
                <button onClick={() => this.props.changeTitleColor("yellow")}>Yellow title</button>&nbsp;&nbsp;
                <button onClick={() => this.props.changeTitleColor("magenta")}>Magenta title</button>&nbsp;&nbsp;
                <p /><p />
                Get All/Top 25 Posts using Redux action and selectors:
                <button onClick={this.getAllPosts}>Show All Posts</button>&nbsp;&nbsp;
                <button onClick={this.getTop25Posts}>Show Top 25 Posts</button>&nbsp;&nbsp;
                <p /><p />
                { this.state.top25Posts ? this.showPosts(this.props.top25Posts) : this.showPosts(this.props.posts) }
                <p /><p />
            </div>
        );
    }
}

// Maps Redux state store to this.props
// For posts: allPostsSelector(state):
//  posts: component can access slice of store data through props, i.e., this.props.posts
//  allPostsSelector(): selector function that returns a slice of store data for use in component
function mapStateToProps(state, props) {
    console.log("mapStateToProps state: ", state, ", props: ", props);
    return {
        posts: postsSelector(state),      
        top25Posts: top25PostsSelector(state),
        title: titleSelector(state),
        paymentType: paymentTypeSelector(state)
    };
}

// Function to dispatch actions from this component 
// You can now post an action through this.props.getPosts(), or through store.dispatch() (Look at index.js for an example)
// fetchPosts is an action in action-posts.js
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //getPosts: fetchPosts,
        getPosts, 
        changeTitleColor,
        changePaymentType
    }, 
    dispatch);
}

// Connect both functions above to Redux
// It's important to "export default" the result of connect() so the component is properly hooked up
// In the top level index.js, here's what the import should look like: import App from './components/app.js'
export default connect(mapStateToProps, mapDispatchToProps)(App);


