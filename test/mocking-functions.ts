/* spell-checker: disable */
import { originalArr } from './test-data';

function mockShuffledA() {

    // elementi su pomiješani kako je zadano poljem:
    let shuffledPos = [7, 29, 28, 9, 11, 5, 10, 8, 27, 4, 3, 26, 20, 25, 6, 15, 1, 21, 0, 18, 19, 22, 14, 23, 13, 24, 16, 2, 17, 12],
        resultA = [];

    for(let i=0,max=originalArr.length;i<max;i++) {
        resultA[i] = originalArr[  shuffledPos[i]  ];
    }

    return(resultA);

} // function mockShuffledA() {...}

function fnComparer(a, b) {
    if(a.mainID !== b.mainID) {
        return a.mainID < b.mainID ? -1 : 1;
    }
    if(a.subID !== b.subID) {
        return a.subID < b.subID ? -1 : 1;
    }
    if(!_.isUndefined(a.selfID) && !_.isUndefined(b.selfID)) {
        if(a.selfID !== b.selfID) {
            return a.selfID < b.selfID ? -1 : 1;
        }
    }
    return(0);

} // function fnComparer(a, b) {...}

export { mockShuffledA, fnComparer }