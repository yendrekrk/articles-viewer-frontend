import React, { Component } from 'react'
import axios from 'axios'

import TopicFilter from './components/TopicFilter/TopicFilter'
import ArticlesList from './components/ArticlesList/ArticlesList'
import LogoIcon from './assets/icons/logo.svg'

import './app.scss'

const MAX_RETRIES = 2;
const baseURL = 'http://localhost:6010/articles';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sending: false,
            error: false,
            retries: 0,
            topics: ['fashion'],
            articles: []
        }
    }

    componentDidMount() {
        this.setState({ sending: true }, this.getArticles())
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.topics.length !== this.state.topics.length) {
            this.setState({ sending: true }, this.getArticles());
        }
    }

    getArticles = () => {
        const { topics } = this.state;

        axios.all(topics.map(topic => axios.get(`${baseURL}/${topic}`)))
            .then(responses => {
                let articles = [];
                responses.forEach(singleResponse => {
                    articles = articles.concat(singleResponse.data.articles)
                })
                return this.setState({
                    sending: false,
                    error: false,
                    retries: 0,
                    articles: articles,
                })
            })
            .catch(error => {
                const { retries } = this.state;
                if (retries < MAX_RETRIES) {
                    return setTimeout(this.setState({ retries: retries + 1 }, this.getArticles()),
                        (2 ** retries) * 100)
                } else {
                    return this.setState({ sending: false, error: true })
                }
                // if (error.response) {
                //     if (error.response.status === 404) {
                //         return this.setState({ sending: false, error: true })
                //     } else if (error.response.status === 500) {
                //         const { retries } = this.state;
                //         if (retries < MAX_RETRIES) {
                //             return setTimeout(this.setState({ retries: retries + 1 }, this.getArticles()),
                //                 Math.pow(2, retries) * 100)
                //         } else {
                //             return this.setState({ sending: false, error: true })
                //         }
                //     }
                // } else if (error.request) {
                //     console.log('Request error', error.request);
                // } else {
                //     // Something happened in setting up the request that triggered an Error
                //     console.log('Error', error.message);
                // }
            })
    }

    handleTopicChange = (event) => {
        const { name } = event.target;
        const topics = [...this.state.topics];

        if (topics.includes(name)) {
            topics.filter(el => el !== name).length !== 0 ?
                this.setState({
                    topics: topics.filter(el => el !== name)
                }) : null
        } else {
            topics.push(name)
            this.setState({
                topics: topics
            })
        }
    }

    render() {
        const { sending, error, topics, articles } = this.state;
        return (
            <div className='app-container'>
                <header>
                    <LogoIcon/>
                    <h1>Article Viewer</h1>
                </header>
                <TopicFilter topics={topics} handleTopicChange={this.handleTopicChange} />
                <ArticlesList articles={articles} />
            </div>
        )
    }
}

export default App;