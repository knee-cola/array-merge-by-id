import { ArrayDiffResult, ArrayDiffConfig, CompareBy, Map } from './lib-types';
import { sortOn, concat } from './simple-methods';
import diffA from './array-compare';
import { defaults } from 'lodash';

/**
 * Merges new/changed elements into an existing array
 * 
 * @param {Array} currData an array of "current" data elements
 * @param {Array} newData an array of changes and new data elements
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [CompareBy](#compareby))
 * @param {ArrayDiffConfig} config (optional) additional config parameters (see [ArrayDiffConfig](#arraydiffconfig))
 * @returns {ArrayDiffResult} comparisson results object (see [ArrayDiffResult](#arraydiffresult))
 * 
 * @example
 * let currData = [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'Londonnnnn'} ];
 * let newData = [ {cityID:2, cityName:'London'}, {cityID:3, cityName:'Rome' } ]; // London is fixed, Rome is added
 * 
 * // function which applies changes to an existing element
 * let mergeFn = (element, changes) => { element.cityName = changes.cityName; };
 * 
 * let result = mergeA(currData, newData, ['cityID'], { callbackFn: mergeFn });
 * 
 * console.dir(currData); // will print [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'}, {cityID:3, cityName:'Rome' } ];
 * 
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