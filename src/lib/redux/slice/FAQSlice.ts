import { createSlice } from "@reduxjs/toolkit";
import { AddFAQ, deleteFaqs, getAllFaqs, updateFaq } from "../actions/faqAction";
import { toast } from "react-toastify";
import { act } from "react";

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

interface FAQState {
  loading: boolean;
  error: boolean | null;
  faqs: FAQ[];
  faq:FAQ[]

}

const initialState: FAQState = {
  loading: false,
  error: null,
  faqs: [],
  faq:[]
 
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddFAQ.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddFAQ.fulfilled, (state, action) => {
        state.loading = false;
        state.faq = action.payload;
        toast.success("FAQ added successfully!");
      })
      .addCase(AddFAQ.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error("Failed to add FAQ.");
      })
      .addCase(getAllFaqs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload.data;
      })
      .addCase(getAllFaqs.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error("Failed to fetch FAQs.");
      })
      .addCase(updateFaq.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.faq = action.payload;
        toast.success("FAQ updated successfully!");
      })
      .addCase(updateFaq.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error("Failed to update FAQ.");
      })
      .addCase(deleteFaqs.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFaqs.fulfilled, (state, action) => {
        console.log("Delete fulfilled", action); // Add this
        state.loading = false;
        state.faqs = state.faqs.filter((item: any) => item?._id !== action?.meta?.arg);
        toast.success("FAQ deleted successfully!");
      })
      
      .addCase(deleteFaqs.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error("Failed to delete FAQ.");
      });
  },
});

export default faqSlice.reducer;
