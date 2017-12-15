import { sortOn, clear, overwrite, concat } from '../lib/simple-methods';
import { childData } from './test-data/parent-child-data';
import { ChildDataRow } from './test-data/test-data-types';

describe('sortOn', () => {

    let orderedData:Array<ChildDataRow> = childData,
        shuffledData:Array<ChildDataRow>;
    
    beforeEach(() => {
        shuffledData = [
            orderedData[4],
            orderedData[1],
            orderedData[0],
            orderedData[3],
            orderedData[2]
        ];
    });

    it("`sortOn` should use the passed function to do the sorting", function() {
        let fnComparer = (left, right) => left.FamilyID < right.FamilyID ? -1 : (left.FamilyID > right.FamilyID ? 1 : (left.MemberID < right.MemberID ? -1 : (left.MemberID > right.MemberID ? 1 : 0)) );
        let result = sortOn(shuffledData, fnComparer);
        expect(result).toEqual(orderedData);
    });

    it("`sortOn` should use the passed key name array to do the sorting ", function() {
        expect(sortOn(shuffledData, ['FamilyID', 'MemberID'])).toEqual(orderedData);
    });

    it("`sortOn` use the native `Array.sort` functon for sorting", function() {
        jest.spyOn(shuffledData, 'sort');
        
        let fnComparer = () => 0;
        let result = sortOn(shuffledData, fnComparer);
        expect(shuffledData.sort).toHaveBeenCalledWith(fnComparer);
    });
});

describe('simple functions', () => {

    it('`clear` should remove all elemnts of given array without destroying the original array object', () => {
        let originalA = [1,2,3,4,5,6];
        clear(originalA);
        expect(originalA.length).toBe(0);
    });

    it('`clear` should return the cleared array', () => {
        let originalA = [1,2,3,4,5,6];
        expect(clear(originalA)).toBe(originalA);
    });

    it('`concat` should add all the elements of the `source` array at the end of the `target` array', () => {
        let targetA = [1,2,3,4];
        concat(targetA, ['a','b','c','d']);
        expect(targetA).toEqual([1,2,3,4,'a','b','c','d']);
    });

    it('`concat` should return a reference to the `target` array', () => {
        let targetA = [1,2,3,4];
        expect(concat(targetA, ['a','b','c','d'])).toBe(targetA);
    });

    it('`overwrite` should remove all the element of the `target` array and replace them with elements of `source` array', () => {
        let targetA = [1,2,3,4];
        overwrite(targetA, ['a','b','c','d']);
    });

    it('`overwrite` should return the `target` array', () => {
        let targetA = [1,2,3,4];
        expect(overwrite(targetA, ['a','b','c','d'])).toBe(targetA);
    });
});
