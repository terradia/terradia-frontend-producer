import CompanyImage from "./CompanyImage";

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

export default interface Company {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  siren: string;
  logo: CompanyImage;
  cover: CompanyImage;
  address: string;
  openingDays: [CompanyOpeningDay];
}
