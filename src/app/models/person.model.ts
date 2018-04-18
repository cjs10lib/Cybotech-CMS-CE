
export interface PersonDetails {
    id?: string;
    person?: Person;
    createdDate?: Date;
    imageURL?: string;
    imagePath?: string;
}

export interface Person {
    imageURL?: string;
    title?: string;
    surname?: string;
    firstname?: string;
    othernames?: string;
    gender?: string;
    dob?: Date;
    maritalStatus?: string;
    Ethnicity?: string;
    education?: Education;
    occupation?: Work;
    contact?: Contact;
    // home?: Home;
    homeCity?: string;
    homeState?: string;
}

interface Home {
    city?: string;
    state?: string;
}

interface Contact {
    mobilePhone1?: number;
    mobilePhone2?: number;
    homePhone?: number;
    email?: string;
    city?: string;
    zip?: number;
    residentialAddress?: string;
}

interface Work {
    occupation?: string;
    employer?: string;
    department?: string;
    post?: string;
    phone?: number;
    telephone?: number;
    address?: string;
}

interface Education {
    highestEducationLevel?: string;
    certification?: string;
    school?: string;
    grade?: string;
}
