import { filterByKeys } from "./array-filter";
import { CompareBy } from "./lib-types";

/**
 * Returns the first matched element of the given type
 * @param aSearch array to be searched
 * @param key_columns key column names
 * @param key_values key values to be matched
 */
const findFirstById = <T>(aSearch:Array<T>, key_columns:CompareBy, key_values:Array<string>):T => {
    return(filterByKeys(aSearch, key_columns, key_values, true)[0]);
}

export default findFirstById;