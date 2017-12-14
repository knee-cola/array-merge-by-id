import compareA from '../lib/array-compare';

import { ParentDataRow, ChildDataRow } from './test-data/test-data-types';
import { SingleTCase, singleTableCases, singleTableOverlapingCases  } from './test-data/single-table-cases';
import { ParentChildCase, parentChildCases, parentChildOverlapCases, simpleCase } from './test-data/parent-child-cases';

import * as compileComparer from '../lib/comparer-compiler';
import { cloneDeep } from 'lodash';

const parentKey = ["FamilyID"];
const childKey = ["MemberID"];

// the followin tests compare two tables containting the same type of data
describe('`compareA` edge test cases with single-data-type tables', () => {

    // thie following test should be done for multiple edge cases
    singleTableCases.forEach( (testCase:SingleTCase) => {

        // protecting the original test data
        testCase = cloneDeep(testCase);

        it("("+testCase.caseName+") `compareA` must compare the given arrays and must return an object mapping the differences and commonalities", function() {
            let diff = compareA(testCase.leftA, testCase.rightA, childKey);
            expect(  diff.leftDiff     ).toEqual(testCase.expected.leftDiff);
            expect(  diff.leftCommon   ).toEqual(testCase.expected.leftCommon);
            expect(  diff.rightDiff    ).toEqual(testCase.expected.rightDiff);
            expect(  diff.rightCommon  ).toEqual(testCase.expected.rightCommon);
        });
    });

    // thie following test should be done for multiple edge cases
    singleTableOverlapingCases.forEach( (testCase:SingleTCase) => {

        // protecting the original test data
        testCase = cloneDeep(testCase);

        it("("+testCase.caseName+")in case a callback function is passed `compareC` should call the function for each of the matched pairs", function() {
        
            
            let callbackFn = jest.fn(),
            diff = compareA(testCase.leftA, testCase.rightA, childKey, { callbackFn: callbackFn });
            
            for(let j:number=0; j<testCase.expected.leftCommon.length; j++) {
                expect(callbackFn).toHaveBeenCalledWith(testCase.expected.leftCommon[j], testCase.expected.rightCommon[j]);
            }
        });
    });
});

// the followin tests compare two tables containting different type of data
describe('`compareA` edge test cases with two-data-type tables', () => {
        
    // thie following test should be done for multiple edge cases
    parentChildCases.forEach( (testCase:ParentChildCase) => {

        // protecting the original test data
        testCase = cloneDeep(testCase);

        it("("+testCase.caseName+") it should propertly match parent and child elements", function() {

            let diff = compareA(testCase.parentA, testCase.childA, parentKey);

            // checking if the proper elements have been matched
            expect(diff.leftDiff).toEqual(testCase.expected.childless);
            expect(diff.leftCommon).toEqual(testCase.expected.matchedParents);
            expect(diff.rightCommon).toEqual(testCase.expected.matchedChildren);
            expect(diff.rightDiff).toEqual(testCase.expected.orphans);
        });
    });
    
    // thie following test should be done for multiple edge cases
    parentChildCases.forEach( (testCase:ParentChildCase) => {

        // protecting the original test data
        testCase = cloneDeep(testCase);

        it("("+testCase.caseName+") if config param contains `linkName` property, `compareC` should extend all the paired elements of the 2nd array with a reference pointing at it's pair in the 1st array'", function() {

            let diff = compareA(testCase.parentA, testCase.childA, parentKey, { linkName: 'dummyLink'});

           for(let j:number=0; j<diff.rightCommon.length; j++) {
               let oneChild:ChildDataRow = diff.rightCommon[j],
                   oneParent:ParentDataRow = diff.leftCommon.filter(parent => parent.FamilyID == oneChild.FamilyID)[0]

               expect(oneChild.dummyLink).toBe(oneParent);
           }
        });
    });

    // thie following test should be done for multiple edge cases
    parentChildCases.forEach( (testCase:ParentChildCase) => {
        
        // protecting the original test data
        testCase = cloneDeep(testCase);

        it("("+testCase.caseName+") if config param contains `mapName` property, `compareA` should extend all the paired elements of the 1st array with an array mapping all the pairs from the 2nd array", function() {
            
            let diff = compareA(testCase.parentA,testCase.childA, parentKey, { mapName: 'dummyMap'});

            for(let j:number=0; j<diff.leftCommon.length; j++) {
                let oneParent = diff.leftCommon[j],
                    expectedMap = testCase.childA.filter( child => child.FamilyID == oneParent.FamilyID );

                expect(oneParent.dummyMap).toEqual(expectedMap);
            }
        });
    });

    // thie following test should be done for multiple edge cases
    parentChildCases.forEach( (testCase:ParentChildCase) => {
        
        // protecting the original test data
        testCase = cloneDeep(testCase);

        // this is a regression test added after fixing a bug
        it("("+testCase.caseName+")`compareA` should not modify input arrays if `mapName` params is not given", () => {
            
            // copying original file to preserve the structure
            let parentA_copy = cloneDeep(testCase.parentA);
            let childA_copy = cloneDeep(testCase.childA);
            
            let diff = compareA(parentA_copy, childA_copy, parentKey);
            
            expect(parentA_copy).toEqual(testCase.parentA);
            expect(childA_copy).toEqual(testCase.childA);
        });
    });

    // thie following test should be done for multiple edge cases
    parentChildCases.forEach( (testCase:ParentChildCase) => {
        
        // protecting the original test data
        testCase = cloneDeep(testCase);

        // this is a regression test added after fixing a bug
        it("("+testCase.caseName+")`compareA` should not modify left array elements if `linkName` params is not given", function() {
    
            // copying original file to preserve the structure
            let parentA_copy = cloneDeep(testCase.parentA);
            let childA_copy = cloneDeep(testCase.childA);
            
            let diff = compareA(parentA_copy, childA_copy, parentKey);
    
            expect(parentA_copy).toEqual(testCase.parentA);
            expect(childA_copy).toEqual(testCase.childA);
        });
    });
});

// the following tests run only for a single case
// since data structure is not really important
describe('`compareA` single case tests', () => {

    let testCase:ParentChildCase;

    beforeEach(() => {
        // protecting the original test data
        testCase = cloneDeep(simpleCase);
    });

    it("when sorting functions have been set via config, `compareA` should use them to sort the arrays ", function() {
        // always returning zero ... it's not important
        let sortLeftBy = ()=>0,
            sortRightBy = ()=>0;
            
        jest.spyOn(testCase.parentA, 'sort');
        jest.spyOn(testCase.childA, 'sort');

        compareA(testCase.parentA,testCase.childA, childKey, { sortLeftBy:sortLeftBy, sortRightBy:sortRightBy });

        expect(testCase.parentA.sort).toHaveBeenCalledWith(sortLeftBy);
        expect(testCase.childA.sort).toHaveBeenCalledWith(sortRightBy);
    });

    it("if `skipSort` is set via config, `compareA` should not sort the arrays", function() {

        jest.spyOn(testCase.parentA, 'sort');
        jest.spyOn(testCase.childA, 'sort');

        compareA(testCase.parentA,testCase.childA, childKey, { skipSort:true });

        expect(testCase.parentA.sort).not.toHaveBeenCalled();
        expect(testCase.childA.sort).not.toHaveBeenCalled();
    });

    it("in case a comparer function is passed instead of ID array, it should be called for each of the array items", function() {
        // always returning zero - it does not matter
        // ... but it will speed the process a bit
        let comparerFn = jest.fn(() => 0);

        // passing sorting function,
        // so that `comparerFn` doesn't get called there too
        compareA(testCase.parentA, testCase.parentA, comparerFn, { sortLeftBy: () => 0, sortRightBy: () => 0  });

        expect(comparerFn).toHaveBeenCalledTimes(testCase.parentA.length);
    });

    it("in case a comparer function is passed instead of ID array, it should be used for sorting the given arrays", function() {
        // always returning zero - it does not matter
        // ... but it will speed the process a bit
        let comparerFn = jest.fn(() => 0);

        jest.spyOn(testCase.childA, 'sort');
        jest.spyOn(testCase.parentA, 'sort');

        compareA(testCase.parentA,testCase.childA, comparerFn);

        expect(testCase.parentA.sort).toHaveBeenCalledWith(comparerFn);
        expect(testCase.childA.sort).toHaveBeenCalledWith(comparerFn);
    });

    it("if `sortLeftBy` is set to `null` via config, `compareA` should not sort the left array", function() {
        jest.spyOn(testCase.parentA, 'sort');
        jest.spyOn(testCase.childA, 'sort');

        compareA(testCase.parentA,testCase.childA, childKey, { sortLeftBy: null });

        expect(testCase.parentA.sort).not.toHaveBeenCalled();
        expect(testCase.childA.sort).toHaveBeenCalled();
    });

    it("if `sortRightBy` is set to `null` via config, `compareA` should not sort the right array", function() {
        jest.spyOn(testCase.parentA, 'sort');
        jest.spyOn(testCase.childA, 'sort');

        compareA(testCase.parentA,testCase.childA, childKey, { sortRightBy: null });

        expect(testCase.parentA.sort).toHaveBeenCalled();
        expect(testCase.childA.sort).not.toHaveBeenCalled();
    });

    it("if `sortLeftBy` is set via config, `compareA` should use it to sort the left array, while the right array right array should be sorted via a `comparerFn`", function() {
        // always returning zero - it does not matter
        // ... but it will speed the process a bit
        let comparerFn = jest.fn(() => 0);
        let sortLeftBy = ()=>0;
        
        jest.spyOn(testCase.parentA, 'sort');
        jest.spyOn(testCase.childA, 'sort');

        compareA(testCase.parentA,testCase.childA, comparerFn, { sortLeftBy: sortLeftBy });

        expect(testCase.parentA.sort).toHaveBeenCalledWith(sortLeftBy);
        expect(testCase.parentA.sort).toHaveBeenCalledTimes(1);
        expect(testCase.childA.sort).toHaveBeenCalledWith(comparerFn);
        expect(testCase.childA.sort).toHaveBeenCalledTimes(1);
    });

    it("if `sortRightBy` is set via config, `compareA` should use it to sort the right array, while the left array right array should be sorted via a `comparerFn`", function() {
        // always returning zero - it does not matter
        // ... but it will speed the process a bit
        let comparerFn = jest.fn(() => 0);
        let sortRightBy = ()=>0;
        
        jest.spyOn(testCase.parentA, 'sort');
        jest.spyOn(testCase.childA, 'sort');

        compareA(testCase.parentA,testCase.childA, comparerFn, { sortRightBy: sortRightBy });

        expect(testCase.parentA.sort).toHaveBeenCalledWith(comparerFn);
        expect(testCase.parentA.sort).toHaveBeenCalledTimes(1);
        expect(testCase.childA.sort).toHaveBeenCalledWith(sortRightBy);
        expect(testCase.childA.sort).toHaveBeenCalledTimes(1);
    });

    it("if a list of key column names was passed, it should be used to compile a comparer function", function() {
        jest.spyOn(compileComparer, 'default')
        let diff = compareA(testCase.parentA, testCase.parentA, childKey);
        expect(compileComparer.default).toHaveBeenCalledWith(childKey);

        // here we can't really test if the arrays were sorted via the compiled function,
        // since the dependency wasn't mocked ... and we can't get the compiled function
    });
});
