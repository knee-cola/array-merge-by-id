import purgeA from '../lib/array-purge';

describe('`purgeA`', () => {

    let arr_original = [
            {mainID:1, subID:1, name:'Burton'},   // 0
            {mainID:2, subID:1, name:'Antone'},   // 1
            {mainID:2, subID:2, name:'Maribeth'}, // 2
            {mainID:2, subID:3, name:'Cordelia'}, // 3
            {mainID:3, subID:1, name:'Marcos'},   // 4
            {mainID:3, subID:2, name:'Wendolyn'}, // 5
            {mainID:4, subID:1, name:'Kamilah'}   // 6
        ],
        srcA,
        // sastavljam popis elemenata koje želim ukloniti
        aHitList = [
            {mainID: 1, subID: 1},
            {mainID: 2, subID: 1},
            {mainID: 3, subID: 1},
            {mainID: 4, subID: 1}
        ];

    beforeEach(() => {
        srcA = arr_original.slice();
    });

    it("`purgeA` should remove all the elements indicated by the `hitlist` parameter", function() {

        purgeA(srcA, aHitList, ['mainID', 'subID']);
        expect(srcA).toEqual(srcA.filter(el=>el.subID!==1)); // element with `subID==1` have been indicated by the `aHitList`
    });

    it("`purgeA` should support element selection via a callback function", function() {
        let comparerFn = (leftEl, rightEl)=>leftEl.mainID===rightEl.mainID ? (  leftEl.subID===rightEl.subID ? 0 :(leftEl.subID>rightEl.subID ? 1 : -1  )) : (leftEl.mainID > rightEl.mainID ? 1 : -1);
        purgeA(srcA, aHitList, comparerFn);
        expect(srcA).toEqual(srcA.filter(el=>el.subID!==1)); // element with `subID==1` have been indicated by the `aHitList`
    });

    it("if the `mapRemoved` config param is set `purgeA` should return an array containing removes elements (in the reverse order)", function() {
        expect( purgeA(srcA, aHitList, ['mainID', 'subID'], {mapRemoved:true}) ).toEqual(arr_original.filter(el=>el.subID===1).reverse()); // element with `subID==1` have been indicated by the `aHitList`
    });
});