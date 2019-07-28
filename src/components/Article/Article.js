import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate'

import './article.scss'

const article = props => {
    const [displayImg, setDisplayImg] = useState(true);
    const { date, image, title, preamble } = props;

    return (
        <div className='article'>
            {
                displayImg && (
                    <div className='article-img'>
                        <img src={image} onError={() => setDisplayImg(false)} />
                    </div>
                )
            }
            <div className={`article-text ${displayImg ? '' : 'no-img-padding'}`} >
                <div className='article-lead'>
                    <h2>{title}</h2>
                    <h4>{date}</h4>
                </div>
                <div className='article-preamble'>
                    <Truncate lines={2} trimWhitespace={true}>{preamble}</Truncate>
                </div>
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