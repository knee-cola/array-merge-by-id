import eachPair from '../lib/each-pair';
import { simpleCase } from './test-data/parent-child-cases';
import { ParentDataRow, ChildDataRow } from './test-data/test-data-types';

describe('eachPair', () => {

    let parentA:Array<ParentDataRow>,
        childA:Array<ChildDataRow>;

    beforeEach(() => {
        // making sure the original data isn't changed
        parentA = simpleCase.parentA.slice(),
        childA = simpleCase.childA.slice();
    });

    it('`eachPair` should call the provided callback functon for each matched element pair', () => {

        let callbackFn = jest.fn();

        eachPair(parentA, childA, ['FamilyID'], callbackFn);

        for (let i=0, maxI=parentA.length; i<maxI; i++) {

            let parent = parentA[i];

            // manually fund all the children of the current parent
            let parentChildren = childA.filter(el=>el.FamilyID===parent.FamilyID);

            for (let j=0, maxJ=parentChildren.length; j<maxJ; j++) {
                expect(callbackFn).toHaveBeenCalledWith(parent, parentChildren[j]);
            }
        }
    });
});
