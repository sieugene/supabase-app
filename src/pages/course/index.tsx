import { Course } from "entities/course/ui";
import { useParams } from "react-router-dom";

export const CoursePage = () => {
  const params = useParams<{ courseId: string }>();

  return (
    <>
      <Course courseId={Number(params.courseId)} />
    </>
  );
};
