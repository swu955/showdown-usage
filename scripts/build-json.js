import fs from 'fs';
import dict_sort from './dict-sort.js';

function get_data (i_data, pokemon_name) {
    let  full_data = i_data['data'];
    let validName = false;

    for (let i in full_data) {
        let styleName = i.toLocaleLowerCase().replaceAll(" ", '').replaceAll("'", '').replaceAll("-", '');
        let stylePName = pokemon_name.toLocaleLowerCase().replaceAll(" ", '').replaceAll("'", '').replaceAll("-", '');
        if (styleName === stylePName) {
            pokemon_name = i;
            validName = true;
            break;
        }
    }

    if (!(validName)) {
        console.log(`Invalid Pokemon Name\n`);
        return [false];
    }

    let s_pkmn = full_data[pokemon_name];

    let data = {};

    const cats = ['Moves', 'Abilities', 'Teammates', 'Items', 'Spreads'];

    data['Name'] = pokemon_name;

    data['Usage'] = s_pkmn['usage'];
    console.log(full_data['Garchomp']['Moves']);

    for (let i in cats) {
        data[cats[i]] = dict_sort(s_pkmn[cats[i]]);
    }
    data['Raw Count'] = s_pkmn['Raw count'];
    delete data['Moves'][''];

    let data_p = {};
    let raw_count = data_p['Raw Count']
    Object.assign(data_p, data);
    for (let i in data) {
        if (cats.includes(i)) {
            for (let x in data_p[i]) {
                let k = data_p[i][x]*100;
                    data_p[i][x] = k/raw_count;
                
            }
        }
        if (i === 'Usage') {
            data_p[i] = data_p[i]*100;
        }
    }

    return [true, data, data_p];
}

export default get_data;