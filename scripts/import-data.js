import fetch from 'node-fetch';
import urlExist from 'url-exist';

async function import_stats (month, year, gen, format, elo_range) {
    let elo_num = '0';
    let selectValid = false;
    switch (elo_range) {
        case 'bottom':
            elo_num = '0';
            break;
        case 'low':
            elo_num = '1500';
            break;
        case 'mid':
            elo_num = '1630';
            break;
        case 'high':
            elo_num = '1700';
            break;
    }

    let url = `https://www.smogon.com/stats/${year}-${month}/chaos/gen${gen}${format}-${elo_num}.json`;


    let url_exists = await urlExist(url);

    if (url_exists) {       
        selectValid = true;
    } else {
        switch (elo_range) {
            case 'mid':
                elo_num = '1695';
                break;
            case 'high':
                elo_num = '1825';
                break;
        }
        url = `https://www.smogon.com/stats/${year}-${month}/chaos/gen${gen}${format}-${elo_num}.json`;
        url_exists = await urlExist(url);

        if (url_exists) {
            selectValid = true
        } else {
            return [false, {}];
        }
        
    }

    if (selectValid) {
        const response = await fetch(url, { method: "Get" });
        const data = await response.json();
        return [true, data];
    }
};


export default import_stats;
