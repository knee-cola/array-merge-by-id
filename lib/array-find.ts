import filterByKeys from "./array-filter";
import { CompareBy, Map } from "./lib-types";

/**
 * Returns the first matched element of the given type
 * 
 * @param aSearch array to be searched
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param))
 * @param key_values (optional) an object which should be matched with an element from `aSearch` array - it's optional because `key_columns` param can contain a function which doesn't need it  * @example
 * @returns matched array element
 * 
 * @example
 * let streets = [{cityID:22, streetID:1}, {cityID:44, streetID:2}, {cityID:22, streetID:3}];
 * 
 * let myStreet = findFirstById(streets, ['cityID','streetID'], {cityID:44, streetID:2});
 * 
 * console.dir(myStreet); // will output {cityID:44, streetID:2}
 */
const findFirstById = <T>(aSearch:Array<T>, key_columns:CompareBy, key_values:Map=null):T => {
    return(filterByKeys(aSearch, key_columns, key_values, true)[0]);
}

export default findFirstById;