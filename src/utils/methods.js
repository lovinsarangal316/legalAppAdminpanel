export const tryCatchWrapper = async (asyncFunction, args, rejectWithValue) => {
  try {
    return await asyncFunction(args);
  } catch (error) {
    return rejectWithValue(error.message || "An error occurred");
  }
};
