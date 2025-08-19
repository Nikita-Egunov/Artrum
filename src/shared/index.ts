import { Token } from "../utils/types/token.interface";
import { prisma } from "./config/db";
import { useGetProfileQuery } from "./redux/apiSlices/profileSlice";

export {
  useAppDispatch,
  useAppSelector,
  useAppStore,
  makeStore,
} from "./redux";
export type { Token };
export { prisma };
export { useGetProfileQuery }
