import compileC from '../lib/comparer-compiler';

describe('Name of the group', () => {
    
    it("[compileC] za zadano polje ID-ova treba vratiti kompiliranu funkciju koja radi usporedbu dvaju elemenata, te vraća -1, 0 ili 1, ovisno o tome koji element prethodi u redoslijedu", function() {
        
        let compiledFn = compileC(['id1', 'id2', 'id3']);

        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(0);
        expect(compiledFn({id1:0, id2: 0, id3: 1}, {id1:0, id2: 0, id3: 0})).toBe(1);
        expect(compiledFn({id1:0, id2: 1, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(1);
        expect(compiledFn({id1:1, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 1})).toBe(-1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 1, id3: 0})).toBe(-1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:1, id2: 0, id3: 0})).toBe(-1);
    });

    it("[compileC] treba podržavati kompiliranje funkcije za usporedbu koja elemente uspoređuje silaznim redoslijedom", function() {

        let compiledFn = compileC(['id1:desc', 'id2:desc', 'id3:desc']);

        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(0);
        expect(compiledFn({id1:0, id2: 0, id3: 1}, {id1:0, id2: 0, id3: 0})).toBe(-1);
        expect(compiledFn({id1:0, id2: 1, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(-1);
        expect(compiledFn({id1:1, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(-1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 1})).toBe(1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 1, id3: 0})).toBe(1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:1, id2: 0, id3: 0})).toBe(1);
    });

    it("[compileC] treba podržavati navođenje popisa ID-ova kao zasebnih parametara funkcije", function() {

        let compiledFn = compileC('id1', 'id2', 'id3');

        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(0);
        expect(compiledFn({id1:0, id2: 0, id3: 1}, {id1:0, id2: 0, id3: 0})).toBe(1);
        expect(compiledFn({id1:0, id2: 1, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(1);
        expect(compiledFn({id1:1, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 1})).toBe(-1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 1, id3: 0})).toBe(-1);
        expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:1, id2: 0, id3: 0})).toBe(-1);
    });

    it("[compileC] treba keširati kompiliranu funkciju, koju vraća slijedeći puta kada je metoda pozvana za isti popis ID-ova", function() {
        expect(compileC('id1', 'id2', 'id3')).toBe(compileC('id1', 'id2', 'id3'));
    });

});