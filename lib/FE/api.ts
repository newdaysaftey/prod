import axios from "axios";
import { string } from "zod";
import { ProductFormDataStep1 } from "./types/step1";
import { ProductFormDataStep2 } from "./types/step2";

const api = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://new-days-aftey-next-js.vercel.app/",
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

export const saveProduct = async (
  data: ProductFormDataStep1 | ProductFormDataStep2
) => {
  const response = await api.post(`product`, data);
  if (response.status !== 200) throw new Error("Failed to save product");
  return await response.data;
};

export const fetchCategories = async () => {
  const response = await api.get("/category/");
  const result = await response.data;
  return result.data;
};

export const handleImageUpload = async (files: File[]): Promise<string[]> => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("ImageFile", file);
    });

    const response = await api.post("/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.error("Error uploading files:", error);
    return [];
  }
};
