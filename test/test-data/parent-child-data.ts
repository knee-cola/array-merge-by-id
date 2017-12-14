
import { ParentDataRow, ChildDataRow } from './test-data-types';

const parentData:Array<ParentDataRow> = [
    {FamilyID: 1, name:'Smith'},
    {FamilyID: 2, name:'Brown'},
    {FamilyID: 3, name:'McGregor'}
];

const childData:Array<ChildDataRow> = [
    {FamilyID: 1, MemberID:1, name:'Marilyn'},
    {FamilyID: 1, MemberID:2, name:'Cornelius'},
    {FamilyID: 2, MemberID:3, name:'Tonette'},
    {FamilyID: 3, MemberID:4, name:'Hana'},
    {FamilyID: 3, MemberID:5, name:'Lauran'}
];

export { parentData, childData }