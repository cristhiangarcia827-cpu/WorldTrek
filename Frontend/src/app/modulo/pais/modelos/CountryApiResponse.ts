export interface CountryAPIResponse {
    name:         Name;
    tld:          string[];
    cca2:         string;
    cioc:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    string;
    latlng:       number[];
    landlocked:   boolean;
    borders:      string[];
    cca3:         string;
    flag:         string;
    population:   number;
    fifa:         string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  string;
    capitalInfo:  CapitalInfo;
    postalCode:   PostalCode;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  string;
}

export interface CoatOfArms {
    png: string;
    svg: string;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Name {
    common:   string;
    official: string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}
