import { Tables } from "database.types";
import { useStudent } from "entities/student/hooks/useStudent";
import { FC } from "react";
import { useCourses } from "../hooks/useCourses";
import { useJoinInCourse } from "../hooks/useJoinInCourse";
import classes from "./Courses.module.scss";

export const Courses = () => {
  const { data: student } = useStudent();
  const {
    coursesData: data,
    studentCourses,
    isLoading,
    refetch,
  } = useCourses();

  const joinInCourse = useJoinInCourse(refetch);

  if (!student) return null;

  return (
    <>
      <h2>Courses</h2>
      {isLoading && <h2>Courses Loading...</h2>}
      <div className={classes.list}>
        {data?.length &&
          data?.map((course) => (
            <CourseCard
              showCardBottom
              joined={course.joined}
              course={course}
              joinInCourse={joinInCourse}
              key={course.id}
            />
          ))}
      </div>

      <h2>Joined courses</h2>
      <div className={classes.list}>
        {studentCourses?.length &&
          studentCourses?.map(
            ({ courses }) =>
              courses && (
                <CourseCard
                  showCardBottom={false}
                  joined={true}
                  course={courses}
                  joinInCourse={joinInCourse}
                  key={courses?.id}
                />
              )
          )}
      </div>
    </>
  );
};

const CourseCard: FC<{
  course: Tables<"courses">;
  joined: boolean;
  joinInCourse: (courseId: number) => Promise<void>;
  showCardBottom: boolean;
}> = ({ course, joinInCourse, joined, showCardBottom = true }) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardHead}>
        <b>{course?.title}</b>
        <p>Date: {new Date(course?.created_at).toUTCString()}</p>
      </div>

      {showCardBottom && (
        <div className={classes.cardBottom}>
          {joined ? (
            <h4>enrolled</h4>
          ) : (
            <button onClick={() => joinInCourse(course?.id)}>Join</button>
          )}
        </div>
      )}
    </div>
  );
};
