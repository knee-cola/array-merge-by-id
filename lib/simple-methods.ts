import {concat} from 'lodash';
import {ArrayDiffResult, ArrayDiffConfig, CompareBy, ComparerFn, CallbackFn, Map} from './lib-types';
import compileC from './comparer-compiler';

const _undef:any = void 0;

/**
 * Sorts the given array based on the given key name array
 * @param source array to be sorted
 * @param aKeys array of keys to be used in sorting the function OR a comparer function
 */
const sortOn = (source:Array<Map>, aKeys:CompareBy):Array<Map> => {
    return(source.sort(compileC(aKeys)));
};

/**
 * Removes all the elements of the given array
 * @param target 
 */
function clear<T>(target:Array<T>):Array<T> {

    target.splice(0, target.length);

    return(target); // returning the `target` array ... enabling chaining
}

/**
 * Does an in-place overwritte of an array
 * @param target array to be overwritten
 * @param source array who's elements are to be places in `target`
 * @description removes all the elements of `target` and replaces them with elements from `source`
 */
function overwrite(target:Array<any>, source:Array<any>):Array<any> {

    clear(target);

    concat(target, source);

    return(target); // returning the `target` array ... enabling chaining
}

export { sortOn, clear, overwrite };