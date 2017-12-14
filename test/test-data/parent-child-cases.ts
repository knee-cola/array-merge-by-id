import * as _ from 'lodash';
import { ParentChildCase } from './test-data-types';
import { parentData, childData } from './parent-child-data';

/**
 * Picks elements from original array based on given parent ID
 * @param iXs 
 */
const pick = <T>(sourceA:Array<T>, famIDs:Array<number>):Array<T> => {
    return(sourceA.filter( (el:any) => _.some(famIDs, ID => ID===el.FamilyID  )));
}

/**
 * Creates a new case based on the given config
 */
const makeCase = ({ caseName, parents=[], children=[] }:{ caseName:string, parents?:Array<number>, children?:any } ):ParentChildCase => {

    // determine which overlapping and diff ParentIDs
    let childless = _.difference(parents, children),
    intersection = _.intersection(parents, children),
    orphans = _.difference(children, parents);
    
    // clone the original data, so that it's
    // each case has it's own instance/copy
    let parentA = _.cloneDeep(parentData),
        childA = _.cloneDeep(childData);

    return({
        caseName: caseName,
        parentA: pick(parentA, parents),
        childA: pick(childA, children),
        expected: {
            childless: pick(parentA, childless),
            matchedParents: pick(parentA, intersection),
            orphans: pick(childA, orphans),
            matchedChildren: pick(childA, intersection)
        }
    })
}

// the following array contains varius edge cases,
// which should be used to thest array compare spec
const parentChildCases:Array<ParentChildCase> = [
    makeCase({ caseName: 'both-empty' }),
    makeCase({ caseName: 'no-orphans-no-childless', parents:[1,2,3], children: [1,2,3] }),
    makeCase({ caseName: 'all-childless', parents:[1,2,3] }),
    makeCase({ caseName: 'outter-childless', parents:[1,2,3], children: [2] }),
    makeCase({ caseName: 'inner-childless', parents:[1,2,3], children: [1,3] }),
    makeCase({ caseName: 'all-orphans', children: [1,2,3] }),
    makeCase({ caseName: 'inner-orphans', parents:[1,3], children: [1,2,3] }),
    makeCase({ caseName: 'outter-orphans', parents:[2], children: [1,2,3] }),
    makeCase({ caseName: 'inner-xor', parents:[1,3], children: [2] }),
    makeCase({ caseName: 'outter-xor', parents:[2], children: [1,3] })
];

// selecting only data with overlapping elements
const parentChildOverlapCases:Array<ParentChildCase> = parentChildCases.filter( el => el.expected.matchedParents.length > 0);

// the following case contains all the children and all the parents
const simpleCase:ParentChildCase = makeCase({ caseName: 'simple-case', parents:[1,2,3], children: [1,2,3] });

export { ParentChildCase, parentChildCases, parentChildOverlapCases, simpleCase }