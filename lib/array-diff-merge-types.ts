type Map = { [key:string]:any };

type ComparerFn = (left:Map, right:Map) => number;
type CallbackFn = (left:Map, right:Map) => any;
type CompareBy = ComparerFn|Array<string>;

type ArrayDiffConfig = {

    /** (optional) function to be used for comparing elements of two arrays. If not set it defaults to `key_columns` param */
    compareBy?:CompareBy,

    /** (optional) if elements of `leftA` array are unique (all have different key values) */
    unique?:boolean,

    /** (optional) disables array sorting */
    skipSort?:boolean,

    /** (optional) function or column list to be used while sorting the `leftA`. If not set `key_columns` will be used. If a `null` value is passed, the left will not be sorted. */
    sortLeftBy?:CompareBy,
    
    /** (optional) function or column list to be used while sorting the `rightA`. If not set `key_columns` will be used.  If a `null` value is passed, the right will not be sorted.*/
    sortRightBy?:CompareBy,

    /** (optional) name of a property which should used to assign `rightA` elements with a reference to a matched (parent) element in `leftB` (only if a match is found) */
    linkName?:string
    
    /** (optional) name of a property which should used to assign `leftA` elements with an array of matched elements in `rightA` (only if a match is found) */
    mapName?:string,

    /** (optional) a function which should be called for every matched pair of elements */
    callbackFn?: CallbackFn
}

type ArrayLinkConfig = ArrayDiffConfig & {
    purge_orphans?:boolean
}

type ArrayPurgeConfig = {
    /** (optional) key columns or a function to be used for comparing elements of two arrays. If not set it defaults to `key_columns` param */
    sortBy?:CompareBy,

    /** (optional) function or column list to be used while sorting the `leftA` (defaults to `key_columns`). If a `null` value is passed, the left will not be sorted. */
    sortLeftBy?:CompareBy,
    
    /** (optional) function or column list to be used while sorting the `rightA` (defaults to `key_columns`)  If a `null` value is passed, the right will not be sorted.*/
    sortRightBy?:CompareBy,

    /** (optional) shorthand to be used when `sortLeftBy` and `sortRightBy` would be assigned to the same value */
    skipSort?:boolean,

    /** (optional) should function map and return all the elements removed from target array */
    mapRemoved?:boolean,

    /** (optional) can an element from the hit list array be matched with multiple elements from the target array (defaults to `false`) */
    matchMulti?:boolean
}

type ArrayDiffResult<T,K> = {
    leftDiff:Array<T>,
    leftCommon:Array<T>,
    // elements of the second array don't need to be of the same type
    rightCommon:Array<K>,
    rightDiff:Array<K>
}

type ArrayLinkResult<T,K> = {
    childless:Array<T>,
    parents:Array<T>,
    // elements of the second array don't need to be of the same type
    children:Array<K>,
    orphans:Array<K>,
    diff: ArrayDiffResult<T,K>
}

type ArrayUniqueConfig = {
    /** should te input array be sorted */
    skipSort?:boolean,
    /** an object in which element frequency can be recorded */
    elFreq?:Array<number>
}

export { Map, ComparerFn, CompareBy, CallbackFn, ArrayDiffConfig, ArrayLinkConfig, ArrayPurgeConfig, ArrayDiffResult, ArrayLinkResult, ArrayUniqueConfig };