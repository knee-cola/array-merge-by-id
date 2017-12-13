import { originalArr } from './test-data';
import filterByKeys from '../lib/array-filter';

describe('filterByKeys', () => {

    let testData:Array<any>;

    beforeEach(() => {
        testData = originalArr.slice(); // using data copy in our tests
    })

    it("`filterByKeys` should return an array containign elements from the original array who's keys match the given values", () => {

        expect(filterByKeys(testData, ['mainID', 'subID'], {mainID:2, subID:2}))
            .toEqual([
                {mainID:2, subID:2, selfID:1, name:'vedran'}, // 8
                {mainID:2, subID:2, selfID:2, name:'barbara'}, // 9
                {mainID:2, subID:2, selfID:3, name:'patrik'}, // 10
                {mainID:2, subID:2, selfID:4, name:'dominik'} // 11
            ]);
    });

    it('`filterByKeys` should return an array containign elements of the original for which the comparer function has returned 0', () => {

        let comparerFn = (el:any):number=> (el.mainID===2 && el.subID===2 ? 0 : 1);

        expect(filterByKeys(testData, comparerFn))
            .toEqual([
                {mainID:2, subID:2, selfID:1, name:'vedran'}, // 8
                {mainID:2, subID:2, selfID:2, name:'barbara'}, // 9
                {mainID:2, subID:2, selfID:3, name:'patrik'}, // 10
                {mainID:2, subID:2, selfID:4, name:'dominik'} // 11
            ]);
    });

    it('`filterByKeys` should not change the order of elements in the original array', () => {
        filterByKeys(testData, ['mainID', 'subID'], {mainID:2, subID:2});
        expect(testData).toEqual(originalArr);
    });

    it('when `findFirstEl` kis set to TRUE, `filterByKeys` should return only the first matching element of the original array', () => {

        let findFirstEl = true;

        expect(filterByKeys(testData, ['mainID', 'subID'], {mainID:2, subID:2}, findFirstEl))
            .toEqual([
                {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
            ]);

        let comparerFn = (el:any):number => el.mainID===2 && el.subID===2 ? 0 : 1;

        expect(filterByKeys(testData, comparerFn, null, findFirstEl))
            .toEqual([
                {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
            ]);
    });
});