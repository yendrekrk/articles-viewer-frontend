import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { prepareArticle } from '../../utils'

import Article from '../Article/Article'

import ArrowDown from '../../assets/icons/arrow-down.svg'

import './articles-list.scss'

const articlesList = props => {
    const [order, setOrder] = useState('desc');
    const { articles } = props;

    const handleOrderChange = () => {
        order === 'asc' ? setOrder('desc') : setOrder('asc')
    }

    const preparedArticles = articles.map(art => prepareArticle(art));
    preparedArticles.sort((a, b) => {
        if (order === 'asc') {
            return a.timestamp - b.timestamp
        } else {
            return b.timestamp - a.timestamp
        }
    })

    return (
        <Fragment>
            <div className='articles-list-header' >
                <div onClick={handleOrderChange}>
                    Sort by date
                    <ArrowDown style={{
                        transform: (order === 'asc') ? 'rotate(0deg)' : 'rotate(-180deg)',
                        transition: 'transform 200ms',
                    }} />
                </div>
            </div>
            <div className='articles-list'>
                {preparedArticles.map(article => <Article key={article.id} {...article} />)}
            </div>
        </Fragment>

    )
}

articlesList.propTypes = {
    articles: PropTypes.array.isRequired
}

export default articlesList;

