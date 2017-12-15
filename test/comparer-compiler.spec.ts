import compileC from '../lib/comparer-compiler';

describe('`compileC`', () => {

    let equalCases = [
            { param1: {id1:0, id2: 0, id3: 0}, param2: {id1:0, id2: 0, id3: 0}, expect: { value:  0, inverse:  0 } },
        ],
        precedingCases = [
            { param1: {id1:0, id2: 0, id3: 1}, param2: {id1:0, id2: 0, id3: 0}, expect: { value:  1, inverse: -1 } },
            { param1: {id1:0, id2: 1, id3: 0}, param2: {id1:0, id2: 0, id3: 0}, expect: { value:  1, inverse: -1 } },
            { param1: {id1:1, id2: 0, id3: 0}, param2: {id1:0, id2: 0, id3: 0}, expect: { value:  1, inverse: -1 } },
        ],
        succeedingCases = [
            { param1: {id1:0, id2: 0, id3: 0}, param2: {id1:0, id2: 0, id3: 1}, expect: { value: -1, inverse: 1 } },
            { param1: {id1:0, id2: 0, id3: 0}, param2: {id1:0, id2: 1, id3: 0}, expect: { value: -1, inverse: 1 } },
            { param1: {id1:0, id2: 0, id3: 0}, param2: {id1:1, id2: 0, id3: 0}, expect: { value: -1, inverse: 1 } }
        ],
        allCases = [
            ...equalCases,
            ...precedingCases,
            ...succeedingCases
        ];

    it("`compileC` must return a function", function() {
        expect(compileC(['id1', 'id2', 'id3'])).toBeInstanceOf(Function);
    });

    it("function returned by `compileC` must return 0 if two provided objects are equal", function() {
        let compiledFn = compileC(['id1', 'id2', 'id3']);
        let oneCase = equalCases[0];
        expect(compiledFn(oneCase.param1, oneCase.param2)).toBe(oneCase.expect.value);
    });

    it("function returned by `compileC` must return -1 if the second object precedes the first", function() {
        let compiledFn = compileC(['id1', 'id2', 'id3']);
        precedingCases.forEach(oneCase => expect(compiledFn(oneCase.param1, oneCase.param2)).toBe(oneCase.expect.value));
    });

    it("function returned by `compileC` must return 1 if the first object precedes the second", function() {
        let compiledFn = compileC(['id1', 'id2', 'id3']);
        succeedingCases.forEach(oneCase => expect(compiledFn(oneCase.param1, oneCase.param2)).toBe(oneCase.expect.value));
    });
    
    it("function returned by `compileC` must reverse the result if key names are sufixed with `desc`", function() {
        let compiledFn = compileC(['id1:desc', 'id2:desc', 'id3:desc']);
        allCases.forEach(oneCase => expect(compiledFn(oneCase.param1, oneCase.param2)).toBe(oneCase.expect.inverse));
    });

    it("`compileC` must accept key names as separate params", function() {
        let compiledFn = compileC('id1', 'id2', 'id3');
        allCases.forEach(oneCase => expect(compiledFn(oneCase.param1, oneCase.param2)).toBe(oneCase.expect.value));
    });

    it("`compileC` must cache the compiled function", function() {
        expect(compileC('id1', 'id2', 'id3')).toBe(compileC('id1', 'id2', 'id3'));
    });

});