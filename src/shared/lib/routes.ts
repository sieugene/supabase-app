export const ROUTES = {
  home: "/",
  student: "/student",
  course: "course/:courseId",
  getCoursePage: (id: string | number) => `/course/${id}`,
};
