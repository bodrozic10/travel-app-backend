export interface IAccomodation {
  accommodationType: string;
  name: string;
  price: number;
  images: string[];
  location: string;
  averageScore?: number;
  host: any;
  description: string;
  maxGuests: number;
  numBeds: number;
  numBaths: number;
  amenities: Ammenities[];
}

export enum Ammenities {
  "WIFI",
  "TV",
  "KITCHEN",
  "BREAKFAST",
  "LAUNDRY",
  "ELEVATOR",
  "PARKING",
  "POOL",
  "GYM",
}

export enum AccommodationType {
  "APARTMENT",
  "HOUSE",
  "VILLA",
  "RESORT",
  "HOTEL",
  "HOSTEL",
}
