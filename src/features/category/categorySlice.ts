import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "@/app/store"
import axios from "axios"
import { baseUrl } from "@/utils/baseUrl"
import { Category } from "@/types/category.types"

export interface CategoryState {
  category: Category[] | []
  status: "idle" | "loading" | "failed" | "success"
  error: string | null | undefined
  selectedId: number
}

const initialState: CategoryState = {
  category: [],
  status: "idle",
  error: null,
  selectedId: 0,
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
    setSelectedId(state, action) {
      state.selectedId = action.payload
    },
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

export const { setSelectedId } = categorySlice.actions
export const categoryData = (state: RootState) => state.category.category
export const categoryId = (state: RootState) => state.category.selectedId
export default categorySlice.reducer
