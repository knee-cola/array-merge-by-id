import {defaults} from 'lodash';
import compareA from './array-compare';
import { ArrayDiffResult, ArrayDiffConfig, CompareBy, CallbackFn } from './lib-types';

/**
 * Calls a callback method for each matched elements of provided arrays
 * 
 * @param {Array} leftA first array of elements
 * @param {Array} rightA second array of elements
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param))
 * @param {Function} callbackFn function to be called for each of mathced element pairs
 * @param {ArrayDiffConfig} config (optional) [additional config parameters](#configarraydiffconfig-param)
 * @returns {ArrayDiffResult} [comparisson results object](#arraydiffresult)
 * 
 * @example
 * let cities = [ {cityID:22, name:'New York'}, {cityID:44, name:'London'} ];
 * let streets = [{cityID:22, streetID:1, name:'Elm Street'}, {cityID:22, streetID:3, name:'Wall St'}, {cityID:44, streetID:2, name:'Downing St'}];
 * 
 * let callbackFn = (city, street) => {
 *   console.log(street.name + ' ' + city.name)
 * }
 * 
 * eachPair(cities, streets, ["cityID"], callbackFn);
 * 
 * // The following will be printed to console:
 * // Elm Street in New York
 * // Wall St in New York
 * // Downing St in London
 */
function eachPair<T,K>(leftA:Array<T>, rightA:Array<K>, key_columns:CompareBy, callbackFn:CallbackFn, config:ArrayDiffConfig = {}): ArrayDiffResult<T,K>
{
    defaults(config,{callbackFn:callbackFn});

    return(compareA<T,K>(leftA, rightA, key_columns, config));
}

export default eachPair;