import { CompanyImage } from "./CompanyImage";
import { Review } from "./Review";

export interface CompanyOpeningDayHours {
  startTime: Date;
  endTime: Date;
}

export interface CompanyOpeningDay {
  id: string;
  daySlugName: string;
  dayTranslationKey: string;
  hours: [CompanyOpeningDayHours];
}

export interface CompanyTag {
  id: string;
  translationKey: string;
  color: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  siren: string;
  logo: CompanyImage;
  cover: CompanyImage;
  tags: CompanyTag[];
  address: string;
  averageMark: number;
  numberOfMarks: number;
  reviews: [Review];
  openingDays: [CompanyOpeningDay];
  deliveryDays: [CompanyOpeningDay];
}
