# What's this?

This is a set of functions specialized in comparing and merging arrays containig elements signed by unique set IDs.
This is typically used in scenario in which client-side data-sets with changes comming from the an SQL server (server > client replication).

The center stage of this toolkit is the `mergeA` function, which merges two arrays.

Documentation for each of the functions can be found below ...

## Functions

<dl>
<dt><a href="#compareA">compareA(leftA, rightA, key_columns, config)</a> ⇒ <code>ArrayDiffResult</code></dt>
<dd><p>Compares elements of two arrays and returns an object containing common elements and differences.</p>
</dd>
<dt><a href="#filterByKeys">filterByKeys(aSearch, key_columns, key_values, findFirstOnly)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Extract all the array elements which match the given key values (or are indicated by a comparer function)</p>
</dd>
<dt><a href="#findFirstById">findFirstById(aSearch, key_columns, key_values)</a> ⇒ <code>T</code></dt>
<dd><p>Returns the first matched element of the given type</p>
</dd>
<dt><a href="#indexOf">indexOf(aSearch, key_columns, key_values)</a> ⇒ <code>number</code></dt>
<dd><p>Returns index of first matching element in the given array</p>
</dd>
<dt><a href="#linkA">linkA(parentA, childA, key_columns, linkName, config)</a> ⇒ <code>ArrayLinkResult</code></dt>
<dd><p>Extends each child array element with a reference to it&#39;s parent element (in <code>parentA</code> array). Optionally it can extend parane element with a map of it&#39;s children.</p>
</dd>
<dt><a href="#mergeA">mergeA(currData, newData, key_columns, config)</a> ⇒ <code>ArrayDiffResult</code></dt>
<dd><p>Merges new/changed elements into an existing array</p>
</dd>
<dt><a href="#purgeA">purgeA(aTarget, aHitList, key_columns, config)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Removes elements indicated by a hit list from the provided array</p>
</dd>
<dt><a href="#uniqueA">uniqueA(source, key_columns, config)</a> ⇒</dt>
<dd><p>Copies unique elements from <code>source</code> to a new array, which is then returned</p>
</dd>
<dt><a href="#compileC">compileC(aKeys)</a></dt>
<dd><p>Compiles a function which compares two data elements and detects which
precedes which. It bases the comparison on the the
given list of numeric keys. The resulting function can be used in i.e. <code>Array.sort</code></p>
</dd>
<dt><a href="#eachPair">eachPair(leftA, rightA, key_columns, callbackFn, config)</a> ⇒ <code>ArrayDiffResult</code></dt>
<dd><p>Calls a callback method for each matched elements of provided arrays</p>
</dd>
<dt><a href="#sortOn">sortOn(source, aKeys)</a></dt>
<dd><p>Sorts the given array based on the given key name array</p>
</dd>
<dt><a href="#clear">clear(target)</a></dt>
<dd><p>Removes all the elements of the given array</p>
</dd>
<dt><a href="#overwrite">overwrite(target, source)</a></dt>
<dd><p>removes all the elements of <code>target</code> and replaces them with elements from <code>source</code></p>
</dd>
<dt><a href="#concat">concat(target, source)</a> ⇒</dt>
<dd><p>Does an in-place concatination of elements of the <code>source</code> array at the end of <code>target</code> array</p>
</dd>
<dt><a href="#stringifyIDs">stringifyIDs(data)</a></dt>
<dd><p>this function is to be used for debugging and error dumping</p>
</dd>
</dl>

<a name="compareA"></a>

## compareA(leftA, rightA, key_columns, config) ⇒ <code>ArrayDiffResult</code>
Compares elements of two arrays and returns an object containing common elements and differences.

**Kind**: global function  
**Returns**: <code>ArrayDiffResult</code> - comparisson results object](#arraydiffresult)  

| Param | Type | Description |
| --- | --- | --- |
| leftA | <code>Array.&lt;T&gt;</code> | first array be compared |
| rightA | <code>Array.&lt;K&gt;</code> | second array be compared |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| config | <code>ArrayDiffConfig</code> | (optional) [additional config parameters](#configarraydiffconfig-param) |

<a name="filterByKeys"></a>

## filterByKeys(aSearch, key_columns, key_values, findFirstOnly) ⇒ <code>Array.&lt;T&gt;</code>
Extract all the array elements which match the given key values (or are indicated by a comparer function)

**Kind**: global function  
**Returns**: <code>Array.&lt;T&gt;</code> - array of matched elements  

| Param | Type | Description |
| --- | --- | --- |
| aSearch |  | array to be searched |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| key_values | <code>Map</code> | (optional) an object which should be matched with an element from `aSearch` array - it's optional because `key_columns` param can contain a function which doesn't need it |
| findFirstOnly | <code>boolean</code> | (optional) should only the first matched element be returned (defaults to `false`) |

**Example**  
```js
let streets = [{cityID:22, streetID:1}, {cityID:44, streetID:2}, {cityID:22, streetID:3}];

let myCityStreets = filterByKeys(streets, ['cityID'], {cityID:22});

console.dir(myCityStreets); // will output [{cityID:22, streetID:1}, {cityID:22, streetID:3}]
```
<a name="findFirstById"></a>

## findFirstById(aSearch, key_columns, key_values) ⇒ <code>T</code>
Returns the first matched element of the given type

**Kind**: global function  
**Returns**: <code>T</code> - matched array element  

| Param | Type | Description |
| --- | --- | --- |
| aSearch |  | array to be searched |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| key_values | <code>Map</code> | (optional) an object which should be matched with an element from `aSearch` array - it's optional because `key_columns` param can contain a function which doesn't need it  * @example |

**Example**  
```js
let streets = [{cityID:22, streetID:1}, {cityID:44, streetID:2}, {cityID:22, streetID:3}];

let myStreet = findFirstById(streets, ['cityID','streetID'], {cityID:44, streetID:2});

console.dir(myStreet); // will output {cityID:44, streetID:2}
```
<a name="indexOf"></a>

## indexOf(aSearch, key_columns, key_values) ⇒ <code>number</code>
Returns index of first matching element in the given array

**Kind**: global function  
**Returns**: <code>number</code> - element index  

| Param | Type | Description |
| --- | --- | --- |
| aSearch |  | array to be searched |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| key_values | <code>Map</code> | (optional) an object which should be matched with an element from `aSearch` array - it's optional because `key_columns` param can contain a function which doesn't need it  * @example |

**Example**  
```js
let streets = [{cityID:22, streetID:1}, {cityID:44, streetID:2}, {cityID:22, streetID:3}];

let streetIndex = findFirstById(streets, ['cityID','streetID'], {cityID:44, streetID:2});

console.log(streetIndex); // will print 1
```
<a name="linkA"></a>

## linkA(parentA, childA, key_columns, linkName, config) ⇒ <code>ArrayLinkResult</code>
Extends each child array element with a reference to it's parent element (in `parentA` array). Optionally it can extend parane element with a map of it's children.

**Kind**: global function  
**Returns**: <code>ArrayLinkResult</code> - [comparisson results object](#arraylinkresult)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parentA |  |  | array containting parent elements |
| childA |  |  | array containing child elements |
| key_columns | <code>CompareBy</code> |  | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| linkName | <code>string</code> | <code>&quot;parent&quot;</code> | (optional) name of the property which should be assigned a reference to parent element (defaults to 'parent') |
| config | <code>ArrayDiffConfig</code> |  | (optional) [additional config parameters](#configarraydiffconfig-param) |

**Example**  
```js
let cities = [ {cityID:22, cityName:'New York'}, {cityID:44, cityName:'London'} ];
let streets = [{cityID:22, streetID:1}, {cityID:44, streetID:2}, {cityID:22, streetID:3}];

let result = linkA(cities, streets, ['cityID'], 'city')

console.dir(result); // will output {cityID:22,streetID:1,city:<reference to New York>}, {cityID:44,streetID:2,city:<reference to London>}, {cityID:22,streetID:3,city:<reference to New York>}
```
<a name="mergeA"></a>

## mergeA(currData, newData, key_columns, config) ⇒ <code>ArrayDiffResult</code>
Merges new/changed elements into an existing array

**Kind**: global function  
**Returns**: <code>ArrayDiffResult</code> - [comparisson results object](#arraydiffresult)  

| Param | Type | Description |
| --- | --- | --- |
| currData |  | an array of "current" data elements |
| newData |  | an array of changes and new data elements |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| config | <code>ArrayDiffConfig</code> | (optional) [additional config parameters](#configarraydiffconfig-param) |

**Example**  
```js
let currData = [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'Londonnnnn'} ];
let newData = [ {cityID:2, cityName:'London'}, {cityID:3, cityName:'Rome' } ]; // London is fixed, Rome is added

// function which applies changes to an existing element
let mergeFn = (element, changes) => { element.cityName = changes.cityName; };

let result = mergeA(currData, newData, ['cityID'], { callbackFn: mergeFn });

console.dir(currData); // will print [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'}, {cityID:3, cityName:'Rome' } ];
```
<a name="purgeA"></a>

## purgeA(aTarget, aHitList, key_columns, config) ⇒ <code>Array.&lt;T&gt;</code>
Removes elements indicated by a hit list from the provided array

**Kind**: global function  
**Returns**: <code>Array.&lt;T&gt;</code> - an array of removed elements  

| Param | Type | Description |
| --- | --- | --- |
| aTarget |  | array to be purged |
| aHitList |  | hit list - indicates which element from `aTarget` should be removed |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| config | <code>ArrayPurgeConfig</code> | (optional) [additional config parameters](#configarraypurgeconfig-param) |

**Example**  
```js
let targetA = [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'}, {cityID:3, cityName:'Rome' } ];
let hitList = [ { cityID: 1 }, { cityID: 3 } ];

let elFreq = [];

let result = purgeA(targetA, hitList, ['cityID'] { elFreq: elFreq });

console.dir(targetA); // will print [ {cityID:1, cityName:'New York'} ];
console.dir(elFreq); // will print [1, 2] - it means that the first array element was found once, while the second twice
```
<a name="uniqueA"></a>

## uniqueA(source, key_columns, config) ⇒
Copies unique elements from `source` to a new array, which is then returned

**Kind**: global function  
**Returns**: array of unique elements  

| Param | Type | Description |
| --- | --- | --- |
| source |  | source array - which may contain duplicates |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| config | <code>ArrayUniqueConfig</code> | (optional) additional config parameters (see [ArrayUniqueConfig](#arrayuniqueconfig)) |

**Example**  
```js
let source = [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'}, {cityID:2, cityName:'London'} ];

let result = uniqueA(source, ["cityID"]);

console.dir(result); // will print [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'} ]
```
<a name="compileC"></a>

## compileC(aKeys)
Compiles a function which compares two data elements and detects which
precedes which. It bases the comparison on the the
given list of numeric keys. The resulting function can be used in i.e. `Array.sort`

**Kind**: global function  

| Param | Description |
| --- | --- |
| aKeys | list of keys, which should be used to compare two array elements.              Default compare direction is ASC, which can be changed to DESC by adding ":desc" suffix to key name. |

<a name="eachPair"></a>

## eachPair(leftA, rightA, key_columns, callbackFn, config) ⇒ <code>ArrayDiffResult</code>
Calls a callback method for each matched elements of provided arrays

**Kind**: global function  
**Returns**: <code>ArrayDiffResult</code> - [comparisson results object](#arraydiffresult)  

| Param | Type | Description |
| --- | --- | --- |
| leftA |  | first array of elements |
| rightA |  | second array of elements |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| callbackFn |  | function to be called for each of mathced element pairs |
| config | <code>ArrayDiffConfig</code> | [additional config parameters](#configarraydiffconfig-param) |

<a name="sortOn"></a>

## sortOn(source, aKeys)
Sorts the given array based on the given key name array

**Kind**: global function  

| Param | Description |
| --- | --- |
| source | array to be sorted |
| aKeys | array of keys to be used in sorting the function OR a comparer function |

<a name="clear"></a>

## clear(target)
Removes all the elements of the given array

**Kind**: global function  

| Param |
| --- |
| target | 

<a name="overwrite"></a>

## overwrite(target, source)
removes all the elements of `target` and replaces them with elements from `source`

**Kind**: global function  

| Param | Description |
| --- | --- |
| target | array to be overwritten |
| source | array who's elements are to be places in `target` |

<a name="concat"></a>

## concat(target, source) ⇒
Does an in-place concatination of elements of the `source` array at the end of `target` array

**Kind**: global function  
**Returns**: reference to the `target` array  

| Param | Description |
| --- | --- |
| target | array which should receive new elements |
| source | array of elements which should be added at the end of the `target` array |

<a name="stringifyIDs"></a>

## stringifyIDs(data)
this function is to be used for debugging and error dumping

**Kind**: global function  

| Param | Description |
| --- | --- |
| data | object or array to be converted to CSV |


# Param types

## `key_columns<CompareBy>` param

Functions which compare array elements need to be instructed how two elements can be compared. This can be done in two ways:

* by passing a comparer function, which receives tow elements and returns a numeric value indicating the relation of the objects
* by passing an array of ID property names, which should be compared to determin the relation of the two objects

If an array of property names is passed, a comparer function will be compiled automatically (via `compileC`) function.

## `config<ArrayDiffConfig>` param

We can modify the way the functions work, by providing an **config object**. All the options in the `config` object are optional.

Here's a list of available options:

* [`sortLeftBy`](#sortLeftBy-and-sortRightBy) - how should the `leftA` array be sorted
* [`sortRightBy`](#sortLeftBy-and-sortRightBy) - how should the `rightA` be sorted
* `skipSort` - set it to `true` if arrays are not to be sorted
* `unique` - set it to `true` if are all the array elements unique - it speeds up the algorithm
* `linkName` - property assigned to the `rightA` elements, which should be pointing to the matching element in the `leftA`
* `mapName` - property assigned to the `leftA` elements, containig array of all the matched elemens from the `rightA`
* `callbackFn` - a callback function, which should be called for each of the matched element pairs

### `sortLeftBy` and `sortRightBy`

**Description:** defines how the arrays passed to the function should be sorted
**Defaults to**: value passed as `key_columns` param
**Expected value**: we can pass a function or an array of ID param names (see [`key_columns<CompareBy>`](#key_columns-CompareBy-param))

In order to be more efficient, functions wich rely on comparing array elements will sort both of the given arrays.

By default the functions use `key_columns` parameter to sort the arrays.

This can be overriden by specifying a dedicated sorting order for each of the two arrays:
* `config.sortLeftBy` = defines how the left array should be sorted (passed as the first param)
* `config.sortRightBy` = defines how the right array should be sorted (passed as the second param)

Sorting of an array can be disabled by assigning `null` to corresponding sort config param:
```javascript
{
    sortLeftBy: null // don't sort the left array
}
```

## `config<ArrayPurgeConfig>` param

This config si very similar to `ArrayDiffConfig` param type. The following params are the same as in `ArrayDiffConfig`:
* `sortLeftBy`
* `sortRightBy`
* `skipSort`

The following params are unique to this param type:

* `sortBy` = how should both arrays be sorted
* `mapRemoved` - flag indicating should removed elements be mapped and returned
* `matchMulti` - can an element from the hit list array be matched with multiple elements from the target array (defaults to `false`)

## `config<ArrayUniqueConfig>` param

* `skipSort` - set it to `true` if arrays are not to be sorted
* `elFreq` - output param - an array in which element frequency is to be recorded (see the example given in the [`uniqueA` method description](#uniqueA))

# Return Types

``ArrayDiffResult`` contains results of comparing two arrays. It has the following structure:
```javascript
{
    // an array of elements from left array (`leftA` param), which have not
    // been mathced with any of the elements of the right array (`rightA` param)
    leftDiff:Array<T>,
    // an array of elements from left array (`leftA` param), which have been mathced with at leas one element of the right array (`rightA` param)
    leftCommon:Array<T>,
    // an array of elements from right array (`rightA` param), which have not
    // been mathced with any of the elements of the left array (`leftA` param)
    rightCommon:Array<K>,
    // an array of elements from right array (`rightA` param), which have been mathced with at leas one element of the left array (`leftA` param)
    rightDiff:Array<K>
}
```