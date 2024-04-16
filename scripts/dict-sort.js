//script to sort dictionaries by value

function dict_sort(data) {
    var items = Object.keys(data).map(
        (key) => { return [key, data[key]] });

    items.sort(
        (first, second) => { return second[1] - first[1] }
        );

    
    let sorted_data = {};

    for (let i in items) {
        let k = items[i];
        sorted_data[k[0]] = k[1];
        }      

    return sorted_data;
}

export default dict_sort;
