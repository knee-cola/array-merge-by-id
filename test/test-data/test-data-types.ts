type ParentDataRow = {
    FamilyID: number,
    name: string,
    dummyMap?: Array<ChildDataRow>
}

type ChildDataRow = {
    FamilyID: number,
    MemberID: number,
    name: string,
    dummyLink?:ParentDataRow | ChildDataRow
}

type CaseData = {
    caseName: string,
    leftA: Array<ChildDataRow>,
    rightA: Array<ChildDataRow>,
    expected: {
        leftDiff: Array<ChildDataRow>,
        leftCommon: Array<ChildDataRow>,
        rightDiff: Array<ChildDataRow>,
        rightCommon:Array<ChildDataRow>
    }
}

type ParentChildCase = {
    caseName: string,
    parentA: Array<ParentDataRow>,
    childA: Array<ChildDataRow>,
    expected: {
        childless: Array<ParentDataRow>,
        matchedParents: Array<ParentDataRow>,
        orphans: Array<ChildDataRow>,
        matchedChildren:Array<ChildDataRow>
    }
}

type SingleTCase = {
    caseName: string,
    leftA: Array<ChildDataRow>,
    rightA: Array<ChildDataRow>,
    expected: {
        leftDiff: Array<ChildDataRow>,
        leftCommon: Array<ChildDataRow>,
        rightDiff: Array<ChildDataRow>,
        rightCommon:Array<ChildDataRow>
    }
}

export { ParentDataRow, ChildDataRow, ParentChildCase, SingleTCase }