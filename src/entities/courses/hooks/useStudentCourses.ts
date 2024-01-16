import { useStudent } from 'entities/student/hooks/useStudent';
import { SUPABASE_CLIENT } from 'shared/api/supabase';
import useSWR from 'swr';

export const useStudentCourses = () => {
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
