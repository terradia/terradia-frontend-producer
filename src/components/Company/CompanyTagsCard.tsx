import React from "react";
import { Company } from "../../interfaces/Company";

interface Props {
  company: Company;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CompanyTagsCard: React.FC<Props> = ({ ...props }: Props) => {
  return <div className={"card"}>CompanyTagsCard</div>;
};

export default CompanyTagsCard;
