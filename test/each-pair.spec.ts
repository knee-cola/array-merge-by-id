import eachPair from '../lib/each-pair';


describe('eachPair', () => {
    it('`eachPair` treba za svaki upareni par elemenata dvaju polja pozvati callback funkciju', () => {

        let callbackFn = jasmine.createSpy('callbackFn'),
            parentsA = originalMainParentArr.slice(),
            childenA = originalSubparentArr.slice();

        eachPair(parentsA, childenA, ['mainID'], callbackFn);

        for (let i=0, maxI=parentsA.length; i<maxI; i++) {

            let parentAchildren = childenA.filter(el=>el.mainID===parentsA[i].mainID);

            for (let j=0, maxJ=parentAchildren.length; j<maxJ; j++) {
                expect(callbackFn).toHaveBeenCalledWith(parentsA[i], parentAchildren[j]);
            }
        }
    });

    it('`eachPair` treba omogućiti prosljeđivanje context-a pod kojim će callback funkcija biti pozvana', () => {

        let mockContext = {},
            callbackFn = jasmine.createSpy('callbackFn'),
            parentsA = originalMainParentArr.slice(),
            childenA = originalSubparentArr.slice();

        eachPair(parentsA, childenA, ['mainID'], callbackFn, { context:mockContext });

        let allCalls = callbackFn.calls.all();

        for (let i=0, maxI=callbackFn.calls.count(); i<maxI; i++) {
            expect(allCalls[i].object).toBe(mockContext);
        }
    });
});
