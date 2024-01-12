import { Tables } from "database.types";
import { useStudent } from "entities/student/hooks/useStudent";
import { useCallback } from "react";
import { SUPABASE_CLIENT } from "shared/api/supabase";

export const useJoinInCourse = (refetchCourses: () => Promise<void>) => {
  const { data: student } = useStudent();

  const joinInCourse = useCallback(
    async (courseId: Tables<"student_courses">["course_id"]) => {
      if (!student) return;
      await SUPABASE_CLIENT.from("student_courses")
        .insert([{ course_id: courseId, student_id: student?.id }])
        .select();
      await refetchCourses();
    },
    [student, refetchCourses]
  );
  return joinInCourse;
};
