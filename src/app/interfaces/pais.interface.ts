export interface Pais {
  id:          string;
  iso2Code:    string;
  name:        string;
  region:      Adminregion;
  adminregion: Adminregion;
  incomeLevel: Adminregion;
  lendingType: Adminregion;
  capitalCity: string;
  longitude:   string;
  latitude:    string;
}

export interface Adminregion {
  id:       string;
  iso2code: string;
  value:    string;
}

export interface PurpleWelcome {
  page:     number;
  pages:    number;
  per_page: string;
  total:    number;
}
