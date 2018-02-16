'use strict';

import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchPosts} from '../actions/action-posts';


export class App extends React.Component {
    constructor(props) {
        super(props);

        this.showPosts = this.showPosts.bind(this);
    }

    showPosts() {
        if (this.props.posts.isFetching === true) {
            return <div>Loading posts...</div>;
        } 
        else if (this.props.posts && this.props.posts.list) {
            const result = 
                this.props.posts.list.data
                .filter((item, index) => index < 25)
                .map(item => <div key={item.id}>({item.id}): {item.title}</div>);
    
            return (
                <div>
                    Posts (25 out of 100):
                    {result}
                </div>
            );
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <h1>React Redux Starter Application</h1>
                <br /><br />
                <button onClick={() => this.props.getPosts()}>Refresh Posts</button>
                <br /><br />
                {this.showPosts()}
                <br /><br />
            </div>
        );
    }
}

// Maps redux state store to this.props
// "state" parameter is the Redux state object
// "state.posts": "posts" maps to one of allReducers' key/value state properties
// "posts:" is mapped to the component's props, i.e., this.props.posts
function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

// Function to dispatch actions from this component 
// You can now post an action through this.props.getPosts(), or through store.dispatch() (Look at index.js for an example)
// fetchPosts is an action in action-posts.js
function matchDispatchToProps(dispatch) {
    return bindActionCreators({getPosts: fetchPosts}, dispatch);
}

// Connect both functions above to Redux
// It's important to "export default" the result of connect() so the component is properly hooked up
// In the top level index.js, here's what the import should look like: import App from './components/app.js'
export default connect(mapStateToProps, matchDispatchToProps)(App);

