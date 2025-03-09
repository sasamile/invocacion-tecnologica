export interface BaseInstitution {
  id: string;
  code: string;
  name: string;
  address: string;
  zona: string;
  municipality: string;
  phone: string;
  state: string;
  rector: string;
  municipalityId: string;
  instituteCode: string;
}

export interface SchoolColumns extends BaseInstitution {
  campuses: string;
}

export interface CampusesColumns extends BaseInstitution {
  instituteName: string;
}

export interface MunicipalityData {
  id: string;
  codeMunicipalities: string;
  name: string;
  totalInstituciones: number;
  totalSedes: number;
}

export interface DataProps {
  departamentoId: string;
  totalMunicipios: number;
  totalInstituciones: number;
  totalSedes: number;
}

// export interface CampusColumns {
//   codeDane: string;
//   name: string;
//   institucion: string;
//   municipio: string;
//   zona: string;
//   rector: string;
//   state: string;
// }


