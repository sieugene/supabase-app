import { Tables } from "database.types";
import { useStudent } from "entities/student/hooks/useStudent";
import { useCallback } from "react";
import { SUPABASE_CLIENT } from "shared/api/supabase";

export const useJoinInCourse = () => {
  const { data: student } = useStudent();

  const joinInCourse = useCallback(
    async (courseId: Tables<"courseStudents">["course_id"]) => {
      await SUPABASE_CLIENT.from("courseStudents")
        .insert([{ student_id: student?.id, course_id: courseId }])
        .select();
    },
    [student?.id]
  );
  return joinInCourse;
};
