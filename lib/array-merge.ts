import { ArrayDiffResult, ArrayDiffConfig, CompareBy, Map } from './lib-types';
import { sortOn, concat } from './simple-methods';
import diffA from './array-compare';
import { defaults } from 'lodash';

/**
 * Merges new/changed elements into an existing array
 * 
 * @param currData an array of "current" data elements
 * @param newData an array of changes and new data elements
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param))
 * @param {ArrayDiffConfig} config [additional config parameters](#configarraydiffconfig-param)
 * @returns {ArrayDiffResult} [comparisson results object](#arraydiffresult)
 */
const mergeA = <T>(currData:Array<T>, newData:Array<T>, key_columns:CompareBy, config?:ArrayDiffConfig):ArrayDiffResult<T,T> => {
    
    // array elements are unique (at least should be)
    defaults(config, {unique:true});

    let diff:ArrayDiffResult<T,T> = diffA(currData, newData, key_columns, config);

    // adding new elements to the `currData` array
    concat(currData, diff.rightDiff);

    return(diff);
}

export default mergeA;