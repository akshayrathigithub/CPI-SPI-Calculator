import {
  CHM,
  AE,
  BSBE,
  CHE,
  CE,
  CSE,
  ES,
  ECO,
  EE,
  MSE,
  MTH,
  ME,
  PHY,
  SDS,
  MTech_MSc,
} from "./departments.js";

export const COURSE_TYPE = {
  COMPULSORY: "compulsory",
  ELECTIVE: "elective",
};

export const GRADE_TYPE = {
  CPI: "CPI",
  SPI: "SPI",
};

export const DEPARTMENTS_CODE = [
  "CHM",
  "AE",
  "BSBE",
  "CHE",
  "CE",
  "CSE",
  "ES",
  "ECO",
  "EE",
  "MSE",
  "MTH",
  "ME",
  "PHY",
  "SDS",
];

export const SEMESTER_ORDER_LIST = [
  "First Semester",
  "Second Semester",
  "Summer-1",
  "Third Semester",
  "Fourth Semester",
  "Summer-2",
  "Fifth Semester",
  "Sixth Semester",
  "Summer-3",
  "Seventh Semester",
  "Eighth Semester",
  "Summer-4",
  "MTech/MSc",
];

export const semesterMapping = {
  "First Semester": "one",
  "Second Semester": "two",
  "Third Semester": "three",
  "Fourth Semester": "four",
  "Fifth Semester": "five",
  "Sixth Semester": "six",
  "Seventh Semester": "seven",
  "Eighth Semester": "eight",
  "MTech/MSc": "mtech_msc",
};

export const gradeToPointMapping = {
  "A/A*": 10,
  "B+": 9,
  B: 8,
  "C+": 7,
  C: 6,
  "D+": 5,
  D: 4,
  E: 0,
  F: 0,
  Drop: 0,
};

export const DEPARTMENTS = {
  CHM,
  AE,
  BSBE,
  CHE,
  CE,
  CSE,
  ES,
  ECO,
  EE,
  MSE,
  MTH,
  ME,
  PHY,
  SDS,
  "MTech/MSc": MTech_MSc,
};

// Utility functions

export function addCourseBtn() {
  return `<td><div class="container">
  <button class="btn btn-outline-success add-course-btn">Add Course</button></div></td><td></td><td></td>`;
}

export function addNewCourse(title, credits = 10) {
  return `
  <td><input class="form-control-plaintext text-center" placeholder="${title}" type="text"></td>
  <td><input class="form-control-plaintext text-center" placeholder="${credits}*" type="number"></td>
  <td>${gradeDropdown()}</td>`;
}

export function semesterHtml(title) {
  return `
  <div class="card">
      <h2 class="card-header">${title}</h2>
      <table class="table">
          <thead class="thead-light">
              <tr>
                  <th scope="col">Course</th>
                  <th scope="col"> Credit</th>
                  <th scope="col">Grade</th>
              </tr>
          </thead>
      </table>
</div>`;
}

export function gradeDropdown() {
  return `<div class="dropdown">
  <a class="btn btn-success dropdown-toggle" href="#" role="button"
       data-toggle="dropdown" aria-haspopup="true"
      aria-expanded="false"></a>
  <div class="dropdown-menu">
      <a class="dropdown-item" href="#">A/A*</a>
      <a class="dropdown-item" href="#">B+</a>
      <a class="dropdown-item" href="#">B</a>
      <a class="dropdown-item" href="#">C+</a>
      <a class="dropdown-item" href="#">C</a>
      <a class="dropdown-item" href="#">D+</a>
      <a class="dropdown-item" href="#">D</a>
      <a class="dropdown-item" href="#">E</a>
      <a class="dropdown-item" href="#">F</a>
      <a class="dropdown-item" href="#">Drop</a>
  </div>
</div>`;
}

export function tableRow(course, credit) {
  return `<tr>
  <td>${course}</td>
  <td>${credit}</td>
  <td>${gradeDropdown()}</td>
</tr>`;
}
