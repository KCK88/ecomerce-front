import type {UserType} from "@/types/UserType.ts";

export type LoginResponse = {
  token: string;
  user: UserType;
}