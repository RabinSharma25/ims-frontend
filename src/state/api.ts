import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface ApiResponse {
  data: DashboardData;
}

export interface DashboardData {
  ProductList: Product[];
  SalesSummaryList: SalesSummary[];
  PurchaseSummaryList: PurchaseSummary[];
  ExpenseSummaryList: ExpenseSummary[];
  ExpenseByCategoryList: ExpenseByCategorySummary[];
}

export interface DashboardData {
    DashboardData: Array<{
      ProductList: Product[];
      SalesSummaryList: any[];
      PurchaseSummaryList: any[];
      ExpenseSummaryList: any[];
      ExpenseByCategoryList: any[];
    }>;
  }



export interface User {
  userId: string;
  name: string;
  email: string;
}

// Set up the API service
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardData", "Products", "Users", "Expenses"],
    endpoints: (build) => ({
      getDashboardMetrics: build.query<DashboardData, void>({
        query: () => "/dashboard/getDashboardMetrices", // Ensure this is the correct API endpoint
        transformResponse: (response: ApiResponse) => {
          console.log("API Response:", response); // Log the full response
          return response.data; // Extract the data field
        },
        providesTags: ["DashboardData"],
      }),
    }),
  });
  
export const {
  useGetDashboardMetricsQuery
} = api;
