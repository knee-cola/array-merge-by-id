import { ArrayDiffResult, ArrayDiffConfig, CompareBy, Map } from './lib-types';
import { sortOn } from './simple-methods';
import diffA from './array-compare';
import { defaults, concat } from 'lodash';

/**
 * Method merges new and changed elements into an existing array without duplication. Matching elements from two arrays are passed to a callback function if one is provided
 * @param currData an array of "current" data elements
 * @param newData an array of changes and new data elements
 * @param sortKeys key name array or a comparer function, which will be used to compare elements of the two arrays
 * @param config additional config, which can contain a callback function (it's optional)
 * 
 * @description this sorts the given arrays, where it uses the `sortKeys` param. Also the `currData` will be concatinated with new elements from `newData` array
 */
const mergeA = <T>(currData:Array<T>, newData:Array<T>, sortKeys:CompareBy, config?:ArrayDiffConfig):ArrayDiffResult<T,T> => {
    
    // array elements are unique (at least should be)
    defaults(config, {unique:true});

    let diff:ArrayDiffResult<T,T> = diffA(currData, newData, sortKeys, config);

    // adding new elements to the `currData` array
    concat(currData, diff.rightDiff);

    return(diff);
}

export default mergeA;