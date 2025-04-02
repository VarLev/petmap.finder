import { IPet } from '../interfaces/IPet';
import { Photo } from './Photo';

export class Pet implements IPet {
  id: string;
  petName: string;
  animalType?: number | null;
  breed: number | null;
  birthDate: Date | null;
  gender: number | null;
  weight: number | null;
  color?: number | null;
  size?: number | null;
  vaccinations?: number[] | null;
  neutered: boolean | null;
  temperament?: number | null;
  activityLevel?: number | null;
  friendliness?: number | null;
  playPreferences?: number[] | null;
  additionalNotes?: string | null;
  userId: string;
  photos?: Photo[] | null;
  thumbnailUrl?: string | null;
  petInterests?: number[] | null;
  petHealthIssues?: number[] | null;
  instagram?: string | null;
  facebook?: string | null;
  userThumbnailUrl?: string | null;
  petStatus?: number | null;
  price?: number | null;
  city?: string | null;
  country?: string | null;
  address?: string | null;


  constructor(data: Partial<IPet> = {}) {
    this.id = data.id!;
    this.petName = data.petName || '';
    this.animalType = data.animalType;
    this.breed = data.breed || 0;
    this.birthDate = data.birthDate ? new Date(data.birthDate) : null;
    this.gender = data.gender || 0;
    this.weight = data.weight || null;
    this.color = data.color || null;
    this.size = data.size || null;
    this.vaccinations = data.vaccinations || [];
    this.neutered = data.neutered || null;
    this.temperament = data.temperament || 0;
    this.activityLevel = data.activityLevel || 0;
    this.friendliness =  data.friendliness || 0;
    this.playPreferences = data.playPreferences || [];
    this.additionalNotes = data.additionalNotes || '';
    this.userId = data.userId!;
    this.photos = data.photos || [];
    this.thumbnailUrl = data.thumbnailUrl || '';
    this.petInterests = data.petInterests || [];
    this.petHealthIssues = data.petHealthIssues || [];
    this.instagram = data.instagram || '';
    this.facebook = data.facebook || '';
    this.userThumbnailUrl = data.userThumbnailUrl || '';
    this.petStatus = data.petStatus || 0;
    this.price = data.price || null;
    this.city = data.city || '';
    this.country = data.country || '';
    this.address = data.address || '';
  }
}
