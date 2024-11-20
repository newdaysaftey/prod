//
import { BaseService } from "@/app/api/services/base.service";
import { Gender } from "@/app/types/global";
import prisma from "@/lib/prisma";

interface AddressesData {
  id?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  firstName?: string;
  lastName?: string;
  isDeleted?: boolean;
  isDefault?: boolean;
}

interface updateProfileData {
  Password?: string;
  Username?: string;
  FirstName?: string;
  LastName?: string;
  MiddleName: string | null;
  Phone: number;
  Gender: Gender;
  CountryCode: string | null;
  ImageUrl: string;
  addresses: AddressesData[];
}

export class UserService extends BaseService {
  async getProfile(UserId: string) {
    const user = await prisma.user.findUnique({
      where: {
        UserId: UserId,
      },
      select: {
        UserId: true,
        Email: true,
        Role: true,
        Username: true,
        FirstName: true,
        MiddleName: true,
        LastName: true,
        Phone: true,
        Gender: true,
        CountryCode: true,
        ImageUrl: true,
        addresses: {
          where: {
            isDeleted: false,
          },
        },
      },
    });

    return user;
  }

  async updateProfile(UserId: string, data: updateProfileData) {
    let _addresses: AddressesData[] = data.addresses;
    const upsertPromises = await _addresses.map((address) =>
      prisma.address.upsert({
        where: { id: address.id || "" }, // Ensure we only use an ID if provided
        update: {
          firstName: address.firstName,
          lastName: address.lastName,
          street: address.street,
          city: address.city,
          state: address.state,
          country: address.country,
          pincode: address.pincode,
          isDefault: address.isDefault,
          isDeleted: address.isDeleted,
        },
        create: {
          userId: UserId,
          firstName: address.firstName,
          lastName: address.lastName,
          street: address.street,
          city: address.city,
          state: address.state,
          country: address.country,
          pincode: address.pincode,
          isDefault: address.isDefault,
        },
      })
    );
    await Promise.all(upsertPromises);

    const user = await prisma.user.update({
      where: {
        UserId: UserId,
      },
      data: {
        FirstName: data.FirstName,
        LastName: data.LastName,
        MiddleName: data.MiddleName,
        Phone: data.Phone,
        Gender: data.Gender,
        CountryCode: data.CountryCode,
        ImageUrl: data.ImageUrl,
      },
      select: {
        UserId: true,
        FirstName: true,
        LastName: true,
        MiddleName: true,
        Phone: true,
        Gender: true,
        CountryCode: true,
        ImageUrl: true,
        addresses: true,
      },
    });

    return user;
  }
}
