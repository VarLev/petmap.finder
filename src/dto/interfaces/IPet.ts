import { IPhoto } from './IPhoto';

export interface IPet {
  id: string;
  petName: string;
  animalType?: number | null;
  breed?: number | null;
  birthDate: Date | null;
  gender?: number | null;
  weight: number | null;
  color?: number | null;
  vaccinations?: number[] | null;
  neutered: boolean | null;
  temperament?: number | null;
  activityLevel?: number | null;
  friendliness?: number | null;
  playPreferences?: number[] | null;
  additionalNotes?: string | null;
  userId: string;
  photos?: IPhoto[] | null;
  thumbnailUrl?: string | null;
  petInterests?: number[] | null;
  petHealthIssues?: number[] | null;
  instagram?: string | null;
  facebook?: string | null;
  size?: number | null;
  userThumbnailUrl?: string | null;
  petStatus?: number | null;   
  price?: number | null;
  city?: string | null;
  country?: string | null;
  address?: string | null;
}