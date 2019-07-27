import React from 'react'
import PropTypes from 'prop-types'

import './topic-filter.scss'

const topicFilter = props => {
    const { topics, handleTopicChange } = props;
    return (
        <div className='topic-filter'>
            <div>
                <h3>Topics:</h3>
                <label class="custom-checkbox">Fashion
                    <input name='fashion' type='checkbox' checked={topics.includes('fashion')} onChange={e => handleTopicChange(e)} />
                    <span class="checkmark" />
                </label>
                <label class="custom-checkbox">Sports
                    <input name='sports' type='checkbox' checked={topics.includes('sports')} onChange={e => handleTopicChange(e)} />
                    <span class="checkmark" />
                </label>
            </div>
        </div>
    )
}

topicFilter.propTypes = {
    topics: PropTypes.array.isRequired,
    handleTopicChange: PropTypes.func.isRequired
}

export default topicFilter;