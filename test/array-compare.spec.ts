import { originalMainParentArr, originalSubparentArr, originalArr } from './test-data';
import { mockShuffledA, fnComparer } from './mocking-functions';
import compareA from '../lib/array-compare';
import * as compileComparer from '../lib/comparer-compiler';

describe('compareA', () => {

    let leftA,
        rightA,
        leftA_diff = originalArr.filter((el, ix, ar)=>ix==1||ix==2||ix==3||ix==11||ix==12||ix==13||ix==21||ix==22||ix==23),
        leftA_common = originalArr.filter((el, ix, ar)=>ix==9||ix==19||ix==29),
        rightA_diff = originalArr.filter((el, ix, ar)=>ix==4||ix==5||ix==6||ix==14||ix==15||ix==16||ix==24||ix==25||ix==26),
        rightA_common = originalArr.filter((el, ix, ar)=>ix==9||ix==19||ix==29),
        Array_prototype_sort = null;

    beforeEach(() => {
        leftA = originalArr.filter((el, ix, ar)=>ix==1||ix==2||ix==3||ix==11||ix==12||ix==13||ix==21||ix==22||ix==23||ix==9||ix==19||ix==29);
        rightA = originalArr.filter((el, ix, ar)=>ix==4||ix==5||ix==6||ix==14||ix==15||ix==16||ix==24||ix==25||ix==26||ix==9||ix==19||ix==29);
        
        // saving reference to original function ... just in case it's overridden with sa spy
        Array_prototype_sort = Array.prototype.sort;
    });

    afterEach(() => {
        leftA.forEach(el=>{ delete el.dummyLink; delete el.dummyMap; });
        rightA.forEach(el=>{ delete el.dummyLink; delete el.dummyMap; });
        // restoring the original method
        Array.prototype.sort = Array_prototype_sort;
    });

    it("`compareA` must compare the given arrays and must return an object mapping the differences and commonalities", function() {

        let diff = compareA(leftA, rightA,['mainID', 'subID', 'selfID']);

        expect(  diff.leftDiff     ).toEqual(leftA_diff);
        expect(  diff.leftCommon   ).toEqual(leftA_common);
        expect(  diff.rightDiff    ).toEqual(rightA_diff);
        expect(  diff.rightCommon  ).toEqual(rightA_common);
    });

    it("in case a callback function is passed `compareC` should call the function for each of the matched pairs", function() {

        let callbackFn = jest.fn(),
            diff = compareA(leftA,rightA,['mainID', 'subID', 'selfID'], { callbackFn: callbackFn });

        expect(callbackFn).toHaveBeenCalledWith(leftA_common[0], rightA_common[0]);
        expect(callbackFn).toHaveBeenCalledWith(leftA_common[1], rightA_common[1]);
        expect(callbackFn).toHaveBeenCalledWith(leftA_common[2], rightA_common[2]);
    });

    it("if config param contains `linkName` property, `compareC` should extend all the paired elements of the 2nd array with a reference pointing at it's pair in the 1st array'", function() {
        
        let diff = compareA(leftA, rightA, ['mainID', 'subID', 'selfID'], { linkName: 'dummyLink'});
        
        expect((<any>leftA_common[0]).dummyLink).toBe(rightA_common[0]);
        expect((<any>leftA_common[1]).dummyLink).toBe(rightA_common[1]);
        expect((<any>leftA_common[2]).dummyLink).toBe(rightA_common[2]);
    });
    
    it("if config param contains `mapName` property, `compareA` should extend all the paired elements of the 1st array with an array mapping all the pairs from the 2nd array", function() {
        
        let diff = compareA(leftA, rightA, ['mainID', 'subID', 'selfID'], { mapName: 'dummyMap'});
        
        expect((<any>leftA_common[0]).dummyMap).toEqual([rightA_common[0]]);
        expect((<any>leftA_common[1]).dummyMap).toEqual([rightA_common[1]]);
        expect((<any>leftA_common[2]).dummyMap).toEqual([rightA_common[2]]);
    });

    it("when sorting functions have been set via config, `compareA` should use them to sort the arrays ", function() {

        // always returning zero ... it's not important
        let sortLeftBy = ()=>0,
            sortRightBy = ()=>0;
        
        jest.spyOn(leftA, 'sort');
        jest.spyOn(rightA, 'sort');

        compareA(leftA, rightA, ['mainID', 'subID', 'selfID'], { sortLeftBy:sortLeftBy, sortRightBy:sortRightBy });

        expect(leftA.sort).toHaveBeenCalledWith(sortLeftBy);
        expect(rightA.sort).toHaveBeenCalledWith(sortRightBy);
    });

    it("if `skipSort` is set via config, `compareA` should not sort the arrays", function() {
        jest.spyOn(leftA, 'sort');
        jest.spyOn(rightA, 'sort');

        compareA(leftA, rightA, ['mainID', 'subID', 'selfID'], { skipSort:true });

        expect(leftA.sort).not.toHaveBeenCalled();
        expect(rightA.sort).not.toHaveBeenCalled();
    });

    it("in case a comparer function is passed instead of ID array, it should be called for each of the array items", function() {
        // always returning zero - it does not matter
        // ... but it will speed the process a bit
        let comparerFn = jest.fn(() => 0);

        // passing sorting function,
        // so that `comparerFn` doesn't get called there too
        compareA(leftA, leftA, comparerFn, { sortLeftBy: () => 0, sortRightBy: () => 0  });

        expect(comparerFn).toHaveBeenCalledTimes(leftA.length);
    });

    it("in case a comparer function is passed instead of ID array, it should be used for sorting the given arrays", function() {
        // always returning zero - it does not matter
        // ... but it will speed the process a bit
        let comparerFn = jest.fn(() => 0);

        jest.spyOn(rightA, 'sort');
        jest.spyOn(leftA, 'sort');

        compareA(leftA, rightA, comparerFn);

        expect(leftA.sort).toHaveBeenCalledWith(comparerFn);
        expect(rightA.sort).toHaveBeenCalledWith(comparerFn);
    });

    it("if `sortLeftBy` is set to `null` via config, `compareA` should not sort the left array", function() {
        jest.spyOn(leftA, 'sort');
        jest.spyOn(rightA, 'sort');

        compareA(leftA, rightA, ['mainID', 'subID', 'selfID'], { sortLeftBy: null });

        expect(leftA.sort).not.toHaveBeenCalled();
        expect(rightA.sort).toHaveBeenCalled();
    });

    it("if `sortRightBy` is set to `null` via config, `compareA` should not sort the right array", function() {
        jest.spyOn(leftA, 'sort');
        jest.spyOn(rightA, 'sort');

        compareA(leftA, rightA, ['mainID', 'subID', 'selfID'], { sortRightBy: null });

        expect(leftA.sort).toHaveBeenCalled();
        expect(rightA.sort).not.toHaveBeenCalled();
    });

    it("if `sortLeftBy` is set via config, `compareA` should use it to sort the left array, while the right array right array should be sorted via a `comparerFn`", function() {
        // always returning zero - it does not matter
        // ... but it will speed the process a bit
        let comparerFn = jest.fn(() => 0);
        let sortLeftBy = ()=>0;
        
        jest.spyOn(leftA, 'sort');
        jest.spyOn(rightA, 'sort');

        compareA(leftA, rightA, comparerFn, { sortLeftBy: sortLeftBy });

        expect(leftA.sort).toHaveBeenCalledWith(sortLeftBy);
        expect(leftA.sort).toHaveBeenCalledTimes(1);
        expect(rightA.sort).toHaveBeenCalledWith(comparerFn);
        expect(rightA.sort).toHaveBeenCalledTimes(1);
    });

    it("if `sortRightBy` is set via config, `compareA` should use it to sort the right array, while the left array right array should be sorted via a `comparerFn`", function() {
        // always returning zero - it does not matter
        // ... but it will speed the process a bit
        let comparerFn = jest.fn(() => 0);
        let sortRightBy = ()=>0;
        
        jest.spyOn(leftA, 'sort');
        jest.spyOn(rightA, 'sort');

        compareA(leftA, rightA, comparerFn, { sortRightBy: sortRightBy });

        expect(leftA.sort).toHaveBeenCalledWith(comparerFn);
        expect(leftA.sort).toHaveBeenCalledTimes(1);
        expect(rightA.sort).toHaveBeenCalledWith(sortRightBy);
        expect(rightA.sort).toHaveBeenCalledTimes(1);
    });

    // 
    it("if a list of key column names was passed, it should be used to compile a comparer function", function() {
        let keys = ['mainID', 'subID', 'selfID'];
        jest.spyOn(compileComparer, 'default')
        let diff = compareA(leftA, leftA, keys);
        expect(compileComparer.default).toHaveBeenCalledWith(keys);

        // here we can't really test if the arrays were sorted via the compiled function,
        // since the dependency wasn't mocked ... and we can't get the compiled function
    });
});
