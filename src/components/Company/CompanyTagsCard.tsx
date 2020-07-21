import React from "react";
import Company from "../../interfaces/Company";

interface Props {
  company: Company;
}

const CompanyTagsCard: React.FC<Props> = ({ ...props }: Props) => {
  return <div className={"card"}>CompanyTagsCard</div>;
};

export default CompanyTagsCard;
