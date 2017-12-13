import linkA from '../lib/array-link';

describe('`linkA`', function() {
    
    let parentsA_original:Array<any> = [
            {mainID:1, name:'family'},
            {mainID:2, name:'friends'},
            {mainID:3, name:'club'},
            {mainID:4, name:'buddies'}
        ],
        childrenA_original:Array<any> = [
            {mainID:1, subID:1, name:'family'}, // 0
            {mainID:2, subID:1, name:'McGregor'}, // 1
            {mainID:2, subID:2, name:'Smith'}, // 2
            {mainID:2, subID:3, name:'Malkovich'}, // 3
            {mainID:3, subID:1, name:'club'}, // 4
            {mainID:3, subID:2, name:'trekeri'}, // 5
            {mainID:4, subID:1, name:'buddies'} // 6
        ],
        parentsA:Array<any>,
        childrenA:Array<any>;

    beforeEach(() => {
        parentsA = parentsA_original.slice();
        childrenA = childrenA_original.slice();
    });

    afterEach(() => {
        parentsA_original.forEach(el=>{  delete el.children;  });
        childrenA_original.forEach(el=>{  delete el.parent;  });
    });

    it("`linkA` should match elements of child array with elements in parent array, while match is determined by comparing the given list of IDs", function() {

        linkA(parentsA,childrenA,['mainID'],'parent');

        for (let i=0, maxI=childrenA.length; i<maxI; i++) {
            expect(childrenA[i].parent).not.toBe(undefined);
            expect(childrenA[i].parent.mainID).toBe(childrenA[i].mainID);
        }
    });

    it('`linkA` should compare the array elements via a comparisson function, if one is given', ()=>{

        let comparerFn = (leftEl, rightEl) => leftEl.mainID===rightEl.mainID ? 0 : (leftEl.mainID > rightEl.mainID ? 1 : -1);

        linkA(parentsA,childrenA,comparerFn,'parent');

        for (let i=0, maxI=childrenA.length; i<maxI; i++) {
            expect(childrenA[i].parent).not.toBe(undefined);
            expect(childrenA[i].parent.mainID).toBe(childrenA[i].mainID);
        }
    });


    it('`linkA` should return an object containing an array of orphans and childless elements', ()=>{

        parentsA = parentsA.filter(el=>el.mainID!==3); // iz polja izbacujem "aož" ... tako da će svi pripadajući elementi biti orphani
        childrenA = childrenA.filter(el=>el.mainID!==4); // uklanjam element "buddies" ... tako da parent neće imati child elemente

        let linkRes = linkA(parentsA,childrenA,['mainID'],'parent');

        expect(linkRes.childless).toEqual(parentsA.filter(el=>el.mainID===4));
        expect(linkRes.orphans).toEqual(childrenA.filter(el=>el.mainID===3));
    });

    it('`linkA` should assign the parent element with an array of all the matching child elements, if this featrue was configured', ()=>{
        linkA(parentsA,childrenA,['mainID'],'parent', {
            mapName: 'children'
        });

        for (let i=0, maxI=parentsA.length; i<maxI; i++) {
            expect(parentsA[i].children).toEqual(childrenA.filter(el=>el.mainID === parentsA[i].mainID));
        }
    });

    it('`linkA` should purge child array of all the orphans, if `purge_orphans` flag is was set to true', ()=>{

        parentsA = parentsA.filter(el=>el.mainID!==3); // iz polja izbacujem "aož" ... tako da će svi pripadajući elementi biti orphani
        let linkRes = linkA(parentsA,childrenA,['mainID'],'parent', { purge_orphans: true });

        expect(childrenA).toEqual(childrenA.filter(el=>el.mainID!==3));
    });
});