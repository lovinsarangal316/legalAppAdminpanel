import * as Yup from "yup";

// Validation schema for Login
const SchemaForLogin = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
// Validation schema for User mgmt

const SchemaForUserMgmtCreateUser = Yup.object({
  phone: Yup.number().required("Phone is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender selection")
    .required("Gender is required"),
  address: Yup.string()
    // .min(5, "Address must be at least 5 characters long")
    .required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string()
    // .matches(/^\d{4}(-\d{4})?$/, "Invalid postal code format")
    .min(4, "Invalid postal code format")
    .required("Postal Code is required"),
  image: Yup.string().required("Image is required"),
  // .test(
  //   "fileType",
  //   "Only image files are allowed",
  //   (value) => value && value.type.startsWith("image/")
  // ),
});

const SchemaForUpdateUserMgmt = Yup.object({
  phone: Yup.number().required("Phone is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender selection")
    .required("Gender is required"),
  address: Yup.string()
    // .min(5, "Address must be at least 5 characters long")
    .required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string()
    .min(4, "Invalid postal code format")
    // .matches(/^\d{4}(-\d{4})?$/, "Invalid postal code format")
    .required("Postal Code is required"),
  image: Yup.string().required("Image is required"),
  // .test(
  //   "fileType",
  //   "Only image files are allowed",
  //   (value) => value && value.type.startsWith("image/")
  // ),
});

// Validation schema for Banner
const SchemaForBanner = Yup.object({
  title: Yup.string().required("Banner title is required"),
  banner_image: Yup.mixed().required("Banner image is required"),
  // .test("fileType", "Only PNG, JPEG and JPG images are allowed", (value) => {
  //   return (
  //     value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
  //   );
  // }),
});

// Validation schema for Publication

const SchemaForPublication = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().required("Image is required"),
});

// Validation schema for Faq
const SchemaForFaq = Yup.object({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

// Validation schema For AboutUs, Policy and Terms and consition page
const validationForAboutTermPolicy = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});
// Validation schma for forgotpassword
const SchemaForForgotPass = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
// Validation schma for Create Pass
const SchemaForCreatePass = Yup.object({
  new_password: Yup.string().required("New Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// Define Object for all schema
export const ValidationSchemas = {
  Login: SchemaForLogin,
  UserCreateMgmt: SchemaForUserMgmtCreateUser,
  UserUpdateMgmt: SchemaForUpdateUserMgmt,

  Banner: SchemaForBanner,
  Publication: SchemaForPublication,
  Faq: SchemaForFaq,
  AboutTermPolicy: validationForAboutTermPolicy,
  ForgotPass: SchemaForForgotPass,
  CreatePass: SchemaForCreatePass,
};
