//
import { BaseService } from "@/app/api/services/base.service";
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
  addresses: AddressesData[];
}

export class AddressService extends BaseService {
  async updateAddress(UserId: string, data: updateProfileData) {
    let _addresses: AddressesData[] = data.addresses;
    const upsertPromises = await _addresses.map((address) =>
      prisma.address.upsert({
        where: { id: address.id || "", isDeleted: false }, // Ensure we only use an ID if provided
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

    const user = await prisma.user.findUnique({
      where: {
        UserId: UserId,
      },
      select: {
        UserId: true,
        addresses: {
          where: {
            isDeleted: false,
          },
        },
      },
    });

    return user;
  }

  async deleteAddress(UserId: string, addressId?: string) {
    const address = await prisma.address.update({
      where: {
        userId: UserId,
        id: addressId,
      },
      data: {
        isDeleted: true,
      },
    });
    return address;
  }

  async getAddressess(UserId: string) {
    const addressess = await prisma.address.findMany({
      where: {
        userId: UserId,
        isDeleted: false,
      },
    });
    return addressess;
  }
}
