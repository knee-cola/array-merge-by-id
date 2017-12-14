import uniqueA from '../lib/array-unique';

describe('`uniqueA`', () => {

    let _unique_originalA = [{id:1},{id:1},{id:2},{id:2},{id:2},{id:1},{id:3},{id:3},{id:3},{id:2},{id:3},{id:4},{id:4}];
    
    let testData;
    
    beforeEach(() => {
        testData = _unique_originalA.slice();
    });

    it('`uniqueA` should return an array of unique elements extracted from the original array', () => {
        expect(uniqueA(testData, ['id'])).toEqual([{id:1},{id:2},{id:3},{id:4}]);
    });

    it('`uniqueA` should support using a callback function for testing if two elements are identical', () => {
        let comparerFn = (leftEl, rightEl) => leftEl.id===rightEl.id ? 0 : (leftEl.id>rightEl.id ? 1 : -1);
        expect(uniqueA(testData, comparerFn)).toEqual([{id:1},{id:2},{id:3},{id:4}]);
    });

    it('`uniqueA` must not change the order of elements in the original array, but only if `skipSort` config param was set to TRUE', () => {
        uniqueA(testData, ['id'], {skipSort: true});
        expect(testData).toEqual(_unique_originalA);

        uniqueA(testData, ['id']);
        expect(testData).not.toEqual(_unique_originalA);
    });
});
