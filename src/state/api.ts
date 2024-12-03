import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Interface } from "readline";

// Define your interfaces for the data
export interface Product {
  id: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface DashboardData {
  ProductList: Product[];
  SalesSummaryList: SalesSummary[];
  PurchaseSummaryList: PurchaseSummary[];
  ExpenseSummaryList: ExpenseSummary[];
  ExpenseByCategoryList: ExpenseByCategorySummary[];
}
export interface DashboardApiResponse {
  code: number;
  success: boolean;
  status: string;
  message: string;
  data: DashboardData[];
}

export interface Products{
  ProductList:Product[]
}
export interface ProductApiResponse{
  code: number;
  success: boolean;
  status: string;
  message: string;
  data: Products;
}

// Set up the API service
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardApiResponse", "ProductApiResponse", "Users", "Expenses"],
    endpoints: (build) => ({
      getDashboardMetrics: build.query<DashboardApiResponse, void>({
        query: () => "/dashboard/getDashboardMetrices", // Ensure this is the correct API endpoint
        providesTags: ["DashboardApiResponse"],
      }),

      getProducts: build.query<ProductApiResponse, string | void>({
        query: (search) => ({
          url: "/product/getProducts",
          params: search ? { search } : {},
        }),
        providesTags: ["ProductApiResponse"],
      }),
      createProduct: build.mutation<Product, NewProduct>({
        query: (newProduct) => ({
          url: "/products",
          method: "POST",
          body: newProduct,
        }),
        invalidatesTags: ["ProductApiResponse"],
      }),
      getUsers: build.query<User[], void>({
        query: () => "/users",
        providesTags: ["Users"],
      }),
      getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
        query: () => "/expenses",
        providesTags: ["Expenses"],
      }),
    }),
  });
  

  export const {
    useGetDashboardMetricsQuery,
    useGetProductsQuery,
    useCreateProductMutation,
    useGetUsersQuery,
    useGetExpensesByCategoryQuery,
  } = api;



