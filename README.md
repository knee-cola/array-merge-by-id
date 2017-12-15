[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

## Functions

<dl>
<dt><a href="#compareA">compareA(leftA, rightA¸second, key_columns, config)</a> ⇒ <code>ArrayDiffResult.&lt;T, K&gt;</code></dt>
<dd><p>Both input arrays will be sorted in ascending manner (<code>key_columns</code> will be used).
             This can be disabled by setting <code>sortLeftBy</code> and <code>sortRightBy</code> in config parameter.
             Note2: since elements are compared by comparing key values, the two arrays can contain
             totally different objects, which only share key values</p>
</dd>
<dt><a href="#filterByKeys">filterByKeys(aSearch, key_columns, key_values, findFirstOnly)</a></dt>
<dd><p>Extract array elements which match the given key values</p>
</dd>
<dt><a href="#findFirstById">findFirstById(aSearch, key_columns, key_values)</a></dt>
<dd><p>Returns the first matched element of the given type</p>
</dd>
<dt><a href="#indexOf">indexOf(aSearch, key_columns, key_values)</a></dt>
<dd><p>Returns index of first element in the given array which is matched by provided key values</p>
</dd>
<dt><a href="#linkA">linkA(parentA, childA, key_columns, linkName, config)</a></dt>
<dd><p>this method sorts both of the provided arrays (this can be disabled via <code>config</code>)</p>
</dd>
<dt><a href="#mergeA">mergeA(currData, newData, sortKeys, config)</a></dt>
<dd><p>this sorts the given arrays, where it uses the <code>sortKeys</code> param. Also the <code>currData</code> will be concatinated with new elements from <code>newData</code> array</p>
</dd>
<dt><a href="#purgeA">purgeA(aTarget, aHitList, key_columns, config)</a></dt>
<dd><p>Both input arrays will be sorted in ascending manner (<code>key_columns</code> will be used).
This can be disabled by setting <code>skipSort</code> to <code>true</code>, or <code>sortLeftBy</code> and <code>sortRightBy</code> in <code>config</code></p>
</dd>
<dt><a href="#uniqueA">uniqueA(source, key_columns, config)</a></dt>
<dd><p>Removes duplicates from an array and returns a new unique array</p>
</dd>
<dt><a href="#compileC">compileC(aKeys)</a></dt>
<dd><p>Compiles a function which compares two data elements and detects which
precedes which. It bases the comparison on the the
given list of numeric keys. The resulting function can be used in i.e. <code>Array.sort</code></p>
</dd>
<dt><a href="#eachPair">eachPair(leftA, rightA, key_columns, callbackFn, config)</a></dt>
<dd><p>Calls a callback method for each matched elements of two provided arrays</p>
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

## compareA(leftA, rightA¸second, key_columns, config) ⇒ <code>ArrayDiffResult.&lt;T, K&gt;</code>
Both input arrays will be sorted in ascending manner (`key_columns` will be used).             This can be disabled by setting `sortLeftBy` and `sortRightBy` in config parameter.             Note2: since elements are compared by comparing key values, the two arrays can contain             totally different objects, which only share key values

**Kind**: global function  
**Returns**: <code>ArrayDiffResult.&lt;T, K&gt;</code> - comparisson results  

| Param | Type | Description |
| --- | --- | --- |
| leftA | <code>Array.&lt;T&gt;</code> | first array be compared |
| rightA¸second | <code>Array.&lt;K&gt;</code> | array be compared |
| key_columns | <code>CompareBy</code> | list of key columns or comparer function, which should be used to compare/match elements |
| config | <code>ArrayDiffConfig</code> | additional parameters |

<a name="filterByKeys"></a>

## filterByKeys(aSearch, key_columns, key_values, findFirstOnly)
Extract array elements which match the given key values

**Kind**: global function  

| Param | Description |
| --- | --- |
| aSearch | array to be searched |
| key_columns | list of key columns or comparer function, which should be used to compare/match elements |
| key_values | key values to be found |
| findFirstOnly | should only the first matched element be returned (defaults to `false`) |

<a name="findFirstById"></a>

## findFirstById(aSearch, key_columns, key_values)
Returns the first matched element of the given type

**Kind**: global function  

| Param | Description |
| --- | --- |
| aSearch | array to be searched |
| key_columns | key column names |
| key_values | key values to be matched |

<a name="indexOf"></a>

## indexOf(aSearch, key_columns, key_values)
Returns index of first element in the given array which is matched by provided key values

**Kind**: global function  

| Param | Description |
| --- | --- |
| aSearch | array to be searched |
| key_columns | key column names |
| key_values | key column values |

<a name="linkA"></a>

## linkA(parentA, childA, key_columns, linkName, config)
this method sorts both of the provided arrays (this can be disabled via `config`)

**Kind**: global function  

| Param | Default | Description |
| --- | --- | --- |
| parentA |  | array containting parent elements |
| childA |  | array containing child elements |
| key_columns |  | key column names or comparer function, which will be used to match elements of two arrays |
| linkName | <code>parent</code> | name of the property which should be assigned a reference to parent element (defaults to 'parent') |
| config |  | detailed configuration, containing |

<a name="mergeA"></a>

## mergeA(currData, newData, sortKeys, config)
this sorts the given arrays, where it uses the `sortKeys` param. Also the `currData` will be concatinated with new elements from `newData` array

**Kind**: global function  

| Param | Description |
| --- | --- |
| currData | an array of "current" data elements |
| newData | an array of changes and new data elements |
| sortKeys | key name array or a comparer function, which will be used to compare elements of the two arrays |
| config | additional config, which can contain a callback function (it's optional) |

<a name="purgeA"></a>

## purgeA(aTarget, aHitList, key_columns, config)
Both input arrays will be sorted in ascending manner (`key_columns` will be used).This can be disabled by setting `skipSort` to `true`, or `sortLeftBy` and `sortRightBy` in `config`

**Kind**: global function  

| Param | Description |
| --- | --- |
| aTarget | array to be purged |
| aHitList | hit list - indicates which element from `aTarget` should be removed |
| key_columns | list of key columns or comparer function, which should be used to compare/match elements |
| config | additional config parameters |

<a name="uniqueA"></a>

## uniqueA(source, key_columns, config)
Removes duplicates from an array and returns a new unique array

**Kind**: global function  

| Param | Description |
| --- | --- |
| source | source array - which may contain duplicates |
| key_columns | list of key columns or comparer function, which should be used to compare/match elements |
| config | additional config parameters |

<a name="compileC"></a>

## compileC(aKeys)
Compiles a function which compares two data elements and detects whichprecedes which. It bases the comparison on the thegiven list of numeric keys. The resulting function can be used in i.e. `Array.sort`

**Kind**: global function  

| Param | Description |
| --- | --- |
| aKeys | list of keys, which should be used to compare two array elements.              Default compare direction is ASC, which can be changed to DESC by adding ":desc" suffix to key name. |

<a name="eachPair"></a>

## eachPair(leftA, rightA, key_columns, callbackFn, config)
Calls a callback method for each matched elements of two provided arrays

**Kind**: global function  

| Param | Description |
| --- | --- |
| leftA | first array of elements |
| rightA | second array of elements |
| key_columns | list of key columns or comparer function, which should be used to compare/match elements |
| callbackFn | function to be called for each of mathced element pairs |
| config | additional parameters |

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


* * *

&copy; 1942-2016 Muhammad Ali