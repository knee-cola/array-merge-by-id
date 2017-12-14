import { cloneDeep, intersection, difference } from 'lodash';
import { ChildDataRow, SingleTCase } from './test-data-types';
import { childData } from './parent-child-data';

const singleTKeys = ["ID"];

/**
 * Picks elements from original array
 * @param iXs 
 */
const pick = (sourceData:Array<ChildDataRow>, iXs:Array<number>):Array<ChildDataRow> => {
    let result:Array<ChildDataRow> = []

    for(let i:number=0;i<iXs.length; i++) {
        result.push(sourceData[iXs[i]]);
    }

    return(result)
}

/**
 * Creates a new case based on the given config
 */
const makeCase = ({ caseName, left=[], right=[] }:{ caseName:string, left?:Array<number>, right?:any } ):SingleTCase => {

    // determine which overlapping and diff ParentIDs
    let leftDiff = difference(left, right),
        common = intersection(left, right),
        rightDiff = difference(right, left);

        
    // clone the original data, so that it's
    // each case has it's own instance/copy
    let leftData = cloneDeep(childData),
        rightData = cloneDeep(childData);
        

    return({
        caseName: caseName,
        leftA: pick(leftData, left),
        rightA: pick(rightData, right),
        expected: {
            leftDiff: pick(leftData, leftDiff),
            leftCommon: pick(leftData, common),
            rightDiff: pick(rightData, rightDiff),
            rightCommon: pick(rightData, common)
        }
    })
}

// the following array contains varius edge cases,
// which should be used to thest array compare spec
const singleTableCases:Array<SingleTCase> = [
    makeCase({ caseName: 'both-empty'}),
    makeCase({ caseName: 'empty-right-array', left: [0,1,2,3,4] }),
    makeCase({ caseName: 'empty-left-array', right: [0,1,2,3,4] }),
    makeCase({ caseName: 'identical-arrays', left: [0,1,2,3,4], right: [0,1,2,3,4] }),
    makeCase({ caseName: 'XOR-arrays', left: [0,2,4], right: [1,3] }),
    makeCase({ caseName: 'XOR-arrays-inverted', left: [1,3], right: [0,2,4] }),
    makeCase({ caseName: 'partial-front-overlap-1', left: [0,1], right: [1,2,3,4] }),
    makeCase({ caseName: 'partial-front-overlap-2', left: [1,2,3,4], right: [0,1] }),
    makeCase({ caseName: 'partial-back-overlap-1', left: [3,4], right: [0,1,2,3] }),
    makeCase({ caseName: 'partial-back-overlap-2', left: [0,1,2,3], right: [3,4] }),
    makeCase({ caseName: 'full-front-overlap-1', left: [0,1], right: [0,1,2,3,4] }),
    makeCase({ caseName: 'full-front-overlap-2', left: [0,1,2,3,4], right: [0,1] }),
    makeCase({ caseName: 'full-back-overlap-1', left: [3,4], right: [0,1,2,3,4] }),
    makeCase({ caseName: 'full-back-overlap-2', left: [0,1,2,3,4], right: [3,4] }),
    makeCase({ caseName: 'partial-outter-overlap-1', left: [0,1,2,3,4], right: [0,2,4] }),
    makeCase({ caseName: 'partial-outter-overlap-2', left: [0,2,4], right: [0,1,2,3,4] }),
    makeCase({ caseName: 'partial-inner-overlap-1', left: [0,1,2,3,4], right: [1,3] }),
    makeCase({ caseName: 'partial-inner-overlap-2', left: [1,3], right: [0,1,2,3,4] }),
    makeCase({ caseName: 'full-inner-overlap-1', left: [0,1,2,3,4], right: [1,2,3] }),
    makeCase({ caseName: 'full-inner-overlap-2', left: [1,2,3], right: [0,1,2,3,4] }),
    makeCase({ caseName: 'full-outter-overlap-1', left: [0,1,2,3,4], right: [0,1,3,4] }),
    makeCase({ caseName: 'full-outter-overlap-2', left: [0,1,3,4], right: [0,1,2,3,4] })
];

// selecting only data with overlapping elements
const singleTableOverlapingCases = singleTableCases.filter( el => el.expected.leftCommon.length > 0);

export { SingleTCase, singleTableCases, singleTableOverlapingCases, singleTKeys }