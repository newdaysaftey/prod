import axios from "axios";
import { string } from "zod";
import { ProductFormDataStep1 } from "./types/step1";
import { ProductFormDataStep2 } from "./types/step2";

const api = axios.create({
  baseURL: "https://new-days-aftey-next-js.vercel.app/api",
  // baseURL: "http://localhost:3000/api",
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
  category?: string
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
export const getCategories = async () => {
  const response = await api.get("/category/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const createCategory = async (name: string) => {
  const response = await api.post(
    "/category/",
    { Name: name },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getTags = async () => {
  const response = await axios.get("/api/tag", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const createTag = async (name: string) => {
  const response = await axios.post(
    "/api/tag",
    { name },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const linkProductsToTag = async (
  tagId: string,
  productIds: string[]
) => {
  const response = await axios.post(
    "/api/tag/products",
    { tagId, productIds },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`/api/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
