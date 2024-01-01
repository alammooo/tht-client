import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "@/app/store"
import axios from "axios"
import { baseUrl } from "@/utils/baseUrl"
import { Category } from "@/types/category.types"

export interface CategoryState {
  category: Category
  status: "idle" | "loading" | "failed" | "success"
  error: string | null | undefined
}

const initialState: CategoryState = {
  category: [],
  status: "idle",
  error: null,
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/category`) // Replace '/api/categories' with your backend endpoint
      console.log(response, "MASUK RESPONSE✅✅✅✅✅")
      return response.data // Assuming the response.data is an array of Category objects
    } catch (error) {
      // Handle errors
      console.log(error)
      throw Error("Failed to fetch categories")
    }
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // You can add additional reducers for managing categories here if needed
  },
  extraReducers: (builder) => {
    // Add reducers for handling the fetchCategories action lifecycle
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "success"
        state.category = action.payload // Update categories array with fetched data
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const {} = categorySlice.actions
export const selectCategory = (state: RootState) => state.category.category
export default categorySlice.reducer
