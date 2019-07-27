import React from 'react'
import PropTypes from 'prop-types'

import './article.scss'

const article = props => {
    const { date, image, title, preamble } = props;
    return (
        <div className='article'>
            <div className='article-img'>
                <img src={image}/>
            </div>
            <div className='article-text'>
                <div>
                    <h2>{title}</h2>
                    <h4>{date}</h4>
                </div>
                <p>{preamble}</p>
            </div>
        </div>
    )
}

article.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    preamble: PropTypes.string.isRequired
}

export default article;