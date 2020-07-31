import { User } from "./index";
import { Company } from "./Company";

export interface CompanyInvitation {
  id: string;
  invitationEmail: string;
  fromUser: User;
  company: Company;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  createdAt: Date;
}
