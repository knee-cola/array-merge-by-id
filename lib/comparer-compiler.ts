
import {isFunction, isArray} from 'lodash';
import { CompareBy, ComparerFn } from './lib-types';

// cached comparer functions
const _comparer_cache:{ [key:string]:ComparerFn; }[] = [];

/**
 * Compiles a function which compares two data elements and detects which
 * precedes which. It bases the comparison on the the
 * given list of numeric keys. The resulting function can be used in i.e. `Array.sort`
 * @param aKeys list of keys, which should be used to compare two array elements. 
 *              Default compare direction is ASC, which can be changed to DESC by adding ":desc" suffix to key name.
 */
const compileC = (...aKeys:(string|CompareBy)[]):ComparerFn => {

    let firstEl = aKeys[0];

    if(aKeys.length === 1) {

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
                aKeys = <any>firstEl;
        }
    }

    let src:string='',
        // preparing cache signature
        sign:string = aKeys.join('-');

    // does cache already contain a function comparing the given key list?
    if(_comparer_cache[sign]) return(_comparer_cache[sign]);

    for(let i=0,max=aKeys.length;i<max;i++) {
        let oneKey:string=<string>aKeys[i],
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