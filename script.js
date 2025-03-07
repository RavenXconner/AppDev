function loadCourses() {
  fetch("courses.json")
    .then((response) => response.json())
    .then((data) => {
      const courseList = document.getElementById("course-list");
      courseList.innerHTML = ""; 

     
      window.courses = data.courses;

      data.courses.forEach((course) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${course.code}</td>
          <td>${course.description}</td>
          <td>${course.year_level}</td>
          <td>${course.sem}</td>
          <td>${course.credit}</td>
        `;
        courseList.appendChild(row);
      });
    })
    .catch((error) => {
      const courseList = document.getElementById("course-list");
      courseList.innerHTML =
        '<tr><td colspan="5">Failed to load courses.</td></tr>';
      console.error("Error loading courses:", error);
    });
}


function filterCourses() {
  const searchInput = document.getElementById("search-bar").value.toLowerCase();
  const courseList = document.getElementById("course-list");
  const rows = courseList.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    let matchFound = false;

  
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent.toLowerCase();
      if (cellText.includes(searchInput)) {
        matchFound = true;
        break; 
      }
    }

    if (matchFound) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", loadCourses);