export interface Address {
  id?: string;
  firstName?: string;
  lastName?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault?: boolean;
  isDeleted?: boolean;
}
