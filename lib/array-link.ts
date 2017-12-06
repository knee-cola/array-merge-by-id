import * as _ from 'lodash';
import { overwrite } from './simple-methods';
import { ArrayLinkConfig, ArrayLinkResult, CompareBy, Map } from './array-diff-merge-types';
import compareA from './array-compare';

/**
 * Adds a reference to coresponding parent element (`parentA` array) to each child element (`childA` array)
 * @param parentA array containting parent elements
 * @param childA array containing child elements
 * @param key_columns key column names or comparer function, which will be used to match elements of two arrays
 * @param linkName name of the property which should be assigned a reference to parent element (defaults to 'parent')
 * @param config detailed configuration, containing
 * @description this method sorts both of the provided arrays (this can be disabled via `config`)
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