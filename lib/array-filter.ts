import { CompareBy, ComparerFn, Map } from './lib-types';
import compileC from './comparer-compiler';

/**
 * Extract all the array elements which match the given key values (or are indicated by a comparer function)
 * 
 * @param {Array} aSearch array to be searched
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param))
 * @param {Map} key_values (optional) an object which should be matched with an element from `aSearch` array - it's optional because `key_columns` param can contain a function which doesn't need it
 * @param {boolean} findFirstOnly (optional) should only the first matched element be returned (defaults to `false`)
 * @returns {Array} array of matched elements
 * 
 * @example
 * let streets = [{cityID:22, streetID:1}, {cityID:44, streetID:2}, {cityID:22, streetID:3}];
 * 
 * let myCityStreets = filterByKeys(streets, ['cityID'], {cityID:22});
 * 
 * console.dir(myCityStreets); // will output [{cityID:22, streetID:1}, {cityID:22, streetID:3}]
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