import { IPhoto } from "./IPhoto";

export interface IFormData {
    petType:  0 | 1;
    breed: string;
    petName: string;
    petColor: string;
    description: string;
    birthDate: Date;
    petPhotos: IPhoto[];
    petGender: 0 | 1;
    email: string;
    tel: string;
    personName: string;
    noticeType: 0 | 1;
    address: string;
    location: {
        lat: number | null;
        lng: number | null;
    };
}