import { compileC } from "./index";
import { CompareBy } from "./lib-types";

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

export default indexOf;