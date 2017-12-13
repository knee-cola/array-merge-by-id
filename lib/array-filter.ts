import { CompareBy, ComparerFn, Map } from './lib-types';
import compileC from './comparer-compiler';

/**
 * Extract array elements which match the given key values
 * @param aSearch array to be searched
 * @param key_columns list of key columns or comparer function, which should be used to compare/match elements
 * @param key_values key values to be found
 * @param findFirstOnly should only the first matched element be returned (defaults to `false`)
 */
const filterByKeys = <T>(aSearch:Array<T>, key_columns:CompareBy, key_values:Map=null, findFirstOnly:boolean=false):Array<T> => {

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

export default filterByKeys;