import {defaults} from 'lodash';
import compareA from './array-compare';
import { ArrayDiffResult, ArrayDiffConfig, CompareBy, CallbackFn } from './lib-types';

/**
 * Calls a callback method for each matched elements of provided arrays
 * 
 * @param leftA first array of elements
 * @param rightA second array of elements
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param))
 * @param callbackFn function to be called for each of mathced element pairs
 * @param {ArrayDiffConfig} config [additional config parameters](#configarraydiffconfig-param)
 * @returns {ArrayDiffResult} [comparisson results object](#arraydiffresult)

 */
function eachPair<T,K>(leftA:Array<T>, rightA:Array<K>, key_columns:CompareBy, callbackFn:CallbackFn, config:ArrayDiffConfig = {}): ArrayDiffResult<T,K>
{
    defaults(config,{callbackFn:callbackFn});

    return(compareA<T,K>(leftA, rightA, key_columns, config));
}

export default eachPair;