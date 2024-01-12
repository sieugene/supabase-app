import { useStudent } from "entities/student/hooks/useStudent";
import { useCourses } from "../hooks/useCourses";
import { useJoinInCourse } from "../hooks/useJoinInCourse";
import classes from "./Courses.module.scss";

export const Courses = () => {
  const { data: student } = useStudent();
  const { coursesData: data, isLoading } = useCourses();

  const joinInCourse = useJoinInCourse();

  if (!student) return null;

  return (
    <>
      <h2>Courses</h2>
      {isLoading && <h2>Courses Loading...</h2>}
      <div className={classes.list}>
        {data?.length &&
          data?.map((course) => {
            return (
              <div className={classes.card} key={course.id}>
                <div className={classes.cardHead}>
                  <b>{course?.title}</b>
                  <p>Date: {new Date(course?.created_at).toUTCString()}</p>
                </div>
                {course.joined ? (
                  <h4>enrolled</h4>
                ) : (
                  <div className={classes.cardBottom}>
                    <button onClick={() => joinInCourse(course?.id)}>
                      Join
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};
