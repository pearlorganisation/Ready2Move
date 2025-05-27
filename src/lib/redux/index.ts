import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import otpReducer from "./slice/otpVerificationSlice";
import userReducer from "./slice/userSlice";
import bannerReducer from "./slice/bannerSlice";
import featureReducer from "./slice/featuresSlice";
import projectReducer from "./slice/projectSlice";
import propertyReducer from "./slice/propertySlice";
import leadsReducer from "./slice/leadSlice";
import dashboardReducer from "./slice/dashboardSlice";
import forgotPasswordReducer from "./slice/passwordSlice";
import featuredReducer from "./slice/featuredListingsSlice";
import blogsReducer from "./slice/blogSlice";
import footerReducer from "./slice/footerSlice";
import faqReducer from "./slice/FAQSlice";
const rootReducer = combineReducers({
  auth: authReducer, // Add other reducers here
  otp: otpReducer,
  blogs: blogsReducer,
  user: userReducer,
  banner: bannerReducer,
  features: featureReducer,
  projects: projectReducer,
  property: propertyReducer,
  leads: leadsReducer,
  dashboard: dashboardReducer,
  featured: featuredReducer,
  forgotpassword: forgotPasswordReducer,
    footer: footerReducer,
    FAQ:faqReducer
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;
