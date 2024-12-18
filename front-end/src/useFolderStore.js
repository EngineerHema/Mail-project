// src/store/useFolderStore.js
import { create } from 'zustand';

const useFolderStore = create((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),
  addFolder: (folder) => set(state => {
    console.log("Adding folder:", folder);
    return { folders: [...state.folders, folder] };
  }),
  updateFolders: (folders) => {
    console.log("Updating folders:", folders);
    set({ folders });
  },
  removeFolder: (index) => set(state => {
    console.log("Removing folder at index:", index);
    return { folders: state.folders.filter((_, i) => i !== index) };
  }),
}));

export default useFolderStore;
