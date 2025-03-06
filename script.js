document.addEventListener("DOMContentLoaded", function () {
  const courseList = document.getElementById("course-list");

  function loadCourses() {
    fetch("courses.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }
        return response.json();
      })
      .then((data) => {
        courseList.innerHTML = "";

        if (data.courses.length === 0) {
          courseList.innerHTML = "<li>No courses available.</li>";
          return;
        }

        data.courses.forEach((course) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
                        <strong>${course.code}</strong>: 
                        ${course.description} 
                        (${course.year_level} Year, 
                        ${course.sem} Semester, 
                        ${course.credit} Credits)
                    `;
          courseList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error(error);
        courseList.innerHTML = "<li>Failed to load courses.</li>";
      });
  }

  loadCourses();
});
