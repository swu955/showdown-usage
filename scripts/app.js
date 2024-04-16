import import_stats from './import-data.js';
import get_data from './build-json.js';
import fs from 'fs';
import path from 'path';
import promptSync from 'prompt-sync';
const prompt = promptSync();

const __dirname = path.resolve();
const configs = fs.readFileSync(`${__dirname.substring(0, __dirname.length - 7)}config.ini`, 'utf-8');
let options = configs.split(',');
let input = '';

while (true) {
    console.log(
    `Current selection:
    month: ${options[0]}
    year: ${options[1]}
    gen: ${options[2]}
    format: ${options[3]}
    elorange: ${options[4]} (bottom, low, mid, high)
Enter "change (category) (value)" to change selection. (Ex. change elo high)
Else enter the name of a Pokemon
Enter "close" to exit`)

    input = prompt('');
    if (input === 'close') {
        break;
    }

    let command = input.split(' ');
    console.log(command[0].toLocaleLowerCase())
    let hasInput = false;
    let data = []; 

    if (command[0].toLocaleLowerCase() === 'change') {
        let choice = command[2].toLocaleLowerCase();
        switch (command[1].toLocaleLowerCase()) {
            case 'month':
                options[0] = choice.padStart(2, '0');
                break;
            case 'year':
                options[1] = choice;
                break;
            case 'gen':
                options[2] = choice;
                break;
            case 'format':
                options[3] = choice;
                break;
            case 'elo range':
                switch (command[2].toLocaleLowerCase()) {
                    case 'bottom':
                        options[4] = choice;
                        break;
                    case 'low':
                        options[4] = choice;
                        break;
                    case 'mid':
                        options[4] = choice;
                        break;
                    case 'high':
                        options[4] = choice;
                        break;
                }
        }
        console.log(`Change successful\n`);

        fs.writeFileSync(`${__dirname.substring(0, __dirname.length - 7)}config.ini`, options.join(','))
    } else {
        hasInput = true;
        data = await import_stats(options[0], options[1], options[2], options[3], options[4]);
    }
    if (hasInput) {
        if (data[0]) {
            let r = get_data(data[1], input);

            const export_dir = `${__dirname.replaceAll('scripts', 'results')}\\${options[1]}-${options[0]}-gen${options[2]}${options[3]}-${options[4]}-${input}-`

            if (r[0]) {
                fs.writeFileSync(`${export_dir}-raw.json`, JSON.stringify(r[1]));
                fs.writeFileSync(`${export_dir}-p.json`, JSON.stringify(r[2]));
                
                console.log(`Done. Results saved in the results folder.\n`);
            }
        } else {
            console.log(`Invalid selection\n`);
        }
    }
}





