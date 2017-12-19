import {ArrayDiffResult, ArrayDiffConfig, CompareBy, ComparerFn, CallbackFn, Map} from './lib-types';
import compileC from './comparer-compiler';

const _undef:any = void 0;

/**
 * Sorts the given array based on the given key name array
 * @param {Array} source array to be sorted
 * @param aKeys array of keys to be used in sorting the function OR a comparer function
 */
const sortOn = (source:Array<Map>, aKeys:CompareBy):Array<Map> => {
    return(source.sort(compileC(aKeys)));
};

/**
 * Removes all the elements of the given array
 * @param {Array} target 
 */
function clear<T>(target:Array<T>):Array<T> {

    target.splice(0, target.length);

    return(target); // returning the `target` array ... enabling chaining
}

/**
 * Does an in-place overwritte of an array
 * @param {Array} target array to be overwritten
 * @param {Array} source array who's elements are to be places in `target`
 * @description removes all the elements of `target` and replaces them with elements from `source`
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
* @returns reference to the `target` array
 */
function concat<T>(target:Array<T>, source:Array<any>):Array<T> {

    for(var i = 0, max=source.length; i<max; i+=1000) {
        target.push.apply(target, source.slice(i,i+1000));
    }

    return(target);
}

export { sortOn, clear, overwrite, concat };