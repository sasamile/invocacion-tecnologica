interface BaseInstitution {
  id: string;
  code: string;
  name: string;
  address: string;
  zona: string;
  municipality: string;
  phone: string;
  state: string;
  rector: string;
}

export interface SchoolColumns extends BaseInstitution {
  campuses: string;
}

export interface CampusesColumns extends BaseInstitution {
  instituteName: string
}
