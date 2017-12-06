import {defaults} from 'lodash';
import diffA from './array-compare';
import { ArrayDiffResult, ArrayDiffConfig, CompareBy, CallbackFn } from './array-diff-merge-types';

/**
 * Calls a callback method for each matched elements of two provided arrays
 * @param leftA first array of elements
 * @param rightA second array of elements
 * @param key_columns list of key columns or comparer function, which should be used to compare/match elements
 * @param callbackFn function to be called for each of mathced element pairs
 * @param config additional parameters
 */
function eachPair<T,K>(leftA:Array<T>, rightA:Array<K>, key_columns:CompareBy, callbackFn:CallbackFn, config:ArrayDiffConfig = {}): ArrayDiffResult<T,K>
{
    defaults(config,{callbackFn:callbackFn});

    return(diffA<T,K>(leftA, rightA, key_columns, config));
}



export default eachPair;