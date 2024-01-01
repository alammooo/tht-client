import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "@/app/store"
import axios from "axios"
import { baseUrl } from "@/utils/baseUrl"
import { Product } from "@/types/product.types"

export interface ProductState {
  product: Product[] | []
  status: "idle" | "loading" | "failed" | "success"
  error: string | null | undefined
  selectedId: number
}

const initialState: ProductState = {
  product: [],
  status: "idle",
  error: null,
  selectedId: 0,
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/product`) // Replace '/api/categories' with your backend endpoint
      return response.data // Assuming the response.data is an array of Product objects
    } catch (error) {
      // Handle errors
      console.log(error)
      throw Error("Failed to fetch products")
    }
  }
)

export const createProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/product`) // Replace '/api/categories' with your backend endpoint
      return response.data // Assuming the response.data is an array of Product objects
    } catch (error) {
      // Handle errors
      console.log(error)
      throw Error("Failed to fetch products")
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProductId(state, action) {
      state.selectedId = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for handling the fetchCategories action lifecycle
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "success"
        state.product = action.payload // Update categories array with fetched data
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { setSelectedProductId } = productSlice.actions
export const productData = (state: RootState) => state.product.product
export default productSlice.reducer
