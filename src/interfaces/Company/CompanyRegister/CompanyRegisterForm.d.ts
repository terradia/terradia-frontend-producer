export declare interface SirenData {
  checkSiren: CompanyInfo;
}

export declare interface CompanyAddress {
  complementAdresseEtablissement: string;
  numeroVoieEtablissement: string;
  indiceRepetitionEtablissement: string;
  typeVoieEtablissement: string;
  libelleVoieEtablissement: string;
  codePostalEtablissement: string;
  libelleCommuneEtablissement: string;
  libelleCommuneEtrangerEtablissement: string;
  distributionSpecialeEtablissement: string;
  codeCommuneEtablissement: string;
  codeCedexEtablissement: string;
  libelleCedexEtablissement: string;
  codePaysEtrangerEtablissement: string;
  libellePaysEtrangerEtablissement: string;
}

export declare interface LegalUnits {
  statutDiffusionUniteLegale: string;
  unitePurgeeUniteLegale: boolean;
  dateCreationUniteLegale: string;
  sigleUniteLegale: string;
  sexeUniteLegale: string;
  prenom1UniteLegale: string;
  prenom2UniteLegale: string;
  prenom3UniteLegale: string;
  prenom4UniteLegale: string;
  prenomUsuelUniteLegale: string;
  pseudonymeUniteLegale: string;
  identifiantAssociationUniteLegale: string;
  trancheEffectifsUniteLegale: string;
  anneeEffectifsUniteLegale: string;
  dateDernierTraitementUniteLegale: string;
  nombrePeriodesUniteLegale: number;
  categorieEntreprise: string;
  anneeCategorieEntreprise: string;
  etatAdministratifUniteLegale: string;
  nomUniteLegale: string;
  denominationUniteLegale: string;
  denominationUsuelle1UniteLegale: string;
  denominationUsuelle2UniteLegale: string;
  denominationUsuelle3UniteLegale: string;
  activitePrincipaleUniteLegale: string;
  categorieJuridiqueUniteLegale: string;
  nicSiegeUniteLegale: string;
  nomenclatureActivitePrincipaleUniteLegale: string;
  nomUsageUniteLegale: string;
  economieSocialeSolidaireUniteLegale: string;
  caractereEmployeurUniteLegale: string;
}

export declare interface CompanyDates {
  dateFin: string;
  dateDebut: string;
  etatAdministratifEtablissement: string;
  changementEtatAdministratifEtablissement: boolean;
  enseigne1Etablissement: string;
  enseigne2Etablissement: string;
  enseigne3Etablissement: string;
  changementEnseigneEtablissement: boolean;
  denominationUsuelleEtablissement: string;
  changementDenominationUsuelleEtablissement: boolean;
  activitePrincipaleEtablissement: string;
  nomenclatureActivitePrincipaleEtablissement: string;
  changementActivitePrincipaleEtablissement: boolean;
  caractereEmployeurEtablissement: string;
  changementCaractereEmployeurEtablissement: boolean;
}

export declare interface CompanyInfo {
  score: number;
  siren: string;
  nic: string;
  siret: string;
  statutDiffusionEtablissement: string;
  dateCreationEtablissement: string;
  trancheEffectifsEtablissement: string;
  anneeEffectifsEtablissement: string;
  activitePrincipaleRegistreMetiersEtablissement: string;
  dateDernierTraitementEtablissement: string;
  etablissementSiege: boolean;
  nombrePeriodesEtablissement: number;
  uniteLegale: LegalUnits;
  adresseEtablissement: CompanyAddress;
  adresse2Etablissement: CompanyAddress;
  periodesEtablissement: CompanyDates;
}
