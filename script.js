document.addEventListener("DOMContentLoaded", () => {
    fetchCourses("courses.json");
});

function fetchCourses(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load JSON file: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayCourses(data.courses))
        .catch(error => handleError(error));
}

function displayCourses(courses) {
    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML = "<h2>My Finished Courses</h2>";

    if (courses.length === 0) {
        coursesContainer.innerHTML += "<p>No courses available at the moment.</p>";
        return;
    }

    courses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");

        // Destructure course data for cleaner code
        const { year, semester, subjects } = course;

        // Dynamically create course details
        courseDiv.innerHTML = `
            <h3>${year} - ${semester}</h3>
            <ul>
                ${subjects.map(subject => `<li>${subject}</li>`).join("")}
            </ul>
        `;

        coursesContainer.appendChild(courseDiv);
    });
}

function handleError(error) {
    console.error("Error fetching JSON:", error);
    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML = `
        <h2>My Finished Courses</h2>
        <p>Failed to load courses. Please try again later.</p>
    `;
}
