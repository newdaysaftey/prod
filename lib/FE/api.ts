import axios from "axios";
import { string } from "zod";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = async (data: {
  Email: string;
  Username: string;
  Password: string;
  FirstName: string;
  LastName: string;
}) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const signIn = async (data: { Email: string; Password: string }) => {
  const response = await api.post("/auth/signin", data);
  return response.data;
};

export const getAdminProducts = async (
  pageSize: number = 10,
  pageNumber: number = 1,
  category: string
) => {
  const response = await api.get(
    `/product?page=${pageNumber}&limit=${pageSize}`
  );
  return response.data;
};

export const getAdminProduct = async (id: string) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};
export const handleImageUpload = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("ImageFile", file);
    const response = await api.post("/uploadImage", formData);

    return response.data.imageUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
