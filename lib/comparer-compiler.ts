
import {isFunction, isArray} from 'lodash';
import { CompareBy, ComparerFn } from './lib-types';

// cached comparer functions
const _comparer_cache:{ [key:string]:ComparerFn; } = {};

/**
 * Compiles and returns a function which compares two data elements and detects which comes before which in an orderd list.
 * The compiled function expects the compared values to be numeric
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [CompareBy](#compareby))
 * @returns {Function} compiled function
 * @example
 * // function for an ASCENDING order
 * let ascFn = compileC('cityID','streetID');
 * 
 * // will return 0
 * ascFn({cityID:1, streetID:1}, {cityID:1, streetID:1});
 * 
 * // will return 1
 * ascFn({cityID:1, streetID:1}, {cityID:1, streetID:2});
 * 
 * // will return -1
 * ascFn({cityID:2, streetID:1}, {cityID:1, streetID:2});
 * 
 * // function for an DESCENDING order
 * let descFn = compileC('cityID:desc','streetID:desc');
 * 
 * // will return 0
 * descFn({cityID:1, streetID:1}, {cityID:1, streetID:1});
 * 
 * // will return -1
 * descFn({cityID:1, streetID:1}, {cityID:1, streetID:2});
 * 
 * // will return 1
 * descFn({cityID:2, streetID:1}, {cityID:1, streetID:2});
 */
const compileC = (...key_columns:(string|CompareBy)[]):ComparerFn => {

    let firstEl = key_columns[0];

    if(key_columns.length === 1) {

        // making life easier for other functions
        // which accept key array OR pre-compiled
        // comparer function ... they don't need
        // to check what was passed - we do it here
        if(isFunction(firstEl)) {
        // IF the first element is a function
        // > return it right away
            return(firstEl);
        }

        if(isArray(firstEl)) {
            // IF the first argument is an array
            // > key have been passed in an array
                key_columns = <any>firstEl;
        }
    }

    let src:string='',
        // preparing cache signature
        sign:string = key_columns.join('-');

    // does cache already contain a function comparing the given key list?
    if(_comparer_cache[sign]) return(_comparer_cache[sign]);

    for(let i=0,max=key_columns.length;i<max;i++) {
        let oneKey:string=<string>key_columns[i],
            oneKeyParts:string[] = oneKey.split(':'),
            keyName:string = oneKeyParts[0],
            orderDir:string = oneKeyParts[1];

        if(orderDir==='desc') {
        // IF a reverse sorting order was set
        // > apply the reverse logic
            src+='if(left.'+keyName+' !== right.'+keyName+') {  return(left.'+keyName+' < right.'+keyName+' ? 1 : -1); }';
        } else {
            src+='if(left.'+keyName+' !== right.'+keyName+') {  return(left.'+keyName+' > right.'+keyName+' ? 1 : -1); }';
        }
    }

    // returning a compiled function + adding it to cache
    return(_comparer_cache[sign] = <ComparerFn>new Function('left', 'right', src+'return(0);'));
};

export default compileC;