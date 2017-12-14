import mergeA from '../lib/array-merge';
import { cloneDeep } from 'lodash';

type RecordT = {ID:number, name:string};


describe('`mergeA`', () => {

    let currA_src:Array<RecordT> = [
                {ID:1, name:'Johnatan'},
                // {ID:2, name:'Rosane'}, <<--- exists in newA
                {ID:3, name:'Tommy'},
                // {ID:4, name:'Dennis'}, <<--- exists in newA
                {ID:5, name:'Robert'},
                // {ID:6, name:'Johhny'} <<--- exists in newA
            ],
        newA_src:Array<RecordT> = [
                {ID:1, name:'JOHNATAN'}, // <<-- this element has been MODIFIED
                {ID:2, name:'Rosane'}, // <<-- this is a new element, not contained in [currData]
                {ID:4, name:'Dennis'}, // <<-- this is a new element, not contained in [currData]
                {ID:5, name:'ROBERT'}, // <<-- this element has been MODIFIED
                {ID:6, name:'Johhny'} // <<-- this is a new element, not contained in [currData]
            ],
            currA:Array<RecordT>,
            newA:Array<RecordT>;

    beforeEach(() => {
        currA = cloneDeep(currA_src);
        newA = cloneDeep(newA_src);
    });

    it('`mergeA` should append new elements at the end of the current array', () => {

        console.log(newA);
        
        let diff = mergeA(currA, newA, ['ID']);
        
        console.log(diff);

        expect(currA).toEqual([
                currA_src[0],
                currA_src[1],
                currA_src[2],
                // new elements are expected at the end of this array
                newA_src[1], // Rosane
                newA_src[2], // Dennis
                newA_src[4] // Johhny
            ]);
    });

    // No need to test this, since it basically returns the same thing as `array-compare`
    // ... plus, it's enforfced by typescript
    // 
    //it('`mergeA` must return an object mapping the differences and commonalities between two given arrays', () => {
    //    let result = mergeA(currA, newA, ['ID']);
    //    expect(result.leftDiff).toEqual([ currA_src[1] ]);
    //    expect(result.leftCommon).toEqual([ currA_src[0], currA_src[2] ]);
    //    expect(result.rightDiff).toEqual([ newA[1], newA[2], newA[4] ]);
    //    expect(result.rightCommon).toEqual([ newA[0], newA[3] ]);
    //});

});