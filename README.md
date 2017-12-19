# What's this?

This is a set of functions specialized in comparing and merging arrays of elements signed by unique set of IDs.
This is typically used in scenario in which client-side data-sets with changes comming from the an SQL server (server > client replication).

The center stage of this toolkit is the `mergeA` function, which merges two arrays. The following snippet demonstrates how this function can apply (merging, replicating) changes to an existing data array:

```javascript
let currData = [
    {cityID:1, cityName:'New York'},
    {cityID:2, cityName:'Londonnnnn'} // there's a typo here
];

let newData = [
    {cityID:2, cityName:'London'}, // typo is fixed
    {cityID:3, cityName:'Rome' } // new city is added
];

// function which applies changes to an existing element
// - it will be called for each matched pair of elements
let mergeFn = (element, changes) => { element.cityName = changes.cityName; };

let result = mergeA(currData, newData, ['cityID'], { callbackFn: mergeFn });

// the following statement will print
//  [
//     {cityID:1, cityName:'New York'},
//     {cityID:2, cityName:'London'},    <= name is fixed
//     {cityID:3, cityName:'Rome' }      <= new city is added
//  ];
console.dir(currData);
```

Documentation for each of the functions can be found below ...

## Functions

<dl>
<dt><a href="#compareA">compareA(leftA, rightA, key_columns, config)</a> ⇒ <code>ArrayDiffResult</code></dt>
<dd><p>Compares elements of two arrays and returns an object containing common elements and differences.</p>
</dd>
<dt><a href="#filterByKeys">filterByKeys(aSearch, key_columns, key_values, findFirstOnly)</a> ⇒ <code>Array</code></dt>
<dd><p>Extract all the array elements which match the given key values (or are indicated by a comparer function)</p>
</dd>
<dt><a href="#findFirstById">findFirstById(aSearch, key_columns, key_values)</a> ⇒ <code>Object</code></dt>
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
<dt><a href="#purgeA">purgeA(aTarget, aHitList, key_columns, config)</a> ⇒ <code>Array</code></dt>
<dd><p>Removes elements indicated by a hit list from the provided array</p>
</dd>
<dt><a href="#uniqueA">uniqueA(source, key_columns, config)</a> ⇒ <code>Array</code></dt>
<dd><p>Copies unique elements from <code>source</code> to a new array, which is then returned</p>
</dd>
<dt><a href="#compileC">compileC(key_columns)</a> ⇒ <code>function</code></dt>
<dd><p>Compiles and returns a function which compares two data elements and detects which comes before which in an orderd list.
The compiled function expects the compared values to be numeric</p>
</dd>
<dt><a href="#eachPair">eachPair(leftA, rightA, key_columns, callbackFn, config)</a> ⇒ <code>ArrayDiffResult</code></dt>
<dd><p>Calls a callback method for each matched elements of provided arrays</p>
</dd>
<dt><a href="#sortOn">sortOn(source, key_columns)</a></dt>
<dd><p>Sorts the given array based on the given key name array (or comparer function)</p>
</dd>
<dt><a href="#clear">clear(target)</a></dt>
<dd><p>Removes all the elements of the given array</p>
</dd>
<dt><a href="#overwrite">overwrite(target, source)</a></dt>
<dd><p>removes all the elements of <code>target</code> and replaces them with elements from <code>source</code></p>
</dd>
<dt><a href="#concat">concat(target, source)</a> ⇒ <code>Array</code></dt>
<dd><p>Does an in-place concatination of elements of the <code>source</code> array at the end of <code>target</code> array</p>
</dd>
<dt><a href="#stringifyIDs">stringifyIDs(data)</a> ⇒ <code>string</code></dt>
<dd><p>Creates CSV containing values of all the keys ending with &quot;ID&quot;. It&#39;s usefull for debugging</p>
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

**Example**  
```js
let leftA = [
  {cityID:1, cityName:'New York', weather:"windy"},
  {cityID:2, cityName:'London',   weather:"raining"}
];

let rightA = [
  {cityID:2, cityName:'London', weather:"thunderstorm"},
  {cityID:3, cityName:'Moscow', weather:"snowing"}
];

let diff = compareA(leftA, rightA, ["cityID"]);

// statment below will print:
// {
//   leftDiff: [{cityID:1, cityName:'New York', weather:"windy"}],         <= New York doesn't exist in the `rightA`
//   leftCommon: [{cityID:2, cityName:'London', weather:"raining"}],       <= London does exist in `rightA`
//   rightDiff: [{cityID:3, cityName:'Moscow', weather:"snowing"}],        <= Moscow exists in `leftA`
//   rightCommon: [{cityID:2, cityName:'London', weather:"thunderstorm"}]  <= London exists in `leftA`
// }
console.dir(diff);
```
<a name="filterByKeys"></a>

## filterByKeys(aSearch, key_columns, key_values, findFirstOnly) ⇒ <code>Array</code>
Extract all the array elements which match the given key values (or are indicated by a comparer function)

**Kind**: global function  
**Returns**: <code>Array</code> - array of matched elements  

| Param | Type | Description |
| --- | --- | --- |
| aSearch | <code>Array</code> | array to be searched |
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

## findFirstById(aSearch, key_columns, key_values) ⇒ <code>Object</code>
Returns the first matched element of the given type

**Kind**: global function  
**Returns**: <code>Object</code> - matched array element  

| Param | Type | Description |
| --- | --- | --- |
| aSearch | <code>Array</code> | array to be searched |
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
| aSearch | <code>Array</code> | array to be searched |
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
| parentA | <code>Array</code> |  | array containting parent elements |
| childA | <code>Array</code> |  | array containing child elements |
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
| currData | <code>Array</code> | an array of "current" data elements |
| newData | <code>Array</code> | an array of changes and new data elements |
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

## purgeA(aTarget, aHitList, key_columns, config) ⇒ <code>Array</code>
Removes elements indicated by a hit list from the provided array

**Kind**: global function  
**Returns**: <code>Array</code> - an array of removed elements  

| Param | Type | Description |
| --- | --- | --- |
| aTarget | <code>Array</code> | array to be purged |
| aHitList | <code>Array</code> | hit list - indicates which element from `aTarget` should be removed |
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

## uniqueA(source, key_columns, config) ⇒ <code>Array</code>
Copies unique elements from `source` to a new array, which is then returned

**Kind**: global function  
**Returns**: <code>Array</code> - array of unique elements  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Array</code> | source array - which may contain duplicates |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| config | <code>ArrayUniqueConfig</code> | (optional) additional config parameters (see [ArrayUniqueConfig](#arrayuniqueconfig)) |

**Example**  
```js
let source = [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'}, {cityID:2, cityName:'London'} ];

let result = uniqueA(source, ["cityID"]);

console.dir(result); // will print [ {cityID:1, cityName:'New York'}, {cityID:2, cityName:'London'} ]
```
<a name="compileC"></a>

## compileC(key_columns) ⇒ <code>function</code>
Compiles and returns a function which compares two data elements and detects which comes before which in an orderd list.
The compiled function expects the compared values to be numeric

**Kind**: global function  
**Returns**: <code>function</code> - compiled function  

| Param | Type | Description |
| --- | --- | --- |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |

**Example**  
```js
// function for an ASCENDING order
let ascFn = compileC('cityID','streetID');

// will return 0
ascFn({cityID:1, streetID:1}, {cityID:1, streetID:1});

// will return 1
ascFn({cityID:1, streetID:1}, {cityID:1, streetID:2});

// will return -1
ascFn({cityID:2, streetID:1}, {cityID:1, streetID:2});

// function for an DESCENDING order
let descFn = compileC('cityID:desc','streetID:desc');

// will return 0
descFn({cityID:1, streetID:1}, {cityID:1, streetID:1});

// will return -1
descFn({cityID:1, streetID:1}, {cityID:1, streetID:2});

// will return 1
descFn({cityID:2, streetID:1}, {cityID:1, streetID:2});
```
<a name="eachPair"></a>

## eachPair(leftA, rightA, key_columns, callbackFn, config) ⇒ <code>ArrayDiffResult</code>
Calls a callback method for each matched elements of provided arrays

**Kind**: global function  
**Returns**: <code>ArrayDiffResult</code> - [comparisson results object](#arraydiffresult)  

| Param | Type | Description |
| --- | --- | --- |
| leftA | <code>Array</code> | first array of elements |
| rightA | <code>Array</code> | second array of elements |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |
| callbackFn | <code>function</code> | function to be called for each of mathced element pairs |
| config | <code>ArrayDiffConfig</code> | (optional) [additional config parameters](#configarraydiffconfig-param) |

**Example**  
```js
let cities = [ {cityID:22, name:'New York'}, {cityID:44, name:'London'} ];
let streets = [{cityID:22, streetID:1, name:'Elm Street'}, {cityID:22, streetID:3, name:'Wall St'}, {cityID:44, streetID:2, name:'Downing St'}];

let callbackFn = (city, street) => {
  console.log(street.name + ' ' + city.name)
}

eachPair(cities, streets, ["cityID"], callbackFn);

// The following will be printed to console:
// Elm Street in New York
// Wall St in New York
// Downing St in London
```
<a name="sortOn"></a>

## sortOn(source, key_columns)
Sorts the given array based on the given key name array (or comparer function)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Array</code> | array to be sorted |
| key_columns | <code>CompareBy</code> | definition on how elements of two arrays should be compared (see [`key_columns<CompareBy>` param](#key_columnscompareby-param)) |

**Example**  
```js
let source = [{cityID:2},{cityID:3},{cityID:1}];

// sorting in ASCENDING order
sortOn(source, ["cityID"]);

console.log(source); // will print [{cityID:1},{cityID:2},{cityID:3}];

// sorting in DESCENDING order
sortOn(source, ["cityID:desc"]);

let streets = [
   {cityID:22, streetID:1, name:'Elm Street'},
   {cityID:44, streetID:2, name:'Downing St'},
   {cityID:22, streetID:3, name:'Wall St'}
];

// using multiple keys
sortOn(source, ["cityID", "streetID:desc"]);
```
<a name="clear"></a>

## clear(target)
Removes all the elements of the given array

**Kind**: global function  

| Param | Type |
| --- | --- |
| target | <code>Array</code> | 

**Example**  
```js
let source = [{cityID:2},{cityID:3},{cityID:1}];

clear(source);

console.dir(source); // will print []
```
<a name="overwrite"></a>

## overwrite(target, source)
removes all the elements of `target` and replaces them with elements from `source`

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Array</code> | array to be overwritten |
| source | <code>Array</code> | array who's elements are to be places in `target` |

**Example**  
```js
let target = [{cityID:100},{cityID:200}];
let source = [{cityID:2},{cityID:3},{cityID:1}];

overwrite(target, source);

console.dir(target); // will print [{cityID:2},{cityID:3},{cityID:1}]
```
<a name="concat"></a>

## concat(target, source) ⇒ <code>Array</code>
Does an in-place concatination of elements of the `source` array at the end of `target` array

**Kind**: global function  
**Returns**: <code>Array</code> - reference to the `target` array  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Array</code> | array which should receive new elements |
| source | <code>Array</code> | array of elements which should be added at the end of the `target` array |

**Example**  
```js
let target = [{cityID:100},{cityID:200}];
let source = [{cityID:2},{cityID:3},{cityID:1}];

concat(target, source);

console.dir(target); // will print [{cityID:100},{cityID:200},{cityID:2},{cityID:3},{cityID:1}]
```
<a name="stringifyIDs"></a>

## stringifyIDs(data) ⇒ <code>string</code>
Creates CSV containing values of all the keys ending with "ID". It's usefull for debugging

**Kind**: global function  
**Returns**: <code>string</code> - CSV of key values  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | object or array to be converted to CSV |

**Example**  
```js
let obj = { cityID: 11, streetID: 22, streetName: 'Elm Street' };

let result = stringifyIDs(obj);

console.log(result); // will print "cityID:11,streetID:22"
```

# Param types

## `key_columns<CompareBy>` param

Functions which compare array elements need to be instructed how two elements can be compared. This can be done in two ways:

* by passing a comparer function, which receives tow elements and returns a numeric value indicating the relation of the objects
* by passing an array of ID property names, which should be compared to determin the relation of the two objects

If an array of property names is passed, a comparer function will be compiled automatically (via `compileC`) function.

### Descending order

If a ID name array is passed as `key_columns` params, the compiled function will compare elements in ascending order.
We can change this behaviour by appending `:desc` to a ID name ... like so: ['cityID:desc','streetID:desc']

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
## `ArrayDiffResult`
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