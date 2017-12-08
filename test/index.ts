/* spell-checker: disable */
import { originalMainParentArr, originalSubparentArr, originalArr } from './test-data';
import { mockShuffledA, fnComparer } from './mocking-functions';

describe('[arrT] jednostavne metode', () => {
    
            it("[compileC] za zadano polje ID-ova treba vratiti kompiliranu funkciju koja radi usporedbu dvaju elemenata, te vraća -1, 0 ili 1, ovisno o tome koji element prethodi u redoslijedu", function() {
    
                let compiledFn = arrT.compileC(['id1', 'id2', 'id3']);
    
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(0);
                expect(compiledFn({id1:0, id2: 0, id3: 1}, {id1:0, id2: 0, id3: 0})).toBe(1);
                expect(compiledFn({id1:0, id2: 1, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(1);
                expect(compiledFn({id1:1, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 1})).toBe(-1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 1, id3: 0})).toBe(-1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:1, id2: 0, id3: 0})).toBe(-1);
            });
    
            it("[compileC] treba podržavati kompiliranje funkcije za usporedbu koja elemente uspoređuje silaznim redoslijedom", function() {
    
                let compiledFn = arrT.compileC(['id1:desc', 'id2:desc', 'id3:desc']);
    
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(0);
                expect(compiledFn({id1:0, id2: 0, id3: 1}, {id1:0, id2: 0, id3: 0})).toBe(-1);
                expect(compiledFn({id1:0, id2: 1, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(-1);
                expect(compiledFn({id1:1, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(-1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 1})).toBe(1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 1, id3: 0})).toBe(1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:1, id2: 0, id3: 0})).toBe(1);
            });
    
            it("[compileC] treba podržavati navođenje popisa ID-ova kao zasebnih parametara funkcije", function() {
    
                let compiledFn = arrT.compileC('id1', 'id2', 'id3');
    
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(0);
                expect(compiledFn({id1:0, id2: 0, id3: 1}, {id1:0, id2: 0, id3: 0})).toBe(1);
                expect(compiledFn({id1:0, id2: 1, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(1);
                expect(compiledFn({id1:1, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 0})).toBe(1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 0, id3: 1})).toBe(-1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:0, id2: 1, id3: 0})).toBe(-1);
                expect(compiledFn({id1:0, id2: 0, id3: 0}, {id1:1, id2: 0, id3: 0})).toBe(-1);
            });
    
            it("[compileC] treba keširati kompiliranu funkciju, koju vraća slijedeći puta kada je metoda pozvana za isti popis ID-ova", function() {
                expect(arrT.compileC('id1', 'id2', 'id3')).toBe(arrT.compileC('id1', 'id2', 'id3'));
            });
    
            it('[isArr] treba vratiti TRUE ako joj je proslijeđeno polje', () => {
                expect(arrT.isArr([])).toBe(true);
            });
    
            it('[isArr] treba vratiti FALSE ako joj NIJE proslijeđeni polje', () => {
                expect(arrT.isArr(false)).toBe(false);
                expect(arrT.isArr({})).toBe(false);
                expect(arrT.isArr(()=>{})).toBe(false);
                expect(arrT.isArr('123')).toBe(false);
                expect(arrT.isArr(123)).toBe(false);
                expect(arrT.isArr(new Date())).toBe(false);
                expect(arrT.isArr(new RegExp())).toBe(false);
            });
    
            it('[isObj] treba vratiti TRUE ako joj je prosljeđen objekt bilo koje vrste', () => {
                expect(arrT.isObj({})).toBe(true);
                expect(arrT.isObj([])).toBe(true);
            });
    
            it('[isObj] treba vratiti TRUE ako joj NIJE prosljeđen objekt', () => {
                expect(arrT.isObj('123')).toBe(false);
                expect(arrT.isObj(123)).toBe(false);
            });
    
            it('[isArguments] treba vratiti TRUE ako proslijeđeni objekt predstavlja argumente funkcije', () => {
                var args;
                (function() { args = arguments; })();
                expect(arrT.isArguments(args)).toBe(true);
            });
    
            it('[isArguments] treba vratiti FALSE ako proslijeđeni parametar ne predstavlja argumente funkcije', () => {
                expect(arrT.isArguments(false)).toBe(false);
                expect(arrT.isArguments([])).toBe(false);
                expect(arrT.isArguments({})).toBe(false);
                expect(arrT.isArguments(()=>{})).toBe(false);
                expect(arrT.isArguments('123')).toBe(false);
                expect(arrT.isArguments(123)).toBe(false);
                expect(arrT.isArguments(new Date())).toBe(false);
                expect(arrT.isArguments(new RegExp())).toBe(false);
            });
    
            it('[isRegExp] treba vratiti TRUE ako proslijeđeni parametar predstavlja regularni izraz', () => {
                expect(arrT.isRegExp(new RegExp())).toBe(true);
                expect(arrT.isRegExp(/abcd.*/gi)).toBe(true);
            });
    
            it('[isRegExp] treba vratiti FALSE ako proslijeđeni parametar ne predstavlja regularni izraz', () => {
                expect(arrT.isRegExp(false)).toBe(false);
                expect(arrT.isRegExp([])).toBe(false);
                expect(arrT.isRegExp({})).toBe(false);
                expect(arrT.isRegExp(()=>{})).toBe(false);
                expect(arrT.isRegExp('123')).toBe(false);
                expect(arrT.isRegExp(123)).toBe(false);
                expect(arrT.isRegExp(new Date())).toBe(false);
            });
    
            it('[isDate] treba vratiti TRUE ako joj je proslijeđen parametar tipa [Date]', () => {
                expect(arrT.isDate(new Date())).toBe(true);
            });
    
            it('[isDate] treba vratiti FALSE ako joj proslijeđena vrijednost nije tipa [Date]', () => {
                expect(arrT.isDate(false)).toBe(false);
                expect(arrT.isDate([])).toBe(false);
                expect(arrT.isDate({})).toBe(false);
                expect(arrT.isDate(()=>{})).toBe(false);
                expect(arrT.isDate('123')).toBe(false);
                expect(arrT.isDate(123)).toBe(false);
                expect(arrT.isDate(new RegExp())).toBe(false);
            });
    
    
            it('[isNum] treba vratiti TRUE ako joj je proslijeđena vrijednost numeričkog tipa', () => {
                expect(arrT.isNum(123)).toBe(true);
                expect(arrT.isNum(-123)).toBe(true);
                expect(arrT.isNum(1.23)).toBe(true);
                expect(arrT.isNum(1e23)).toBe(true);
            });
    
            it('[isNum] treba vratiti FALSE ako proslijeđena vrijednost nije numeričkog tipka', () => {
                expect(arrT.isNum(false)).toBe(false);
                expect(arrT.isNum([])).toBe(false);
                expect(arrT.isNum({})).toBe(false);
                expect(arrT.isNum(()=>{})).toBe(false);
                expect(arrT.isNum('123')).toBe(false);
                expect(arrT.isNum(new Date())).toBe(false);
                expect(arrT.isNum(new RegExp())).toBe(false);
            });
    
            it('[isStr] treba vratiti TRUE ako joj je proslijeđena vrijednost string', () => {
                expect(arrT.isStr('123')).toBe(true);
            });
    
            it('[isStr] treba vratiti FALSE ako proslijeđena vrijednost nije string', () => {
                expect(arrT.isStr(false)).toBe(false);
                expect(arrT.isStr([])).toBe(false);
                expect(arrT.isStr({})).toBe(false);
                expect(arrT.isStr(()=>{})).toBe(false);
                expect(arrT.isStr(123)).toBe(false);
                expect(arrT.isStr(new Date())).toBe(false);
                expect(arrT.isStr(new RegExp())).toBe(false);
            });
    
            it('[isFn] treba vratiti TRUE ako joj je proslijeđena vrijednost referenca na funkciju', () => {
                expect(arrT.isFn(() => { })).toBe(true);
            });
    
            it('[isFn] treba vratiti FALSE ako proslijeđeni parametar ne predstavlja referencu na funkciju', () => {
                expect(arrT.isFn(false)).toBe(false);
                expect(arrT.isFn([])).toBe(false);
                expect(arrT.isFn({})).toBe(false);
                expect(arrT.isFn(123)).toBe(false);
                expect(arrT.isFn('123')).toBe(false);
                expect(arrT.isFn(new Date())).toBe(false);
                expect(arrT.isFn(new RegExp())).toBe(false);
            });
    
            it('[isSet] treba vratiti TRUE ako proslijeđena vrijednost nije NULL niti [undefined]', () => {
                expect(arrT.isSet(123)).toBe(true);
                expect(arrT.isSet(false)).toBe(true);
            });
    
            it('[isSet] treba vratiti FALSE ako je proslijeđena vrijednost NULL ili [undefined]', () => {
                expect(arrT.isSet(null)).toBe(false);
                expect(arrT.isSet(undefined)).toBe(false);
                expect(arrT.isSet(void 0)).toBe(false);
            });
    
            it('[notSet] treba vratiti FALSE ako proslijeđena vrijednost nije NULL niti [undefined]', () => {
                expect(arrT.notSet(123)).toBe(false);
                expect(arrT.notSet(false)).toBe(false);
            });
    
            it('[notSet] treba vratiti TRUE ako je proslijeđena vrijednost NULL ili [undefined]', () => {
                expect(arrT.notSet(null)).toBe(true);
                expect(arrT.notSet(undefined)).toBe(true);
                expect(arrT.notSet(void 0)).toBe(true);
            });
    
            it('[isDef] treba vratiti TRUE ako proslijeđena vrijednost NIJE [undefined]', () => {
                expect(arrT.isDef(123)).toBe(true);
                expect(arrT.isDef(null)).toBe(true);
                expect(arrT.isDef(false)).toBe(true);
            });
    
            it('[isDef] treba vratiti FALSE ako proslijeđena vrijednost JEST [undefined]', () => {
                expect(arrT.isDef(undefined)).toBe(false);
                expect(arrT.isDef(void 0)).toBe(false);
            });
    
            it('[isUndef] treba vratiti TRUE ako proslijeđena vrijednost JEST [undefined]', () => {
                expect(arrT.isUndef(undefined)).toBe(true);
                expect(arrT.isUndef(void 0)).toBe(true);
            });
    
            it('[isUndef] treba vratiti FALSE ako proslijeđena vrijednost NIJE [undefined]', () => {
                expect(arrT.isUndef(123)).toBe(false);
                expect(arrT.isUndef(false)).toBe(false);
                expect(arrT.isUndef(null)).toBe(false);
            });
    
            it('[reduce] treba prosljeđenu callback funkciju pozvati za svaki element sadržanog polja', () => {
                let originalA = ['a','b','c','d'],
                    callbackFn = jasmine.createSpy('callbackFn');
    
                arrT.reduce(originalA, callbackFn);
    
                expect(callbackFn).toHaveBeenCalledWith(undefined,'a',0,originalA);
                expect(callbackFn).toHaveBeenCalledWith(undefined,'b',1,originalA);
                expect(callbackFn).toHaveBeenCalledWith(undefined,'c',2,originalA);
                expect(callbackFn).toHaveBeenCalledWith(undefined,'d',3,originalA);
            });
    
            it('[reduce] treba kod svakog poziva funkciji prosljeđuje vrijednost koju je funkcija vratila prethodni puta kada je pozvana', () => {
                let originalA = ['a','b','c','d'],
                    callbackFn = jasmine.createSpy('callbackFn').and.callFake((prev,el,ix,arr)=>'prev-'+el);
    
                arrT.reduce(originalA, callbackFn,'initial');
    
                expect(callbackFn).toHaveBeenCalledWith('initial','a',0,originalA);
                expect(callbackFn).toHaveBeenCalledWith('prev-a','b',1,originalA);
                expect(callbackFn).toHaveBeenCalledWith('prev-b','c',2,originalA);
                expect(callbackFn).toHaveBeenCalledWith('prev-c','d',3,originalA);
            });
    
            it('[reduce] treba vratiti vrijednost koju je callback funkcija vratila kada je zadnji puta pozvana za zadanji element polja', () => {
                let originalA = ['a','b','c','d'];
                expect(  arrT.reduce(originalA, (prev,el,ix,arr)=>'calledWith-'+el)  ).toBe('calledWith-d');
            });
    
            it('[reduce] ne treba ovisiti o nativnoj podršci JS engine-a za reduce metodu', () => {
                let originalA = ['a','b','c','d'],
                    callbackFn = jasmine.createSpy('callbackFn').and.callFake((prev,el,ix,arr)=>'prev-'+el);
    
                // skrivam implementaciju ove metode definirane na prototype-u
                let array_reduce = Array.prototype.reduce;
                Array.prototype.reduce = void 0;
    
                arrT.reduce(originalA, callbackFn,'initial');
    
                expect(callbackFn).toHaveBeenCalledWith('initial','a',0,originalA);
                expect(callbackFn).toHaveBeenCalledWith('prev-a','b',1,originalA);
                expect(callbackFn).toHaveBeenCalledWith('prev-b','c',2,originalA);
                expect(callbackFn).toHaveBeenCalledWith('prev-c','d',3,originalA);
    
                Array.prototype.reduce = array_reduce;
            });
    
            it('[reduce] treba koristiti nativnu funkcionalnost, ako je podržana', () => {
                let originalA = ['a','b','c','d'];
    
                // skrivam implementaciju ove metode definirane na prototype-u
                let array_reduce = Array.prototype.reduce;
                Array.prototype.reduce = jasmine.createSpy('ArrayReduce');
    
                arrT.reduce(originalA, ()=>{},'initial');
    
                expect(Array.prototype.reduce).toHaveBeenCalled();
    
                Array.prototype.reduce = array_reduce;
            });
    
            let _unique_originalA = [{id:1},{id:1},{id:2},{id:2},{id:2},{id:1},{id:3},{id:3},{id:3},{id:2},{id:3},{id:4},{id:4}];
    
            it('[unique] treba vratiti polje koje sadrži samo jedinstvene elemente zadanog polja, pri čemu elemente uspoređuje korištenjem zadanog popisa ID-ova', () => {
                expect(arrT.unique(_unique_originalA.slice(), ['id'])).toEqual([{id:1},{id:2},{id:3},{id:4}]);
            });
    
            it('[unique] treba omogućiti da se umjesto popisa ID-ova zadaje callback funkcija, specijalizirana za supoređivanje elemenata polja', () => {
                let comparerFn = (leftEl, rightEl) => leftEl.id===rightEl.id ? 0 : (leftEl.id>rightEl.id ? 1 : -1);
                expect(arrT.unique(_unique_originalA.slice(), comparerFn)).toEqual([{id:1},{id:2},{id:3},{id:4}]);
            });
    
            it('[unique] treba za svaki element polja sastaviti statistiku koja govori koliko puta se objekt pojavljuje u originalnom polju', () => {
                let outStats = [];
    
                arrT.unique(_unique_originalA.slice(), ['id'], null, outStats);
                expect(outStats).toEqual([3, 4, 4, 2]);
            });
    
            it('[unique] ne smije sortirati originalno polje, ako je tako zatraženo putem [config].[skipSort] parametra', () => {
                let originalA = _unique_originalA.slice();
    
                arrT.unique(originalA, ['id'], {skipSort: true});
    
                // redoslijed elemenata treba ostati nepromjenjen
                expect(originalA).toEqual(_unique_originalA);
            });
    
            it('[stringifyIDs] treba iz zadanog objekta čupa property-e koji završavaju na "ID" i serijalizira ih u string', () => {
                expect(arrT.stringifyIDs({ dogID: 123, sportID: 456, grupaDogID: 789, naziv: 'pero', ideja: 'property koji sadrži "id"'}))
                    .toBe('{dogID:123, sportID:456, grupaDogID:789}');
            });
    
            it('[clear] treba ukloniti sve elemente iz zadanog polja, te vratiti referencu na zadano polje', () => {
                let originalA = [1,2,3,4,5,6];
    
                expect(arrT.clear(originalA)).toBe(originalA);
                expect(originalA.length).toBe(0);  // operacija mora biti rađena inplace - originalno polje mora biti sačuvano
            });
    
            it('[concat] treba spojiti dva polja, tako da elemente drugog polja doda na kraj prvog polja', () => {
                let targetA = [1,2,3,4];
    
                // metoda mora vratiti referencu na prvo polje
                expect(arrT.concat(targetA, ['a','b','c','d'])).toBe(targetA);
                expect(targetA).toEqual([1,2,3,4,'a','b','c','d']); // operacija mora biti rađena inplace - originalno polje mora biti sačuvano
            });
    
            it('[overwrite] treba napraviti inplace zamjenu sadržaja prvog polja sadržajem drugog polja, pri čemu se inicijalni elementi prvog polja nepovratno gube', () => {
                let targetA = [1,2,3,4];
                expect(arrT.overwrite(targetA, ['a','b','c','d'])).toBe(targetA); // metoda mora vratiti referenu na prvo polje
                expect(targetA).toEqual(['a','b','c','d']); // operacija mora biti rađena inplace - originalno polje mora biti sačuvano
            });
    
            it('[remove] treba iz originalnog polja ukloniti proslijeđeni element', () => {
                let targetA = [{id:1},{id:2},{id:3},{id:4}];
                expect(arrT.remove(targetA, targetA[1])).toBe(targetA); // metoda mora vratiti referenu na prvo polje
                expect(targetA).toEqual([{id:1},{id:3},{id:4}]); // operacija mora biti rađena inplace - originalno polje mora biti sačuvano
            });
    
            it('[defaults] treba ', () => {
                expect(arrT.defaults({},{propertyA:11, propertyB: 33, propertyC: 44})).toEqual({propertyA:11, propertyB: 33, propertyC: 44});
                expect(arrT.defaults({propertyA:void 0, propertyB:null},{propertyA:11, propertyB: 33, propertyC: 44})).toEqual({propertyA:11, propertyB: 33, propertyC: 44});
                expect(arrT.defaults({propertyA:55, propertyB: 66, propertyC: 77},{propertyA:11, propertyB: 33, propertyC: 44})).toEqual({propertyA:55, propertyB: 66, propertyC: 77});
            });
    
            it('[arrT].[eachPair] treba za svaki upareni par elemenata dvaju polja pozvati callback funkciju', () => {
    
                let callbackFn = jasmine.createSpy('callbackFn'),
                    parentsA = originalMainParentArr.slice(),
                    childenA = originalSubparentArr.slice();
     
                arrT.eachPair(parentsA, childenA, ['mainID'], callbackFn);
    
                for (let i=0, maxI=parentsA.length; i<maxI; i++) {
    
                    let parentAchildren = childenA.filter(el=>el.mainID===parentsA[i].mainID);
    
                    for (let j=0, maxJ=parentAchildren.length; j<maxJ; j++) {
                        expect(callbackFn).toHaveBeenCalledWith(parentsA[i], parentAchildren[j]);
                    }
                }
            });
    
            it('[arrT].[eachPair] treba omogućiti prosljeđivanje context-a pod kojim će callback funkcija biti pozvana', () => {
    
                let mockContext = {},
                    callbackFn = jasmine.createSpy('callbackFn'),
                    parentsA = originalMainParentArr.slice(),
                    childenA = originalSubparentArr.slice();
     
                arrT.eachPair(parentsA, childenA, ['mainID'], callbackFn, { context:mockContext });
    
                let allCalls = callbackFn.calls.all();
    
                for (let i=0, maxI=callbackFn.calls.count(); i<maxI; i++) {
                    expect(allCalls[i].object).toBe(mockContext);
                }
            });
    
            it('[arrT].[coalesce] u slučaju ako je proslijeđena vrijednost [undefined], metoda treba vratiti zadanu defaultnu vrijednost', () => {
                expect(arrT.coalesce(undefined, 1234)).toBe(1234);
            });
    
            it('[arrT].[coalesce] u slučaju ako je proslijeđene NULL vrijednosti, metoda treba vratiti defaultnu vrijednost', () => {
                expect(arrT.coalesce(null, 1234)).toBe(1234);
            });
    
            it('[arrT].[coalesce] u slučaju ako je proslijeđena vrijednost NIJE [undefined], metoda treba tu originalnu vrijednost (a ne defaultnu)', () => {
                expect(arrT.coalesce(5678, 1234)).toBe(5678);
            });
    
            it('[shallowCopyObj] treba kreirati novi objekt koji sadrži sve property-e zadanog objekta, pri čemu ne kopira referencirane objekte', () => {
                let objOriginal = {
                        string: 'peoperty A',
                        number: 1
                    },
                    objCopy = arrT.shallowCopyObj(objOriginal);
    
                expect(objCopy).not.toBe(objOriginal); // objekt mora biti sasvim novi
    
                expect(objCopy).toEqual({
                        string: 'peoperty A',
                        number: 1
                    });
            });
    
            it('ako objekt referencira drugi objekt bilo kojeg tipa [shallowCopyObj] umjesto reference treba property-u pridružiti string "object"', () => {
                let objOriginal = {
                        date: new Date(),
                        regxp: new RegExp(),
                        obj: {n:'object name'},
                        arr: [1,2,3,4]
                    },
                    objCopy = arrT.shallowCopyObj(objOriginal);
    
                expect(objCopy).toEqual({
                        date: 'object',
                        regxp: 'object',
                        obj: 'object',
                        arr: 'object'
                    });
            });
    
            it('ako objekt referencira drugi objekt bilo kojeg tipa [shallowCopyObj] umjesto reference treba property-u pridružiti string "object"', () => {
                let objOriginal = {
                        date: new Date(),
                        regxp: new RegExp(),
                        obj: {n:'object name'},
                        arr: [1,2,3,4]
                    },
                    objCopy = arrT.shallowCopyObj(objOriginal);
    
                expect(objCopy).toEqual({
                        date: 'object',
                        regxp: 'object',
                        obj: 'object',
                        arr: 'object'
                    });
            });
    
            it('[shallowCopyObj] treba podržavati ograničavanje property-a koje treba kopirati u novi objekt putem zadavanja popisa imena property-a', () => {
                let objOriginal = {
                        string: 'peoperty A',
                        number: 1,
                        date: new Date(),
                        regxp: new RegExp(),
                        obj: {n:'object name'},
                        arr: [1,2,3,4]
                    };
    
                expect(arrT.shallowCopyObj(objOriginal, ['number', 'arr']))
                    .toEqual({
                        number: 1,
                        arr: 'object'
                    });
            });
    
    
            it('[shallowCopy] treba za zadano polje elemenata vratiti novo polje koje sadži plitke kopije tih istih elemenata', () => {
                let originals = [
                        {id:1, n:'pero'},
                        {id:2, n:'mirko'},
                        {id:3, n:'slavko'},
                        {id:4, n:'darko'}
                    ],
                    copies = arrT.shallowCopy(originals);
    
                expect(copies).toEqual([
                        {id:1, n:'pero'},
                        {id:2, n:'mirko'},
                        {id:3, n:'slavko'},
                        {id:4, n:'darko'}
                    ]);
    
                expect(copies).not.toBe(originals); // treba biti vraćena nova instanca polja ... a ne isto polje
    
                // svi objekti moraju biti kopije, a ne originali
                for (let i=0, maxI=originals.length; i<maxI; i++) {
                    expect(copies[i]).not.toBe(originals[i]);
                }
            });
    
            // ova funkcionalnost je podržana od strane [shallowCopyObj], koju [shallowCopy] interno poziva ... ovdje samo provjeravam da li je poziva na ispravan način
            it('[shallowCopy] treba podržavati ograničavanje property-a koje treba kopirati u novi objekt putem zadavanja popisa imena property-a', () => {
    
                let originals = [
                        {id:1, n:'pero'},
                        {id:2, n:'mirko'},
                        {id:3, n:'slavko'},
                        {id:4, n:'darko'}
                    ];
    
                // kopiram samo property "n"
                expect(arrT.shallowCopy(originals, ['n'])).toEqual([
                        {n:'pero'},
                        {n:'mirko'},
                        {n:'slavko'},
                        {n:'darko'}
                    ]);
            });
    
    
        }); // describe('[arrT] jednostavne metode', () => {...});
    
        describe('[arrT] sortiranje', function() {
    
            let shuffledArr = null;
    
            beforeEach(() => {
                shuffledArr = _mockShuffledA();
            });
    
            it("[sortOn] treba baciti grešku u slučaju ako popis ključeva ili comparer funkcija nisu zadani", function() {
                expect( ()=>{ arrT.sortOn(shuffledArr); }  )
                    .toThrowError();
            });
    
            it("[sortOn] treba podržavati usporedbu elemenata polja pomoću proslijeđene callback funkcije", function() {
                expect(arrT.sortOn(shuffledArr, _fnComparer))
                    .toEqual(originalArr);
            });
    
            it("[sortOn] treba podržavati usporedbu elemenata polja pomoću proslijeđenog polja naziva ID-ova", function() {
                expect(arrT.sortOn(shuffledArr, ['mainID', 'subID', 'selfID']))
                    .toEqual(originalArr);
            });
    
        }); // describe('[arrT] sortiranje', function() {...});
    
        describe('[arrT].[mergeArray]', () => {
            
                let currA_src = [
                            {ID:1, name:'borina'},
                            // {ID:2, name:'tihana'}, <<--- nalazi se u newA
                            {ID:3, name:'tomek'},
                            // {ID:4, name:'denis'}, <<--- nalazi se u newA
                            {ID:5, name:'robi'},
                            // {ID:6, name:'ivek'} <<--- nalazi se u newA
                        ],
                    newA_src = [
                            {ID:1, name:'BORIS'}, // <<-- ovaj element je IZMJENJEN
                            {ID:2, name:'tihana'}, // <<-- ovo se još ne nalazi u [currData]
                            {ID:4, name:'denis'}, // <<-- ovo se još ne nalazi u [currData]
                            {ID:5, name:'ROBERT'}, // <<-- ovaj element je IZMJENJEN
                            {ID:6, name:'ivek'} // <<-- ovo se još ne nalazi u [currData]
                        ],
                        currA,
                        newA;
            
                    beforeEach(() => {
                        currA = currA_src.slice();
                        newA = newA_src.slice();
                    });
            
            
                    it('[mergeArray] treba u polje dodati elemente koji nedostaju', function() {
            
                        arrT.mergeArray(currA, newA, ['ID']);
            
                        expect(currA).toEqual([
                                currA_src[0],
                                currA_src[1],
                                currA_src[2],
                                // novi elementi se dodaju na kraj polja - [currA] na kraju nije sortirano
                                newA_src[1],
                                newA_src[2],
                                newA_src[4]
                            ]);
                    });
            
                    it('[mergeArray] treba za svaki uparenti element pozvati [callbackFn]', () => {
            
                        let callbackFn = jasmine.createSpy('callbackFn');
                        arrT.mergeArray(currA, newA, ['ID'], callbackFn);
            
                        expect(callbackFn).toHaveBeenCalledWith(currA_src[0], newA_src[0]);
                        expect(callbackFn).toHaveBeenCalledWith(currA_src[2], newA_src[3]);
                    });
            
                    it('[mergeArray] treba vratiti objekt jedak onome koji vraća [ArrayDiff] funkcija', () => {
            
                        let callbackFn = jasmine.createSpy('callbackFn'),
                            result = arrT.mergeArray(currA, newA, ['ID'], callbackFn);
            
                        expect(result.leftDiff).toEqual([ currA_src[1] ]);
                        expect(result.leftCommon).toEqual([ currA_src[0], currA_src[2] ]);
                        expect(result.rightDiff).toEqual([ newA[1], newA[2], newA[4] ]);
                        expect(result.rightCommon).toEqual([ newA[0], newA[3] ]);
                    });
            
            });

        describe('[arrT]', function() {
    
                let childArr = [],
                    childArr_copy = null,
                    parentArr = [],
                    parentArr_copy = null,
                    shuffledPos = null;
                
                shuffledPos = [7, 29, 28, 9, 11, 5, 10, 8, 27, 4, 3, 26, 20, 25, 6, 15, 1, 21, 0, 18, 19, 22, 23, 24, 16, 2, 17] ; // iz popisa sam izbacio 12, 13 i 14 -> tako 3 ostaje bez djece
                
                for(i=0,max=shuffledPos.length;i<max;i++) {
                    childArr[i] = originalArr[  shuffledPos[i]  ];
                }
    
                shuffledPos = [6, 1, 3, 4, 0, 2]; // iz popisa sam izbacio 5 - trekere ... tako dobivam orphan-e: 24, 25, 26
    
                for(i=0,max=shuffledPos.length;i<max;i++) {
                    parentArr[i] =  originalSubparentArr [  shuffledPos[i]  ];
                }
    
                beforeEach(function() {
                    // kreiram kopiju polja da ne smrdam random redoslijed
                    parentArr_copy = parentArr.slice();
                    childArr_copy = childArr.slice();
    
                    // uništavam reference kreirane u prethodnom testu
                    parentArr_copy.forEach(function(el) { delete el.children; });
                    childArr_copy.forEach(function(el) { delete el.parent; });
                });
    
                it("arrT.indexOf should return index of an element", function(){
                    expect(  arrT.indexOf(childArr_copy, childArr_copy[0], ['mainID', 'subID', 'selfID'])  ).toBe(0);
                    expect(  arrT.indexOf(childArr_copy, childArr_copy[15], ['mainID', 'subID', 'selfID'])  ).toBe(15);
                    expect(  arrT.indexOf(childArr_copy, childArr_copy[16], ['mainID', 'subID', 'selfID'])  ).toBe(16);
                    expect(  arrT.indexOf(childArr_copy, childArr_copy[8], ['mainID', 'subID', 'selfID'])  ).toBe(8);
                    expect(  arrT.indexOf(childArr_copy, childArr_copy[21], ['mainID', 'subID', 'selfID'])  ).toBe(21);
                    expect(  arrT.indexOf(childArr_copy, childArr_copy[11], ['mainID', 'subID', 'selfID'])  ).toBe(11);
                    expect(  arrT.indexOf(childArr_copy, childArr_copy[childArr_copy.length-1], ['mainID', 'subID', 'selfID'])  ).toBe(childArr_copy.length-1);
                });
    
                it('[arrT].[filter] kada je uparivanje zadano putem popisa ID-ova i njohovj vrijednosti treba vratiti sve elemente polja čiji ID-ovi odgovaraju zadanima', () => {
    
                    expect(arrT.filter(originalArr.slice(), {mainID:2, subID:2}, ['mainID', 'subID']))
                        .toEqual([
                            {mainID:2, subID:2, selfID:1, name:'vedran'}, // 8
                            {mainID:2, subID:2, selfID:2, name:'barbara'}, // 9
                            {mainID:2, subID:2, selfID:3, name:'patrik'}, // 10
                            {mainID:2, subID:2, selfID:4, name:'dominik'} // 11
                        ]);
                });
    
                it('[arrT].[filter] kada je uparivanje zadano putem comparer funkcije treba vratiti sve elemente za koje je prosljeđena comparer funkcija vratila TRUE', () => {
    
                    let comparerFn = el=>el.mainID===2 && el.subID===2;
    
                    expect(arrT.filter(originalArr.slice(), comparerFn))
                        .toEqual([
                            {mainID:2, subID:2, selfID:1, name:'vedran'}, // 8
                            {mainID:2, subID:2, selfID:2, name:'barbara'}, // 9
                            {mainID:2, subID:2, selfID:3, name:'patrik'}, // 10
                            {mainID:2, subID:2, selfID:4, name:'dominik'} // 11
                        ]);
                });
    
                // ne znam koliko je bitno da se poredak ne mijenja ... no funkcija u opisu to obečava, tako da možda netko s time i računa
                it('[arrT].[filter] ne smije mijenjati poredak elemenata zadanog polja', () => {
                    let arrCopy = originalArr.slice();
                    arrT.filter(arrCopy, {mainID:2, subID:2}, ['mainID', 'subID']);
                    expect(arrCopy).toEqual(originalArr);
                });
    
                it('ako je postavljen argument [findFirstEl], tada [arrT].[filter] treba vratiti samo prvi elemente polja čiji ID-ovi odgovaraju zadanima', () => {
    
                    let findFirstEl = true;
    
                    expect(arrT.filter(originalArr.slice(), {mainID:2, subID:2}, ['mainID', 'subID'], findFirstEl))
                        .toEqual([
                            {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
                        ]);
    
                    let comparerFn = el=>el.mainID===2 && el.subID===2;
    
                    expect(arrT.filter(originalArr.slice(), comparerFn, findFirstEl))
                        .toEqual([
                            {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
                        ]);
                });
    
                it('[arrT].[find] kada je uparivanje zadano putem popisa ID-ova i njihovih vrijednosti, treba vratiti samo prvi element čiji ID-ovi se poklapaju sa zadanim vrijednostima', () => {
    
                    expect(arrT.find(originalArr.slice(), {mainID:2, subID:2}, ['mainID', 'subID']))
                        .toEqual([
                            {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
                        ]);
    
                    let comparerFn = el=>el.mainID===2 && el.subID===2;
    
                    expect(arrT.find(originalArr.slice(), comparerFn))
                        .toEqual([
                            {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
                        ]);
                });
    
                it('[arrT].[findById] treba vratiti prvi element zadanog polja za čiji property-i zadani popisom odgovaraju zadanim vrijednostima', () => {
    
                    expect(arrT.findById(originalArr.slice(), {mainID:2, subID:2}, ['mainID', 'subID']))
                        .toEqual(
                            {mainID:2, subID:2, selfID:1, name:'vedran'} // 8
                        );
                });
            }); // describe('[arrT]', function() {...});
    
            describe('[arrT].[linkTables]', function() {
    
                let parentsA_original = [
                        {mainID:1, name:'familija'},
                        {mainID:2, name:'prijatelji'},
                        {mainID:3, name:'aož'},
                        {mainID:4, name:'pustolovi'}
                    ],
                    childrenA_original = [
                        {mainID:1, subID:1, name:'familija'}, // 0
                        {mainID:2, subID:1, name:'busije'}, // 1
                        {mainID:2, subID:2, name:'đorđevići'}, // 2
                        {mainID:2, subID:3, name:'đimotiji'}, // 3
                        {mainID:3, subID:1, name:'aož'}, // 4
                        {mainID:3, subID:2, name:'trekeri'}, // 5
                        {mainID:4, subID:1, name:'pustolovi'} // 6
                    ],
                    parentsA,
                    childrenA;
    
                beforeEach(() => {
                    parentsA = parentsA_original.slice();
                    childrenA = childrenA_original.slice();
                });
    
                afterEach(() => {
                    parentsA_original.forEach(el=>{  delete el.children;  });
                    childrenA_original.forEach(el=>{  delete el.parent;  });
                });
    
                it("[arrT].[linkTables] treba upariti elemente child tabele sa elementima parent tabele, pri čemu uparivanje radi usporđivanjem proslijeđenog popisa ID-ova", function() {
    
                    arrT.linkTables(parentsA,childrenA,['mainID'],'parent');
    
                    for (let i=0, maxI=childrenA.length; i<maxI; i++) {
                        expect(childrenA[i].parent).not.toBe(undefined);
                        expect(childrenA[i].parent.mainID).toBe(childrenA[i].mainID);
                    }
                });
    
                it('[arr].[linkTables] treba podržavati usporedbu elemenata putem proslijeđene comparer funkcije', ()=>{
    
                    let comparerFn = (leftEl, rightEl) => leftEl.mainID===rightEl.mainID ? 0 : (leftEl.mainID > rightEl.mainID ? 1 : -1);
    
                    arrT.linkTables(parentsA,childrenA,comparerFn,'parent');
    
                    for (let i=0, maxI=childrenA.length; i<maxI; i++) {
                        expect(childrenA[i].parent).not.toBe(undefined);
                        expect(childrenA[i].parent.mainID).toBe(childrenA[i].mainID);
                    }
                });
    
    
                it('[arr].[linkTables] treba popisati i vratiti parent elemente koji nemaju niti jedan child i child elemente koji nemaju niti jedan parent', ()=>{
    
                    parentsA = parentsA.filter(el=>el.mainID!==3); // iz polja izbacujem "aož" ... tako da će svi pripadajući elementi biti orphani
                    childrenA = childrenA.filter(el=>el.mainID!==4); // uklanjam element "pustolovi" ... tako da parent neće imati child elemente
    
                    let linkRes = arrT.linkTables(parentsA,childrenA,['mainID'],'parent');
    
                    expect(linkRes.childless).toEqual(parentsA.filter(el=>el.mainID===4));
                    expect(linkRes.orphans).toEqual(childrenA.filter(el=>el.mainID===3));
                });
    
                it('[arr].[linkTables] ako je traženo mapiranje child elemenata koji pripadaju pojedinom parent-u, tada metoda treba svaki parent proširiti property-em zadanog naziva, kojem pridužuje polje child elemenata', ()=>{
                    arrT.linkTables(parentsA,childrenA,['mainID'],'parent', {
                        mapName: 'children'
                    });
    
                    for (let i=0, maxI=parentsA.length; i<maxI; i++) {
                        expect(parentsA[i].children).toEqual(childrenA.filter(el=>el.mainID === parentsA[i].mainID));
                    }
                });
    
                it('[arr].[linkTables] ako je postavljen parametar [purge_orphans], tada metoda treba ukloniti elemente za koje nije pronađen parent', ()=>{
    
                    parentsA = parentsA.filter(el=>el.mainID!==3); // iz polja izbacujem "aož" ... tako da će svi pripadajući elementi biti orphani
                    let linkRes = arrT.linkTables(parentsA,childrenA,['mainID'],'parent', { purge_orphans: true });
    
                    expect(childrenA).toEqual(childrenA.filter(el=>el.mainID!==3));
                });
    
            }); // describe('[arrT].[linkTables]', function() {...});
    
    
            describe('[arrT].[arrayPurge]', function() {
    
    
                let arr_original = [
                        {mainID:1, subID:1, name:'familija'}, // 0
                        {mainID:2, subID:1, name:'busije'}, // 1
                        {mainID:2, subID:2, name:'đorđevići'}, // 2
                        {mainID:2, subID:3, name:'đimotiji'}, // 3
                        {mainID:3, subID:1, name:'aož'}, // 4
                        {mainID:3, subID:2, name:'trekeri'}, // 5
                        {mainID:4, subID:1, name:'pustolovi'} // 6
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
    
                it("[arrT].[arrayPurge] treba ukloniti sve elemente koje uspije upariti sa popisa setova ID-ova", function() {
                    arrT.arrayPurge(aHitList, srcA, ['mainID', 'subID']);
                    expect(srcA).toEqual(srcA.filter(el=>el.subID!==1)); // izbacio sam sve elemente koji imaju [subID===1]
                });
    
                it("[arrT].[arrayPurge] treba podržavati uparivanje elemenata putem predane comparer funkcije", function() {
                    let comparerFn = (leftEl, rightEl)=>leftEl.mainID===rightEl.mainID ? (  leftEl.subID===rightEl.subID ? 0 :(leftEl.subID>rightEl.subID ? 1 : -1  )) : (leftEl.mainID > rightEl.mainID ? 1 : -1);
                    arrT.arrayPurge(aHitList, srcA, comparerFn);
                    expect(srcA).toEqual(srcA.filter(el=>el.subID!==1)); // izbacio sam sve elemente koji imaju [subID===1]
                });
    
                it("[arrT].[arrayPurge] ako je zadan config parametar [mapRemoved] vratiti polje elemenata koji su uklonjeni popisanih obrnutim redoslijedom", function() {
                    expect( arrT.arrayPurge(aHitList, srcA, ['mainID', 'subID'], {mapRemoved:true}) ).toEqual(arr_original.filter(el=>el.subID===1).reverse()); // izbacio sam sve elemente koji imaju [subID===1]
                });
    
            }); // describe('[arrT].[arrayPurge]', function() {...});
    

    
    
    /*
    
            describe('testing parent-child related methods', function() {
    
                //-----------------------------------------------
                // Pripremam child i parent polja
                //-----------------------------------------------
    
                var parentArr, childArr, shuffledPos;
                var linkRes, parentArr_copy, childArr_copy, purge_orphans, map_array_name;
    
                it("arrT.removeOrphans should remove orphans", function() {
    
                    linkRes = arrT.linkTables(
                        parentArr_copy,
                        childArr_copy,
                        ['mainID', 'subID'],
                        'parent',
                        {
                        sortLeftBy: ['mainID', 'subID'],
                        sortRightBy: ['mainID', 'subID', 'selfID']
                    });
    
                    arrT.removeOrphans(childArr_copy, 'parent');
    
                    // polje treba biti kraće za 3 elementa (3 elemnta su preskočena kod kreiranja polja)
                    expect(childArr_copy.length).toBe(24);
    
                    // elementi 21,22,23 u kopiji polja moraju odgovarati elementima 27,28,29 u originalnom polju
                    // (metoda linkTables je sortirala kopiju polje - prije linkTables je bilo neporedano)
                    expect(  arrT.which(originalArr, childArr_copy.slice(21,24))  ).toEqual([27,28,29]);
    
                });
    
                it("arrT.eachPair should mach pairs and call fnCallback", function() {
    
                    var fakeContext = { what: "this is fake context" }, usedContext, allCount = 0, matchCount = 0, outterItems = [];
    
                    var fnCallback = function(objA, objB) {
                        usedContext = this;
    
                        outterItems[allCount++] = objB;
    
                        // brojim koliko ih je uspješno upareno
                        if(fnComparer(objB, objA)===0) {
                            matchCount++;
                        }
                    };
    
                    aRemoved = arrT.eachPair(parentArr_copy, childArr_copy, fnComparer, fnCallback, {context:fakeContext});
    
                    // treba koristiti ispravni context
                    expect(usedContext).toBe(fakeContext);
                    // treba biti pozvano jednom za svaki child redak koji ima parent = 24 puta
                    // (troje nema parent, a troje je uklonjeno kod pripreme)
                    expect(allCount).toBe(24);
                    // treba biti pozvana samo za elemente koji se slažu po svim ključevima
                    expect(matchCount).toBe(allCount);
    
                    // treba biti pozvana za sve child elemente jednom (preskočeni su 12,13,14 i 24,25,26)
                    var expectedOutterItems = [0,1,2,3,4,5,6,7,8,9,10,11,   15,16,17,18,19,20,21,22,23,  27,28,29];
                    expect(  arrT.which(  originalArr, outterItems  )  ).toEqual(expectedOutterItems);
                });
    
                it("arrT.countChildren should return index of an element", function(){
    
                    linkRes = arrT.linkTables(
                        parentArr_copy,
                        childArr_copy,
                        ['mainID', 'subID'],
                        'parent',
                        {
                        sortLeftBy: ['mainID', 'subID'],
                        sortRightBy: ['mainID', 'subID', 'selfID'],
                        mapName: "children",
                        purge_orphans: false // <-- nemoj uklanjati child elemente
                        });
    
                    arrT.countChildren(childArr_copy, 'parent', 'child_count');
    
                    expect( parentArr_copy[0].child_count ).toBe(5);
                    expect( parentArr_copy[1].child_count ).toBe(3);
                    expect( parentArr_copy[2].child_count ).toBe(4);
                    expect( parentArr_copy[3].child_count ).not.toBeDefined();
                    expect( parentArr_copy[4].child_count ).toBe(9);
                    expect( parentArr_copy[5].child_count ).toBe(3);
                });
    
                it("arrT.countChildren should sum parent fileds and store the result in the parent", function(){
    
                    linkRes = arrT.linkTables(
                        parentArr_copy,
                        childArr_copy,
                        ['mainID', 'subID'],
                        'parent',
                        {
                        sortLeftBy: ['mainID', 'subID'],
                        sortRightBy: ['mainID', 'subID', 'selfID'],
                        mapName: "children",
                        purge_orphans: false // <-- nemoj uklanjati child elemente
                        });
    
                    // sumiram ID-oove djece ...
                    arrT.sumChildFields(childArr_copy, 'parent', 'selfID', 'child_sum');
    
                    expect( parentArr_copy[0].child_sum ).toBe(1+2+3+4+5);
                    expect( parentArr_copy[1].child_sum ).toBe(1+2+3);
                    expect( parentArr_copy[2].child_sum ).toBe(1+2+3+4);
                    expect( parentArr_copy[3].child_sum ).not.toBeDefined();
                    expect( parentArr_copy[4].child_sum ).toBe(1+2+3+4+5+6+7+8+9);
                    expect( parentArr_copy[5].child_sum ).toBe(1+2+3);
                });
    
                it("arrT.purgeChildrenMap should remove listed children from maps", function(){
                    // povezujem parents &  children
                    linkRes = arrT.linkTables(
                        parentArr_copy,
                        childArr_copy,
                        ['mainID', 'subID'],
                        'parent',
                        {
                            sortLeftBy: ['mainID', 'subID'],
                            sortRightBy: ['mainID', 'subID', 'selfID'],
                            mapName: "children"
                        });
    
    
                    var aChildren4Removal = [originalArr[0],
                                                originalArr[3],
                                                originalArr[5],
                                                originalArr[8],
                                                originalArr[17],
                                                originalArr[20],
                                                originalArr[23]
                                                ];
    
                    arrT.purgeChildrenMap(parentArr_copy, aChildren4Removal, 'children');
    
                    // child mape smiju sadržavati samo elemente koji nisu izbačeni
                    expect( arrT.which(originalArr, parentArr_copy[0].children) ).toEqual([1,2,4]);
                    expect( arrT.which(originalArr, parentArr_copy[1].children) ).toEqual([6,7]);
                    expect( arrT.which(originalArr, parentArr_copy[2].children) ).toEqual([9,10,11]);
                    expect( parentArr_copy[3].children.length ).toBe(0); // ovaj nema child-ova
                    expect( arrT.which(originalArr, parentArr_copy[4].children) ).toEqual([15,16,   18,19   ,21,22   ]);
                    expect( arrT.which(originalArr, parentArr_copy[5].children) ).toEqual([27,28,29]);
                });
    
                it("arrT.deepCopy should create a deep ccopies of objects in an array", function() {
    
                    // povezujem parents &  children
                    linkRes = arrT.linkTables(
                        parentArr_copy,
                        childArr_copy,
                        ['mainID', 'subID'],
                        'parent',
                        {
                            sortLeftBy: ['mainID', 'subID'],
                            sortRightBy: ['mainID', 'subID', 'selfID'],
                            mapName: "children",
                            purge_orphans: false // <-- nemoj uklanjati child elemente
                        });
    
    
                    // kopiram elementarne property-e i referencu na parent-a
                    var arrCopy = arrT.deepCopy(childArr_copy);
    
                    // provjeravam jesu li svi property-i dobro prekopirani
                    expect(arrCopy[0].mainID).toBe(originalArr[0].mainID);
                    expect(arrCopy[0].subID).toBe(originalArr[0].subID);
                    expect(arrCopy[0].selfID).toBe(originalArr[0].selfID);
                    expect(arrCopy[0].name).toBe(originalArr[0].name);
    
                    // gledam element koji referencira 2. "parent"
                    expect(arrCopy[5].mainID).toBe(originalArr[5].mainID);
                    expect(arrCopy[5].subID).toBe(originalArr[5].subID);
                    expect(arrCopy[5].selfID).toBe(originalArr[5].selfID);
                    expect(arrCopy[5].name).toBe(originalArr[5].name);
    
                    // gledam element koji referencira 6. "parent"
                    expect(arrCopy[26].mainID).toBe(originalArr[29].mainID);
                    expect(arrCopy[26].subID).toBe(originalArr[29].subID);
                    expect(arrCopy[26].selfID).toBe(originalArr[29].selfID);
                    expect(arrCopy[26].name).toBe(originalArr[29].name);
    
                    // metoda MORA kreirati kopiju parent-a, a ne prekopirati referencu
                    expect(arrCopy[0].parent).not.toBe(parentArr_copy[0]);
                    expect(arrCopy[5].parent).not.toBe(parentArr_copy[1]);
                    expect(arrCopy[26].parent).not.toBe(parentArr_copy[5]);
    
                    // provjeravam je li prekoprana referenca na ispravni parent:
                    expect(arrCopy[0].parent.name).toBe("familija");
                    expect(arrCopy[5].parent.name).toBe("busije");
                    expect(arrCopy[26].parent.name).toBe("pustolovi");
    
                    // testiram je li cirkularna referenca dobro prekopirana:
                    // kopija parenta mora referencirati nazad kopiju child-a
                    expect(arrCopy[0].parent.children[0]).toBe(arrCopy[0]);
                    expect(arrCopy[5].parent.children[0]).toBe(arrCopy[5]);
                    expect(arrCopy[26].parent.children[2]).toBe(arrCopy[26]);
                });
    
            });
    
            it("arrT.distinct should purge array of duplicates", function() {
                // kreiram polje koje sadrži duplikate
                var duplicatesArr = arrT.some(originalArr, [3,5,7,8,2,1,4,10,5,3,2,8,7,1,5,10]);
                var uniqArr = arrT.distinct(duplicatesArr, ['mainID', 'subID', 'selfID']);
    
                expect(  arrT.which(  originalArr, uniqArr  )  ).toEqual([1,2,3,4,5,7,8,10]);
            });
    
            it("arrT.binarySearch should find the requested item", function() {
                expect(  arrT.binarySearch(originalArr, fnComparer, originalArr[0])  ).toBe(0);
                expect(  arrT.binarySearch(originalArr, fnComparer, originalArr[14])  ).toBe(14);
                expect(  arrT.binarySearch(originalArr, fnComparer, originalArr[originalArr.length-1])  ).toBe(originalArr.length-1);
    
                // ovdje kreiram element koji ne postoji (uzeo sam 14. element i povećao mu selfID za jedan)
                var fakeElement = {mainID:2, subID:3, selfID:4};
                expect(  arrT.binarySearch(originalArr, fnComparer, fakeElement, true)  ).toBe(14); // <- prihvaćam prvi MANJI element
                expect(  arrT.binarySearch(originalArr, fnComparer, fakeElement, false) ).toBe(15); // <- prihvaćam prvi VEĆI element
            });
    
            it("arrT.Find_item_in_range should find appropriate range for value", function() {
    
                // testiram sve kombinacije raspona
                var aRanges = [{"from_compare":">=", "from": 1, "to_compare":"<=", "to":10, 'value': 1},
                               {"from_compare":">=", "from":11, "to_compare":"<",  "to":20, 'value': 2},
                               {"from_compare":">",  "from":19, "to_compare":"<",  "to":30, 'value': 3},
                               {"from_compare":">",  "from":29, "to_compare":"<=", "to":40, 'value': 4}
                               ];
    
                expect( arrT.Find_item_in_range(aRanges, 0) ).toBeNull(); // <-- not found
    
                expect( arrT.Find_item_in_range(aRanges, 1) ).toBe(1);
                expect( arrT.Find_item_in_range(aRanges, 5) ).toBe(1);
                expect( arrT.Find_item_in_range(aRanges, 10) ).toBe(1);
    
                expect( arrT.Find_item_in_range(aRanges, 11) ).toBe(2);
                expect( arrT.Find_item_in_range(aRanges, 15) ).toBe(2);
                expect( arrT.Find_item_in_range(aRanges, 19) ).toBe(2);
    
                expect( arrT.Find_item_in_range(aRanges, 20) ).toBe(3);
                expect( arrT.Find_item_in_range(aRanges, 25) ).toBe(3);
                expect( arrT.Find_item_in_range(aRanges, 29) ).toBe(3);
    
                expect( arrT.Find_item_in_range(aRanges, 30) ).toBe(4);
                expect( arrT.Find_item_in_range(aRanges, 35) ).toBe(4);
                expect( arrT.Find_item_in_range(aRanges, 40) ).toBe(4);
    
                expect( arrT.Find_item_in_range(aRanges, 41) ).toBeNull(); // <-- not found
            });
    
            it("arrT.propertyReplace should replace property in all the reachable objects", function() {
    
                // kreiram testni objekt
                var dummyObj = {
                    name: 'pero',
                    age: 15,
                    child1: {
                        name: 'ian',
                        age: 16,
                        child11: {
                            name: 'willie',
                            age: 17
                        }
                    },
                    child2: {
                        name: 'miki',
                        age: 18,
                        child21: {
                            name: 'pdf',
                            age: 19
                        }
                    }
                };
    
                // kreiram cirkularne reference:
                dummyObj.child1.root = dummyObj;
                dummyObj.child1.parent = dummyObj;
                dummyObj.child1.child11.root = dummyObj;
                dummyObj.child1.child11.parent = dummyObj.child1;
    
                arrT.propertyReplace(dummyObj,'name','new name');
    
                // provjeri jesu li property-i svih elemenata zamijenjeni
                expect( dummyObj.name ).toBe('new name');
                expect( dummyObj.child1.name ).toBe('new name');
                expect( dummyObj.child1.child11.name ).toBe('new name');
                expect( dummyObj.child2.name ).toBe('new name');
                expect( dummyObj.child2.child21.name ).toBe('new name');
    
                // provjeri jesu li ostali property-i netaknuti:
                expect( dummyObj.age ).toBe(15);
                expect( dummyObj.child1.age ).toBe(16);
                expect( dummyObj.child1.child11.age ).toBe(17);
                expect( dummyObj.child2.age ).toBe(18);
                expect( dummyObj.child2.child21.age ).toBe(19);
    
                // jesu li reference netaknute
                expect( dummyObj.child1.parent ).toBe(dummyObj);
                expect( dummyObj.child1.root ).toBe(dummyObj);
                expect( dummyObj.child1.child11.root ).toBe(dummyObj);
    
            });
    
            it("arrT.removeSome should remove some items form the provided array", function() {
                // kreiraj dva polja u kojima se neki elementi preklapaju, a drugi ne
                var arrA = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    
                arrT.removeSome(arrA, [0,5,10,15]);
    
                // provjeravam očekivani rezultat:
                expect(  arrA  ).toEqual( [1,2,3,4,6,7,8,9,11,12,13,14] );
            });
    
    
            it("arrT.concat should add elements of [target] array to [source]", function() {
                // kreiraj dva polja u kojima se neki elementi preklapaju, a drugi ne
                var targetA = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                    sourceA = [];
    
                for(var i=0;i<1001;i++) {
                    sourceA.push(i);
                }
    
                var expectedArr = targetA.concat(sourceA);
    
                arrT.concat(targetA, sourceA);
    
                expect(  targetA.length  ).toBe( expectedArr.length );
    
                expect(  targetA  ).toEqual( expectedArr );
            });
    */
    
    