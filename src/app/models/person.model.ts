
export class Person {
    id?: string;
    imageURL?: string;
    surname?: string;
    firstname?: string;
    othernames?: string;
    gender?: string;
    dob?: Date;
    maritalStatus?: string;
    education: Education;
    occupation: Work;
    contact: Contact;
    createdDate?: number;
}

interface Contact {
    mobilePhone1?: number;
    mobilePhone2?: number;
    homePhone?: number;
    city?: string;
    zip?: number;
    residentialAddress?: string;
}

interface Work {
    occupation?: string;
    department?: string;
    post?: string;
    phone?: number;
    telephone?: number;
    address?: string;
}

interface Education {
    highestEducationLevel?: string;
    certification?: string;
}
