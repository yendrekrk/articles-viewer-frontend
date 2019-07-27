import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const monthTranslation = {
    januar: '01',
    februar: '02',	
    mars: '03',
    april: '04',
    mai: '05',
    juni: '06',
    juli: '07',
    august: '08',
    september: '09',
    oktober: '10',
    november: '11',
    desember: '12'
}

export const prepareArticle = article => {
    const {id, date, category} = article;
    let {image, title, preamble} = article;

    if (typeof id !== 'number' || typeof date !== 'string' || typeof category !== 'string') return;

    if (typeof image !== 'string') image = '';
    if (typeof title !== 'string') title = '';
    if (typeof preamble !== 'string') preamble = '';
    const dateArray = date.split(' ');
    const timestamp = dayjs(`${dateArray[0]}.${monthTranslation[dateArray[1]]}.${dateArray[2]}-12`, 'D.MM.YYYY-H').unix();

    return {
        id,
        date,
        timestamp,
        image,
        category,
        title,
        preamble
    }
}