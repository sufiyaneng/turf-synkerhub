import * as Yup from "yup";

export const signupSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    turfName: Yup.string()
      .required("Turf Name is required")
      .min(2, "Turf Name must be at least 2 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?\":{}|<>]/, "Password must contain at least one special character"),
  });

  export const loginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?\":{}|<>]/, "Password must contain at least one special character"),
  });

  export const recoverMailSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  })

  export const resetPasswordSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?\":{}|<>]/, "Password must contain at least one special character"),

      confirmPassword: Yup.string()
    .required("Please re-enter your password")
    .oneOf([Yup.ref('password')], "Passwords must match")
  });

  export const createBookingSchema = Yup.object({
    bookerName: Yup.string()
      .required("Booker Name is required")
      .min(3, "Booker Name must be at least 3 characters"),
    slotDate: Yup.string()
      .required("Slot Date is required"),
    slotTime: Yup.string()
      .required("Slot Time is required"),
    amount: Yup.number()
      .required("Amount Paid is required")
      .min(0, "Amount Paid must be at least 0"),
  });

 export  const tabs = [
    {
      label:'Upcoming',
      value:'UPCOMNG'
    },
    {
      label:'Previous',
      value:'PREVIOUS'
    },
    {
      label:'Cancelled',
      value:'CANCELLED'
    }
  ]