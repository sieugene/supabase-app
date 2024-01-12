import { useStudent } from "entities/student/hooks/useStudent";
import { useMemo } from "react";
import { SUPABASE_CLIENT } from "shared/api/supabase";
import { useSessionContext } from "shared/providers";
import useSWR from "swr";
import { CoursesData } from "../types";

export const useCourses = () => {
  const { user } = useSessionContext();

  const {
    data: studentCourses,
    isLoading: studentCoursesLoading,
    mutate: mutateStudentCourses,
  } = useStudentCourses();
  const { data: allCourses, isLoading: allCoursesLoading } = useSWR(
    user && `/courses/`,
    async () => {
      if (!user) return null;

      const { data: courses, error } = await SUPABASE_CLIENT.from(
        "courses"
      ).select("*");

      if (error) {
        throw new Error(error.message);
      }
      return courses;
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

  return {
    coursesData,
    allCourses,
    studentCourses,
    isLoading,
    refetch: async () => {
      await mutateStudentCourses(null);
    },
  };
};

const useStudentCourses = () => {
  const { data: student } = useStudent();

  return useSWR(student && `/courses/${student?.id}`, async () => {
    if (!student) return null;

    const { data: courseStudents, error } = await SUPABASE_CLIENT.from(
      "student_courses"
    )
      .select(`courses ( * ), students ( * ) `)
      .eq("student_id", student.id);

    if (error) {
      throw new Error(error.message);
    }
    return courseStudents;
  });
};
