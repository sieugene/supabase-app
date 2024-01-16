import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";
import { useCallback, useMemo, useState } from "react";
import { SUPABASE_CLIENT } from "shared/api/supabase";
import { useDebounce } from "shared/hooks/useDebounce";
import { useSessionContext } from "shared/providers";
import useSWR from "swr";
import { CoursesData } from "../types";
import { useStudentCourses } from "./useStudentCourses";

export const useCourses = () => {
  const { user } = useSessionContext();
  const [searchValue, setSearch] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const {
    data: studentCourses,
    isLoading: studentCoursesLoading,
    mutate: mutateStudentCourses,
  } = useStudentCourses();

  const { data: allCourses, isLoading: allCoursesLoading } = useSWR(
    user && `/courses/search=${debouncedSearch || ""}`,
    async () => {
      if (!user) return null;
      let error: PostgrestError | null = null;
      let coursesData: PostgrestSingleResponse<Tables<"courses">[]>["data"] =
        [];

      if (debouncedSearch?.length) {
        const searchResult = await SUPABASE_CLIENT.from("courses")
          .select("*")
          .textSearch("courses_find_title_code", debouncedSearch);
        error = searchResult?.error;
        coursesData = searchResult?.data || [];
      } else {
        const getAllResult = await SUPABASE_CLIENT.from("courses").select("*");
        error = getAllResult?.error;
        coursesData = getAllResult?.data || [];
      }

      if (error) {
        throw new Error(error.message);
      }
      return coursesData;
    }
  );

  const isLoading = useMemo(
    () => studentCoursesLoading || allCoursesLoading,
    [allCoursesLoading, studentCoursesLoading]
  );
  const coursesData = useMemo(() => {
    const data: CoursesData =
      allCourses?.map((course) => {
        const isJoined = studentCourses?.find(
          (studentCourse) => studentCourse.courses?.id === course.id
        );

        return {
          ...course,
          joined: !!isJoined,
        };
      }) || [];
    return data;
  }, [allCourses, studentCourses]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return {
    searchValue,
    handleSearch,
    coursesData,
    allCourses,
    studentCourses,
    isLoading,
    refetch: async () => {
      await mutateStudentCourses(null);
    },
  };
};
