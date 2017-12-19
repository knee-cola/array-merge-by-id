import compileC from './comparer-compiler';
import { ArrayUniqueConfig, CompareBy } from './lib-types';
import { sortOn } from './simple-methods';

/**
 * Copies unique elements from `source` to a new array, which is then returned
 * 
 * @param {Array} source source array - which may contain duplicates
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param))
 * @param {ArrayUniqueConfig} config (optional) additional config parameters (see [ArrayUniqueConfig](#arrayuniqueconfig))
 * @returns {Array} array of unique elements
 * 
 * @example
 * let source = [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'}, {cityID:2, cityName:'London'} ];
 * 
 * let result = uniqueA(source, ["cityID"]);
 * 
 * console.dir(result); // will print [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'} ]
 */
const uniqueA = <T>(source:Array<T>, key_columns:CompareBy, {skipSort=false, elFreq=[]}:ArrayUniqueConfig={}):Array<T> => {
    
    var comparerFn = compileC(key_columns);

    if(!skipSort) {
        sortOn(source, comparerFn);
    }

    if(source.length===0) {
        return([]);
    }

    let currEl,
        prevEl = source[0],
        resultA:Array<T> = [prevEl], // adding the first element to the array
        resultIx = 0;

    // first element was seen once
    elFreq[resultIx] = 1;

    for (let i=1, maxI=source.length; i<maxI; i++) {
        currEl = source[i];

        if(comparerFn(currEl, prevEl) !== 0) {
        // IF the two elements differ
        // > a new element was found
            resultA.push(currEl);
            prevEl = currEl;
            elFreq[++resultIx] = 1;
        } else {
            // ELSE the current element was seen one more time
            elFreq[resultIx]++;
        }
    }

    // returning unique array
    return(resultA);
}

export default uniqueA;