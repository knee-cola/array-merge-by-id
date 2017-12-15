import { defaultTo } from 'lodash';
import { ArrayDiffResult, ArrayDiffConfig, CompareBy, ComparerFn, CallbackFn } from './lib-types';
import { sortOn, concat } from './simple-methods';
import compileComparer from './comparer-compiler';

const _undef:any = void 0;

/**
 * Compares elements of two arrays and returns an object containing common elements and differences.
 * 
 * @param {Array<T>} leftA first array be compared 
 * @param {Array<K>} rightA¸second array be compared 
 * @param {CompareBy} key_columns list of key columns or comparer function, which should be used to compare/match elements
 * @param {ArrayDiffConfig} config additional parameters
 * @returns {ArrayDiffResult<T,K>} comparisson results
 * 
 * @description Both input arrays will be sorted in ascending manner (`key_columns` will be used).
 *              This can be disabled by setting `sortLeftBy` and `sortRightBy` in config parameter.
 *              Note2: since elements are compared by comparing key values, the two arrays can contain
 *              totally different objects, which only share key values
 */
const compareA = <T,K>(leftA:Array<T>, rightA:Array<K>, key_columns:CompareBy, {unique=false,skipSort=false,sortLeftBy,sortRightBy,linkName,mapName,callbackFn=null}:ArrayDiffConfig={}):ArrayDiffResult<T,K> => {

    let leftDiff:Array<T>=[],
        leftCommon:Array<T>=[],
        rightCommon:Array<K>=[],
        rightDiff:Array<K>=[],
        // this object will be returned
        result:ArrayDiffResult<T,K> = {
            leftDiff:leftDiff,
            leftCommon:leftCommon,
            rightCommon:rightCommon,
            rightDiff:rightDiff
        },
        comparerFn:ComparerFn = compileComparer(key_columns);

    if(leftA.length === 0 || rightA.length === 0) {
        result.leftDiff = leftA.slice();
        result.rightDiff = rightA.slice();
        return(result);
    }

    if(!skipSort) {

        // `null` value means that sorting should not be done
        if(sortLeftBy !== null) {
            sortLeftBy = defaultTo(sortLeftBy, comparerFn); // IF sorting is not set in config - use `key_columns` for sorting
            sortOn(leftA, sortLeftBy);
        }

        if(sortRightBy !== null) {
            sortRightBy = defaultTo(sortRightBy, comparerFn);
            sortOn(rightA, sortRightBy); // IF sorting is not set in config - use `key_columns` for sorting
        }
    }

    let right_i:number=0,
        right_max:number = rightA.length,
        continueFrom:number=0,
        match_found:boolean,
        left_el:any,
        right_el:any,
        mapA:Array<K>=null;

    // iterate over first array
    for(let left_i:number=0, left_max:number=leftA.length;left_i<left_max;left_i++) {

        match_found = false;
        left_el = leftA[left_i];

        // should child elements be mapped?
        if(mapName) {
            mapA = left_el[mapName];

            if(!mapA) {
                mapA = left_el[mapName] = [];
            }
        }

        // iterate over second array elements
        // continue from the last used index - no need
        // to start from the beginning (this works
        // because arrays are sorted)
        do {
            right_el = rightA[right_i];

            switch(comparerFn(left_el, right_el))
            {
                case 0: // element match - keys are identical

                    rightCommon.push(right_el);

                    continueFrom = right_i+1; // you're done with this outer element
                    match_found = true; // we managed to match the inner element with at least one outer element

                    // should element be linked?
                    if(linkName) {
                        right_el[linkName] = left_el;
                    }

                    // IF the callback function is provided - call it
                    if(callbackFn !== null) {
                        callbackFn(left_el, right_el);
                    }

                    // should child element be mapped
                    if(mapA) {
                        mapA.push(right_el);
                    }

                    // if elements are unique (there are no duplicate keys)
                    if(unique) {
                        // quit the inner loop and move to next outer element - the current one can't be matched with any of the inner elements
                        right_i=right_max-1;
                    //} else {
                    // ELSE elements aren't unique -> keep on looking ... there still may be inner element which can be matched
                    }

                    break;
                case -1: // outer element comes before the inner element

                    // quit the inner loop and go to next outer element - it might be paired with the current inner element
                    right_i=right_max-1;
                    break;
                case 1: // outer element comes after the inner element

                    continueFrom = right_i+1; // goto next inner element - the current one can't be matched with any of the remaining outer elements
                    rightDiff.push(right_el); // save the unmatched inner element

                    // continue to the next inner element - it could be matched with the outer element, since it comes after the current one
                    break;
            }

        } while(++right_i!==right_max);

        right_i = continueFrom; // continue with the last inner element which can still be paired 

        // if the outer element could not be paired with any of the inner elements > add it to the difference array
        if(!match_found) {
            leftDiff.push(left_el);
        } else {
            // else add it to array of matched elements
            leftCommon.push(left_el);
        }

        // if you've reached the end of the inner array > you've tired comparing everything which could be compared
        if(continueFrom===right_max) {

            left_i++; // go to next inner element

            // add all the remaining outer element to the difference array
            if(left_i!==left_max) {
                concat(leftDiff, leftA.slice(left_i));
            }

            break; // exit the outer loop > we're done
        }
    }

    // add all of the remaining elements of the inner loop to the difference array
    if(continueFrom!==right_max) {
        concat(rightDiff, rightA.slice(continueFrom));
    }

    return(result);
}

export default compareA;