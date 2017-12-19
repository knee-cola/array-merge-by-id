import { compileC } from "./index";
import { CompareBy } from "./lib-types"

/**
 * Returns index of first matching element in the given array
 * 
 * @param aSearch array to be searched
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param))
 * @param key_values (optional) an object which should be matched with an element from `aSearch` array - it's optional because `key_columns` param can contain a function which doesn't need it  * @example
 * @returns {number} element index
* 
 * @example
 * let streets = [{cityID:22, streetID:1}, {cityID:44, streetID:2}, {cityID:22, streetID:3}];
 * 
 * let streetIndex = findFirstById(streets, ['cityID','streetID'], {cityID:44, streetID:2});
 * 
 * console.log(streetIndex); // will print 1
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

export default indexOf;