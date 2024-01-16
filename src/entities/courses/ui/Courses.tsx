import { Tables } from "database.types";
import { useStudent } from "entities/student/hooks/useStudent";
import { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "shared/lib/routes";
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
    searchValue,
    handleSearch,
  } = useCourses();

  const joinInCourse = useJoinInCourse(refetch);

  if (!student) return null;

  return (
    <>
      <h2>Courses</h2>
      {isLoading && <h2>Courses Loading...</h2>}
      <input
        placeholder="Search course by title or code"
        value={searchValue}
        onChange={({ target }) => handleSearch(target.value)}
      />
      <div className={classes.list}>
        {data?.length
          ? data?.map((course) => (
              <CourseCard
                showStatus
                joined={course.joined}
                course={course}
                joinInCourse={joinInCourse}
                key={course.id}
              />
            ))
          : !isLoading
          ? "Try search another"
          : ""}
      </div>

      <h2>Joined courses</h2>
      <div className={classes.list}>
        {studentCourses?.length ? (
          studentCourses?.map(
            ({ courses }) =>
              courses && (
                <CourseCard
                  showStatus={false}
                  joined={true}
                  course={courses}
                  joinInCourse={joinInCourse}
                  key={courses?.id}
                />
              )
          )
        ) : (
          <h2 style={{ width: "100%" }}>
            You haven't joined any of the courses yet.
          </h2>
        )}
      </div>
    </>
  );
};

const CourseCard: FC<{
  course: Tables<"courses">;
  joined: boolean;
  joinInCourse: (courseId: number) => Promise<void>;
  showStatus: boolean;
}> = ({ course, joinInCourse, joined, showStatus = true }) => {
  const courseLink = useMemo(
    () => ROUTES.getCoursePage(course.id),
    [course.id]
  );
  return (
    <div className={classes.card}>
      <div className={classes.cardHead}>
        <b>{course?.title}</b>
        <p>Date: {new Date(course?.created_at).toUTCString()}</p>
        <p className={classes.codeText}>
          Code: <b>{course?.code}</b>
        </p>
      </div>

      <div className={classes.cardBottom}>
        <NavLink to={courseLink}>Course link details</NavLink>
        {showStatus ? (
          joined ? (
            <h4>enrolled</h4>
          ) : (
            <button onClick={() => joinInCourse(course?.id)}>Join</button>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
