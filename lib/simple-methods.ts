import {ArrayDiffResult, ArrayDiffConfig, CompareBy, ComparerFn, CallbackFn, Map} from './lib-types';
import compileC from './comparer-compiler';

const _undef:any = void 0;

/**
 * Sorts the given array based on the given key name array (or comparer function)
 * 
 * @param {Array} source array to be sorted
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [CompareBy](#compareby))
 * @returns {Array} array passed via `source` param
 * 
 * @example
 * let source = [{cityID:2},{cityID:3},{cityID:1}];
 * 
 * // sorting in ASCENDING order
 * sortOn(source, ["cityID"]);
 * 
 * console.log(source); // will print [{cityID:1},{cityID:2},{cityID:3}];
 * 
 * // sorting in DESCENDING order
 * sortOn(source, ["cityID:desc"]);
 * 
 * let streets = [
 *    {cityID:22, streetID:1, name:'Elm Street'},
 *    {cityID:44, streetID:2, name:'Downing St'},
 *    {cityID:22, streetID:3, name:'Wall St'}
 * ];
 * 
 * // using multiple keys
 * sortOn(source, ["cityID", "streetID:desc"]);
 * 
 */
const sortOn = (source:Array<Map>, key_columns:CompareBy):Array<Map> => {
    return(source.sort(compileC(key_columns)));
};

/**
 * Removes all the elements of the given array
 * @param {Array} target array to be cleared
 * @returns {Array} array passed via `target` param
 * 
 * @example
 * let source = [{cityID:2},{cityID:3},{cityID:1}];
 * 
 * clear(source);
 * 
 * console.dir(source); // will print []
 */
function clear<T>(target:Array<T>):Array<T> {

    target.splice(0, target.length);

    return(target); // returning the `target` array ... enabling chaining
}

/**
 * Does an in-place overwritte of an array
 * 
 * @param {Array} target array to be overwritten
 * @param {Array} source array who's elements are to be places in `target`
 * @description removes all the elements of `target` and replaces them with elements from `source`
 * @returns {Array} array passed via `target` param
 * 
 * @example
 * let target = [{cityID:100},{cityID:200}];
 * let source = [{cityID:2},{cityID:3},{cityID:1}];
 * 
 * overwrite(target, source);
 * 
 * console.dir(target); // will print [{cityID:2},{cityID:3},{cityID:1}]
 */
function overwrite(target:Array<any>, source:Array<any>):Array<any> {

    clear(target);

    concat(target, source);

    return(target); // returning the `target` array ... enabling chaining
}

/**
 * Does an in-place concatination of elements of the `source` array at the end of `target` array
 * @param {Array} target array which should receive new elements
 * @param {Array} source array of elements which should be added at the end of the `target` array
 * @returns {Array} array passed via `target` param
 * @example
 * 
 * let target = [{cityID:100},{cityID:200}];
 * let source = [{cityID:2},{cityID:3},{cityID:1}];
 * 
 * concat(target, source);
 * 
 * console.dir(target); // will print [{cityID:100},{cityID:200},{cityID:2},{cityID:3},{cityID:1}]
 */
function concat<T>(target:Array<T>, source:Array<any>):Array<T> {

    for(var i = 0, max=source.length; i<max; i+=1000) {
        target.push.apply(target, source.slice(i,i+1000));
    }

    return(target);
}

export { sortOn, clear, overwrite, concat };