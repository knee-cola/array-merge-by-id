import { CompareBy, ComparerFn } from './lib-types';
import compileC from './comparer-compiler';

/**
 * Extract array elements which match the given key values
 * @param aSearch array to be searched
 * @param key_columns list of key columns or comparer function, which should be used to compare/match elements
 * @param key_values key values to be found
 * @param findFirstOnly should only the first matched element be returned (defaults to `false`)
 */
const filterByKeys = <T>(aSearch:Array<T>, key_columns:CompareBy, key_values:Array<string>, findFirstOnly:boolean=false):Array<T> => {

    let fnComparer:ComparerFn = compileC(key_columns),
        result:Array<T> = [];

    for(let i=0, maxI=aSearch.length; i<maxI; i++) {
        if(fnComparer(aSearch[i], key_values)===0) {
            if(!findFirstOnly) {
                result.push(aSearch[i]);
            } else {
                return([aSearch[i]]);
            }
        }
    }

    return(result);
}

/**
 * Returns the first matched element of the given type
 * @param aSearch array to be searched
 * @param key_columns key column names
 * @param key_values key values to be matched
 */
const findFirstById = <T>(aSearch:Array<T>, key_columns:CompareBy, key_values:Array<string>):T => {
    return(filterByKeys(aSearch, key_columns, key_values, true)[0]);
}

/**
 * Returns index of first element in the given array which is matched by provided key values
 * @param aSearch array to be searched
 * @param key_columns key column names
 * @param key_values key column values
 */
const indexOf = <T>(aSearch:Array<T>, key_columns:CompareBy, key_values:Array<string>):number => {
    
    let fnComparer = compileC(key_columns);

    for(var i=0,max=aSearch.length;i<max;i++) {
        if(fnComparer(aSearch[i], key_values)===0) {
            return(i);
        }
    }

    return(-1);
}

export { filterByKeys, findFirstById, indexOf }