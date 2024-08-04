import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface SelectionState {
  selectedInput: string;
  selectedModel: string;
  searchedWord: string;
  imageOption: string;
  session_id: string;
  selectedImageModel: string;
  selectedImageModelIcon: string;
}

const initialState: SelectionState = {
  selectedInput: "Ask Anything",
  selectedModel: "GPT 3.5",
  imageOption: "Edit Image",
  selectedImageModel: "",
  selectedImageModelIcon: "",
  searchedWord: "",
  session_id: "",
};

const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {
    setSelectedInput: (state, action: PayloadAction<{ title: string }>) => {
      state.selectedInput = action.payload.title;
      if (action.payload.title === "Generate Image") {
        state.selectedImageModel = "Stable Diffusion";
      } else {
        state.selectedImageModel = "";
      }
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload;
      state.selectedImageModel = "";
      state.selectedImageModelIcon = "";
    },
    setSelectedImageOption: (state, action: PayloadAction<string>) => {
      if (state.imageOption === action.payload) {
        state.imageOption = "";
      } else {
        state.imageOption = action.payload;
      }
    },
    setSearchedWord: (state, action: PayloadAction<string>) => {
      state.searchedWord = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.session_id = action.payload;
    },
    setImageModelDetail: (
      state,
      action: PayloadAction<{ model_name: string; icon: string }>
    ) => {
      state.selectedImageModel = action.payload.model_name;
      state.selectedImageModelIcon = action.payload.icon;
    },
  },
});

export const {
  setSelectedInput,
  setSelectedModel,
  setSearchedWord,
  setSessionId,
  setImageModelDetail,
  setSelectedImageOption,
} = selectionSlice.actions;
export default selectionSlice.reducer;
