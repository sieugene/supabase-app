import { Tables } from "database.types";

export type CoursesData = (Tables<"courses"> & {
  joined: boolean;
})[];
