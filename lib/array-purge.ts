import { defaultTo } from 'lodash';
import { sortOn } from './simple-methods';
import { overwrite } from './simple-methods';
import compileC from './comparer-compiler';
import { ArrayPurgeConfig, CompareBy, Map, ComparerFn } from './lib-types';

/**
 * Removes elements of a provided array indicated by a hit list array (ones which can be matched with an element from a hit list get removed)
 * @param aTarget array to be purged
 * @param aHitList hit list - indicates which element from `aTarget` should be removed
 * @param key_columns list of key columns or comparer function, which should be used to compare/match elements
 * @param config additional config parameters
 * @description Both input arrays will be sorted in ascending manner (`key_columns` will be used).
 * This can be disabled by setting `skipSort` to `true`, or `sortLeftBy` and `sortRightBy` in `config`
 */
function purgeA<T>(aTarget:Array<T>, aHitList:Array<Map>, key_columns:CompareBy, {sortBy,sortLeftBy,sortRightBy,skipSort=false,mapRemoved=false,matchMulti=false}:ArrayPurgeConfig):Array<T> {
    
    var j:number=aTarget.length,
        i:number=aHitList.length,
        removedElements:Array<T> = mapRemoved ? [] : null,
        compareResult:number,
        comparerFn:ComparerFn = comparerFn = compileC(key_columns);

    // although the main algorithm expects both of the arrays to be sorted
    // this can be disabled
    if(!skipSort) {

        if(sortBy) {
            sortLeftBy = sortBy;
            sortRightBy = sortBy;
        }

        // IF a null value was passed, the corresponding array should not be sorted
        if(sortLeftBy !== null) {
            sortLeftBy = defaultTo(sortLeftBy, comparerFn);
            sortOn(aHitList, sortLeftBy);
        }

        if(sortRightBy!==null) {
            sortRightBy = defaultTo(sortRightBy, comparerFn);
            sortOn(aTarget, sortRightBy);
        }
    }
    
    // iterate over hit list 
    while(i-->0) {
        // iterate over target array
        while(j-->0) {

            let compareResult:number = comparerFn(aHitList[i], aTarget[j]);

            if(compareResult === 0) {
            // IF the two elements match
                if(removedElements) {
                    removedElements.push(aTarget[j]);
                }

                // removing a target element
                aTarget.splice(j, 1);

                if(!matchMulti) {
                // IF a hit list element can be matched with only one target element
                // > break the inner loop & go to next hit list element
                    break;
                }
            } else if(compareResult === 1) {
                    // IF the hit list element comes AFTER the target element
                    // > go to next target element ... maybe we'll be able to match that one
                    j++; // rewind the inner counter to previous value, so that current element is compared with the next hit list element
                    break; // breaking the inner loop
            }
        } // while(j-->0) {...}
    } // while(i-->0) {...}

    return(removedElements);
}
    
export default purgeA;