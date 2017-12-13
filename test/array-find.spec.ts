import { originalMainParentArr, originalSubparentArr, originalArr } from './test-data';
import findFirstById from '../lib/array-find';

describe(`findFirstById`, () => {

    let testData:Array<any>;
    
    beforeEach(() => {
        testData = originalArr.slice(); // using data copy in our tests
    })
    
    it("`findFirstById` should return the first element of the original array, who's ID properties match the given values", () => {
        
        expect(findFirstById(originalArr.slice(), ['mainID', 'subID'], {mainID:2, subID:2})).toEqual(
            {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
        );
    });
    
    it("`findFirstById` should return the first element of the original array, for which the given comparer function returned 0", () => {
        
        let comparerFn = (el:any):number => el.mainID===2 && el.subID===2 ? 0 : 1;
    
        expect(findFirstById(originalArr.slice(), comparerFn)).toEqual(
            {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
        );
    });
});

