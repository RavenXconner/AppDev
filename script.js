function loadCourses() {
  fetch('courses.json') 
    .then(response => response.json()) 
    .then(data => {
      const courseList = document.getElementById('course-list'); 
      courseList.innerHTML = ''; 

      
      data.courses.forEach(course => {
        const row = document.createElement('tr'); 
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
    .catch(error => {
      
      const courseList = document.getElementById('course-list');
      courseList.innerHTML = '<tr><td colspan="5">Failed to load courses.</td></tr>'; 
      console.error('Error loading courses:', error);
    });
}


document.addEventListener('DOMContentLoaded', loadCourses);
