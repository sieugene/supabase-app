import { Tables } from "database.types";
import { FC, useMemo } from "react";
import {
  CourseWithStudents,
  useFindCourseWithStudents,
} from "../hooks/useFindCourseWithStudents";
import styles from "./Course.module.scss";

type Props = {
  courseId: Tables<"courses">["id"];
};
export const Course: FC<Props> = ({ courseId }) => {
  const { data } = useFindCourseWithStudents(courseId);
  const course = useMemo(() => data?.course || null, [data?.course]);
  const students = useMemo(() => data?.students || [], [data?.students]);
  if (!data?.course) return null;
  return (
    <div className={styles.root}>
      <div className={styles.courseInfo}>
        <div className={styles.courseCover}>
          <h3>{course?.title}</h3>
          <h5>Id: {course?.id}</h5>
          <h5>Code: {course?.code}</h5>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsContainer}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            fuga neque nulla voluptatibus necessitatibus natus est quaerat,
            adipisci velit animi. Deserunt expedita distinctio quam blanditiis
            impedit dolores aliquid sed fugit ipsum et. Veritatis quidem, iure
            quis ut ipsa accusamus eos vel aperiam in minus quod, ullam,
            molestias mollitia blanditiis distinctio?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur dignissimos, illo aliquam suscipit reprehenderit quod.
          </p>

          <p>
            Aspernatur fuga neque nulla voluptatibus necessitatibus natus est
            quaerat, adipisci velit animi.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
          <div className={styles.detailsFooter}>
            <button>Join</button>
          </div>
        </div>
      </div>
      <StudentsTable students={students} />
    </div>
  );
};

type StudentsTableProps = {
  students: CourseWithStudents["students"];
};
const StudentsTable: FC<StudentsTableProps> = ({ students }) => {
  return (
    <div className={styles.tableRoot}>
      <h2>Students List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr key={student?.id}>
              <td>{student?.id}</td>
              <td>{student?.userId}</td>
              <td>{student?.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
