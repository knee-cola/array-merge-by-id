import stringifyIDs from '../lib/stringify-ids';

describe('`stringifyIDs`', () => {
    it('`stringifyIDs` should serialize all the properties of an object which and with `ID`', () => {
        let mockObj:any = { countryID: 123, sportID: 456, matchID: 789, name: 'Will', wish: 'I wich I could fly'};
        expect(stringifyIDs(mockObj)).toBe('{countryID:123, sportID:456, matchID:789}');
    });
});