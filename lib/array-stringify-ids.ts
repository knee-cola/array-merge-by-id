import { isArray } from 'lodash';

/**
 * Creates CSV containing values of all the keys ending with "ID"
 * @param data object or array to be converted to CSV
 * @description this function is to be used for debugging and error dumping
 */
const stringifyIDs = <T>(data:T|Array<T>):string => {
    
    if(isArray(data)) {
    // IF the provided value is Array
    // > do a recursive call to map all the elements
        return(`[${data.map(stringifyIDs).join(',')}]`);
    }

    var sReturn,
        sGlue = '';

    for(let key in data) {
        if(key.substr(key.length-2,2) === 'ID') {
            sReturn+=sGlue+key+':'+data[key];
            sGlue=', ';
        }
    }

    return(`{${sReturn}}`);
}

export default stringifyIDs;