import { Person } from './person.model';

export interface PersonDetails {
    id?: string;
    person?: Person;
    createdDate?: Date;
    imageURL?: string;
    imagePath?: string;
}
