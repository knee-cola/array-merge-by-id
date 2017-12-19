import * as _ from 'lodash';
import { overwrite } from './simple-methods';
import { ArrayLinkConfig, ArrayLinkResult, CompareBy, Map } from './lib-types';
import compareA from './array-compare';

/**
 * Extends each child array element with a reference to it's parent element (in `parentA` array). Optionally it can extend parane element with a map of it's children.
 * 
 * @param parentA array containting parent elements
 * @param childA array containing child elements
 * @param {CompareBy} key_columns definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param))
 * @param {string} linkName (optional) name of the property which should be assigned a reference to parent element (defaults to 'parent')
 * @param {ArrayDiffConfig} config (optional) [additional config parameters](#configarraydiffconfig-param)
 * @returns {ArrayLinkResult} [comparisson results object](#arraylinkresult)
 * 
 * @example
 * let cities = [ {cityID:22, cityName:'New York'}, {cityID:44, cityName:'London'} ];
 * let streets = [{cityID:22, streetID:1}, {cityID:44, streetID:2}, {cityID:22, streetID:3}];
 * 
 * let result = linkA(cities, streets, ['cityID'], 'city')
 * 
 * console.dir(result); // will output {cityID:22,streetID:1,city:<reference to New York>}, {cityID:44,streetID:2,city:<reference to London>}, {cityID:22,streetID:3,city:<reference to New York>}
 * 
 */
function linkA<T,K>(parentA:Array<T>, childA:Array<K>, key_columns:CompareBy, linkName:string='parent', config:ArrayLinkConfig={purge_orphans: false}):ArrayLinkResult<T,K> {

    // `compareA` expects `linkName` to be passed inside the `config` object
    config.linkName = linkName;
    
    var diff = compareA(parentA, childA, key_columns, config);

    // if orphans purging is requested > do an in-place overwritte
    if(config.purge_orphans) {
        overwrite(childA, diff.rightCommon);
    }

    return({
        diff: diff,
        childless:diff.leftDiff,
        parents:diff.leftCommon,
        children:diff.rightCommon,
        orphans:diff.rightDiff
    });
}

export default linkA;