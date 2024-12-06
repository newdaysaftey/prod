export interface Address {
  id: string;
  userId?: string;
  firstName: string | null;
  lastName: string | null;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault: boolean;
  isDeleted?: boolean;
}

export interface UserProfile {
  UserId: string;
  Email: string;
  Role: string;
  Username: string | null;
  FirstName: string | null;
  MiddleName: string | null;
  LastName: string | null;
  Phone: number | null;
  Gender: string | null;
  CountryCode: string | null;
  ImageUrl: string | null;
  addresses: Address[];
}

export interface UpdateUserProfile {
  Username: string | null;
  FirstName: string | null;
  LastName: string | null;
  MiddleName: string | null;
  Phone: number | null;
  Gender: string | null;
  CountryCode: string | null;
  ImageUrl: string | null;
  addresses: Address[];
}