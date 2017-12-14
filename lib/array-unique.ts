import compileC from './comparer-compiler';
import { ArrayUniqueConfig, CompareBy } from './lib-types';
import { sortOn } from './simple-methods';

/**
 * Removes duplicates from an array and returns a new unique array
 * @param source source array - which may contain duplicates
 * @param key_columns list of key columns or comparer function, which should be used to compare/match elements
 * @param config additional config parameters
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