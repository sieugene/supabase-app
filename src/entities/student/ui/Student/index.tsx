import { useStudent } from "entities/student/hooks/useStudent";
import { SUPABASE_CLIENT } from "shared/api/supabase";
import { useSessionContext } from "shared/providers";

export const Student = () => {
  const { user } = useSessionContext();
  const { data, isLoading } = useStudent();

  const joinAsStudent = async () => {
    if (!user) return;
    await SUPABASE_CLIENT.from("students")
      .insert([{ userId: user?.id }])
      .select();
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {!data?.id ? (
        <>
          <h2>You're not a student</h2>
          <button onClick={joinAsStudent}>Join as Student</button>
        </>
      ) : (
        <h2>Student id - {data.id}</h2>
      )}
    </div>
  );
};
