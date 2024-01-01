import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "@/app/store"
import axios from "axios"
import { baseUrl } from "@/utils/baseUrl"
import {
  CreateInput,
  FindInput,
  Pagination,
  Product,
} from "@/types/product.types"
import { toast } from "@/components/ui/use-toast"

export interface ProductState {
  product: Product[] | []
  status: "idle" | "loading" | "failed" | "success"
  error: string | null | undefined | {}
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
  async (params: FindInput & Pagination) => {
    try {
      console.log(params, "HALLO PARAMS")
      const response = await axios.get(`${baseUrl}/product`, {
        params: {
          offset: params.offset || 0,
          categoryId: params.categoryId || undefined,
          name: params.name || undefined,
        },
      }) // Replace '/api/categories' with your backend endpoint
      console.log(response.data)
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
  async (payload: FormData) => {
    try {
      const response = await axios.post(`${baseUrl}/product`, payload) // Replace '/api/categories' with your backend endpoint
      if (response.status === 201) {
        return toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        }) // Assuming the response.data is an array of Product objects
      }
    } catch (error) {
      // Handle errors
      console.log(error)
      throw Error("Failed to post products")
    } finally {
      fetchProduct({
        offset: 1,
        categoryId: undefined,
        name: undefined,
      })
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedId(state, action) {
      state.selectedId = action.payload
    },
    createProduct(state, action) {},
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

export const { setSelectedId } = productSlice.actions
export const productData = (state: RootState) => state.product.product
export default productSlice.reducer
