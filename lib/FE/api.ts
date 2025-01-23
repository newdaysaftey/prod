import axios from "axios";
import { ProductFormDataStep1 } from "./types/step1";
import { ProductFormDataStep2 } from "./types/step2";
import { CartItem } from "./types/cart";
import { UpdateUserProfile } from "./types/user";
import { CreateOrder, Order, UpdatePaymentStatusResponse } from "./types/order";
import { ApiResponse } from "@/app/api/types";

const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(
  (response) => response, // Return response directly if successful
  (error) => {
    if (error.response?.status === 401) {
      // Check if window is defined to ensure client-side execution
      if (typeof window !== "undefined") {
        window.location.href = "/auth/signin";
      }
    }
    return Promise.reject(error); // Reject the error to handle it in the calling function
  }
);

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
    console.log(response, "is it wokring?");
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
  const response = await api.get("/tag", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const createTag = async (name: string) => {
  const response = await api.post(
    "/tag",
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
  const response = await api.post(
    "/tag/products",
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
  const response = await api.get(`/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const addToCart = async (cartItems: CartItem[]) => {
  const response = await api.post(
    "/cart/",
    {
      cartItems,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getCart = async () => {
  const response = await api.get("/cart/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
) => {
  const response = await api.patch(
    `/cart`,
    {
      quantity,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const removeCartItem = async (itemId: string) => {
  const response = await api.delete(`/cart/?cartItemId=${itemId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getProducts = async (
  limit: number,
  page: number,
  tags?: string,
  search?: string,
  categoryId?: string
) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (tags) params.append("search", tags);
  if (search) params.append("search", search);
  if (categoryId) params.append("categoryId", categoryId);

  const response = await api.get(`/product/?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/user", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateUserProfile = async (data: UpdateUserProfile) => {
  const response = await api.post("/user", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getAddresses = async () => {
  const response = await api.get("/address", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const createOrder = async (orderData: CreateOrder) => {
  const response = await api.post("/order", orderData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await api.get("/order");
  return response.data;
};

export const getOrderDetails = async (
  orderId: string
): Promise<ApiResponse<Order>> => {
  const response = await api.get(`/order/${orderId}`);
  return response.data;
};
export const updateOrderPaymentStatus = async (
  orderId: string,
  paymentStatus: string
): Promise<UpdatePaymentStatusResponse> => {
  const response = await api.patch(
    `/payment?orderId=${orderId}&paymentStatus=${paymentStatus}`
  );
  return response.data;
};

export const faqSection = async (question: string): Promise<any> => {
  const response = await api.post("/faq/", { question });
  return response.data;
};
export const deleteProduct = async (productId: string) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`/product/?productId=${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const deleteCategory = async (categoryId: string) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`/category/?categoryId=${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const deleteTag = async (tagId: string) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`/tag?tagId=${tagId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const updateCategorySequence = async (data: {
  categories: { CategoryId: string; sequence: number }[];
}) => {
  const response = await axios.put("/api/category/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
