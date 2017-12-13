import indexOf from '../lib/array-index-of';
import { mockShuffledA } from './mocking-functions';


describe('`indexOf`', () => {

    let testDataCache:Array<any> = mockShuffledA([7, 29, 28, 9, 11, 5, 10, 8, 27, 4, 3, 26, 20, 25, 6, 15, 1, 21, 0, 18, 19, 22, 23, 24, 16, 2, 17]); // iz popisa sam izbacio 12, 13 i 14 -> tako 3 ostaje bez djece;
    let testData:Array<any>;

    beforeEach(() => {
        // copy the original data ... so that we don't mess it up
        testData = testDataCache.slice();
    });
    
    it("`indexOf` should return index of an element", function(){
        let keyCols = ['mainID', 'subID', 'selfID'];

        expect(  indexOf(testData, keyCols, testData[0])  ).toBe(0);
        expect(  indexOf(testData, keyCols, testData[15])  ).toBe(15);
        expect(  indexOf(testData, keyCols, testData[16])  ).toBe(16);
        expect(  indexOf(testData, keyCols, testData[8])  ).toBe(8);
        expect(  indexOf(testData, keyCols, testData[21])  ).toBe(21);
        expect(  indexOf(testData, keyCols, testData[11])  ).toBe(11);
        expect(  indexOf(testData, keyCols, testData[testData.length-1])  ).toBe(testData.length-1);
    });
});