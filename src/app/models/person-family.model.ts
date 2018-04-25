
export interface Family {
    id?: string;
    name?: string;
    createdDate?: number;
}

export interface PersonFamily {
    familyId?: string;
    tag?: string;
    addedDate?: number;
}

export interface FamilyMembers {
    personId?: string;
    familyId?: string;
    personTag?: string;
    createdDate?: Date;
}
