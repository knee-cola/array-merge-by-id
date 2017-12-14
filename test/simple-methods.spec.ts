import { sortOn, clear, overwrite, concat } from '../lib/simple-methods';

describe('sortOn', () => {
    it("[sortOn] treba baciti grešku u slučaju ako popis ključeva ili comparer funkcija nisu zadani", function() {
        expect( ()=>{ sortOn(shuffledArr); }  )
            .toThrowError();
    });

    it("[sortOn] treba podržavati usporedbu elemenata polja pomoću proslijeđene callback funkcije", function() {
        expect(sortOn(shuffledArr, _fnComparer))
            .toEqual(originalArr);
    });

    it("[sortOn] treba podržavati usporedbu elemenata polja pomoću proslijeđenog polja naziva ID-ova", function() {
        expect(sortOn(shuffledArr, ['mainID', 'subID', 'selfID']))
            .toEqual(originalArr);
    });
});
describe('clear', () => {
    it('[clear] treba ukloniti sve elemente iz zadanog polja, te vratiti referencu na zadano polje', () => {
        let originalA = [1,2,3,4,5,6];

        expect(clear(originalA)).toBe(originalA);
        expect(originalA.length).toBe(0);  // operacija mora biti rađena inplace - originalno polje mora biti sačuvano
    });
});
describe('overwrite', () => {
    it('[concat] treba spojiti dva polja, tako da elemente drugog polja doda na kraj prvog polja', () => {
        let targetA = [1,2,3,4];

        // metoda mora vratiti referencu na prvo polje
        expect(concat(targetA, ['a','b','c','d'])).toBe(targetA);
        expect(targetA).toEqual([1,2,3,4,'a','b','c','d']); // operacija mora biti rađena inplace - originalno polje mora biti sačuvano
    });
});
describe('concat', () => {
    it('[overwrite] treba napraviti inplace zamjenu sadržaja prvog polja sadržajem drugog polja, pri čemu se inicijalni elementi prvog polja nepovratno gube', () => {
        let targetA = [1,2,3,4];
        expect(overwrite(targetA, ['a','b','c','d'])).toBe(targetA); // metoda mora vratiti referenu na prvo polje
        expect(targetA).toEqual(['a','b','c','d']); // operacija mora biti rađena inplace - originalno polje mora biti sačuvano
    });
});
