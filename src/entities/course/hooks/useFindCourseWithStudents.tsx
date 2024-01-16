import { Tables } from "database.types";
import { SUPABASE_CLIENT } from "shared/api/supabase";
import useSWR from "swr";

export const useFindCourseWithStudents = (
  courseId: Tables<"courses">["id"]
) => {
  return useSWR(!!courseId && `/course/${courseId}`, async () => {
    const { data: courseStudents, error } = await SUPABASE_CLIENT.from(
      "student_courses"
    )
      .select(`courses ( * ), students ( * ) `)
      .eq("course_id", courseId);

    if (error) {
      throw new Error(error.message);
    }

    if (!courseStudents?.length && !error) {
      const { data: course, error } = await SUPABASE_CLIENT.from("courses")
        .select(`*`)
        .eq("id", courseId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      const dataWithoutStudents: CourseWithStudents = {
        course,
        students: [],
      };
      return dataWithoutStudents;
    }

    const data: CourseWithStudents = {
      course: courseStudents?.[0].courses || null,
      students:
        courseStudents?.map((info) => ({
          created_at: info.students?.created_at || "",
          id: info?.students?.id || 0,
          userId: info?.students?.userId || "",
        })) || [],
    };

    return data;
  });
};

export type CourseWithStudents = {
  course: Tables<"courses"> | null;
  students: Tables<"students">[];
};
