import { isArray } from 'lodash';

/**
 * Creates CSV containing values of all the keys ending with "ID". It's usefull for debugging
 * 
 * @param {Object} data object or array to be converted to CSV
 * @returns {string} CSV of key values
 * 
 * @example
 * let obj = { cityID: 11, streetID: 22, streetName: 'Elm Street' };
 * 
 * let result = stringifyIDs(obj);
 * 
 * console.log(result); // will print "cityID:11,streetID:22"
 */
const stringifyIDs = <T>(data:T|Array<T>):string => {
    
    if(isArray(data)) {
    // IF the provided value is Array
    // > do a recursive call to map all the elements
        return(`[${data.map(stringifyIDs).join(',')}]`);
    }

    var sReturn:string = "",
        sGlue:string = '';

    for(let key in data) {
        if(key.substr(key.length-2,2) === 'ID') {
            sReturn+=sGlue+key+':'+data[key];
            sGlue=', ';
        }
    }

    return(`{${sReturn}}`);
}

export default stringifyIDs;