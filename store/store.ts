import { createMMKV } from "react-native-mmkv";
export const storage = createMMKV();

export default {
  setItem: (name: string, value: string) => {
    return storage.set(name, value);
  },
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  // removeItem: (name: string) => {
  //   return storage.delete(name);
  // },
};
