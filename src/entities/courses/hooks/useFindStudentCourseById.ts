import { Tables } from "database.types";
import { useStudent } from "entities/student/hooks/useStudent";
import { SUPABASE_CLIENT } from "shared/api/supabase";
import useSWR from "swr";

export const useFindStudentCourseById = (
  courseId: Tables<"courses">["id"] | null
) => {
  const { data: student } = useStudent();

  return useSWR(
    student && `/courses/${student?.id}/course/${courseId}`,
    async () => {
      if (!student || !courseId) return null;

      const { data: courseStudents, error } = await SUPABASE_CLIENT.from(
        "student_courses"
      )
        .select(`courses ( * ), students ( * ) `)
        .eq("course_id", courseId)
        .eq("student_id", student.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return courseStudents?.courses;
    }
  );
};
