import {
  GRADE_TYPE,
  DEPARTMENTS,
  SEMESTER_ORDER_LIST,
  semesterMapping,
  COURSE_TYPE,
  addNewCourse,
  tableRow,
  semesterHtml,
  addCourseBtn,
  gradeToPointMapping,
} from "./constant.js";

const doc = document;

// button ref
const gradeBtn = doc.getElementById("grade-btn");
const gradeDropdown = doc.getElementById("grade-list");
const semesterBtn = doc.getElementById("semester-btn");
const semesterDropdown = doc.getElementById("semesters-list");
const departmentBtn = doc.getElementById("department-btn");
const departmentDropdown = doc.getElementById("department-list");
const calculateGradeBtn = doc.getElementById("calculate-grade");
const estimateCPIBtn = doc.getElementById("estimate-btn");
const recalculateGradeBtn = doc.getElementById("recalculate-grade");

// elements ref
const calculationContainer = doc.getElementById("calculation-container");
const infoContainer = doc.getElementById("info-container");
const estimateContainer = doc.getElementById("estimate-container");
const modalContainer = doc.getElementById("modal-container");
const errorModalContainer = doc.getElementById("error-modal-container");
const message = doc.getElementById("message");
const estimatedSPIelement = doc.getElementById("estimated-spi");
const counterDiv = doc.getElementById("counter");

// variables
let gradeType,
  semester,
  department,
  totalCreditsDone = 0,
  totalDoneCreditsScore = 0,
  calculatedGrade = 0;

function onLoad() {
  makeDisabled([semesterBtn, departmentBtn]);
  hide([calculationContainer, infoContainer]);

  gradeDropdown.addEventListener("click", onGradeClick);
  semesterDropdown.addEventListener("click", OnSemesterClick);
  departmentDropdown.addEventListener("click", OnDepartmentClick);

  calculateGradeBtn.addEventListener("click", gradeCalculation);
  estimateCPIBtn.addEventListener("click", onEstimate);
  recalculateGradeBtn.addEventListener("click", onRecalculate);
  doc.getElementById("Estimate_btn").addEventListener("click", estimateCPI);
}

function makeDisabled(reference) {
  if (Array.isArray(reference) && reference.length > 0) {
    for (const ref of reference) {
      ref.style.opacity = 0.5;
      ref.disabled = true;
    }
  } else {
    reference.style.opacity = 0.5;
    reference.disabled = true;
  }
}

function makeActive(reference) {
  if (Array.isArray(reference) && reference.length > 0) {
    for (const ref of reference) {
      ref.style.opacity = 1;
      ref.disabled = false;
    }
  } else {
    reference.style.opacity = 1;
    reference.disabled = false;
  }
}

function hide(reference) {
  if (Array.isArray(reference) && reference.length > 0) {
    for (const ref of reference) {
      ref.style.display = "none";
    }
  } else {
    reference.style.display = "none";
  }
}

function show(reference) {
  if (Array.isArray(reference) && reference.length > 0) {
    for (const ref of reference) {
      ref.style.display = "initial";
    }
  } else {
    reference.style.display = "initial";
  }
}

function onGradeClick(e) {
  gradeType = e.target.textContent;
  if (gradeType === GRADE_TYPE.SPI) {
    semesterBtn.textContent = "Semester";
    calculateGradeBtn.textContent = "Calculate SPI";
    hide(estimateCPIBtn);
  } else {
    semesterBtn.textContent = "Semester Completed";
  }
  gradeBtn.textContent = gradeType;

  makeDisabled(gradeBtn);
  makeActive(semesterBtn);
}

function OnSemesterClick(e) {
  semester = e.target.textContent;
  semesterBtn.textContent = semester;
  if (semester === "MTech/MSc") {
    const semesterIndex = 3;
    department = "MTech/MSc";
    renderSemesterToDOM([semester], semesterIndex);
    makeDisabled(departmentBtn);
  } else {
    makeDisabled([gradeBtn, semesterBtn]);
    makeActive(departmentBtn);
  }
  e.preventDefault();
}

function OnDepartmentClick(e) {
  department = e.target.textContent;
  makeDisabled(departmentBtn);
  departmentBtn.textContent = department;

  let semesterList = [...SEMESTER_ORDER_LIST];
  if (gradeType === GRADE_TYPE.CPI) {
    let semesterIndex = semesterList.indexOf(semester);
    if (semesterIndex > -1) {
      // include summer term for even sems
      if (
        semesterIndex === 1 ||
        semesterIndex === 4 ||
        semesterIndex === 7 ||
        semesterIndex === 10
      ) {
        semesterIndex = semesterIndex + 1;
      }
      semesterList = semesterList.slice(0, semesterIndex + 1);
      renderSemesterToDOM(semesterList);
    }
  } else {
    const semesterIndex = semesterList.indexOf(semester);
    renderSemesterToDOM([semester], semesterIndex);
  }
  show([calculationContainer]);
}

function renderSemesterToDOM(semesterList, spiSemesterIndex = 0) {
  semesterList.forEach((sem, index) => {
    const divTag = doc.createElement("div");
    divTag.className = "container my-4";
    let tbodyTag = doc.createElement("tbody");
    tbodyTag.className = "text-uppercase";

    if (sem.includes("Summer")) {
      const summerTerm = (title) => {
        const row = doc.createElement("tr");
        row.innerHTML = addNewCourse(title);
        const gradeDropdown = row.querySelector(".dropdown-menu");
        gradeDropdown.addEventListener("click", onGradeSelect);
        return row;
      };
      tbodyTag.append(
        summerTerm("Summer-1"),
        summerTerm("Summer-2"),
        summerTerm("Summer-3")
      );
    } else {
      const mappedSemester = semesterMapping[sem];
      const courseList = DEPARTMENTS[department][mappedSemester];

      for (const course of courseList) {
        const row = doc.createElement("tr");
        if (course.type === COURSE_TYPE.COMPULSORY) {
          row.innerHTML = tableRow(course.name, course.credit);
        } else {
          row.innerHTML = addNewCourse(course.name, course.credit);
        }
        const gradeDropdown = row.querySelector(".dropdown-menu");
        gradeDropdown.addEventListener("click", onGradeSelect);
        tbodyTag.append(row);
      }
      if (index > 1 || spiSemesterIndex > 1) {
        // add new course btn proceeding from third sem
        const addCourseBtnRow = doc.createElement("tr");
        addCourseBtnRow.innerHTML = addCourseBtn();
        const addNewCourseBtn =
          addCourseBtnRow.querySelector(".add-course-btn");
        addNewCourseBtn.addEventListener("click", addNewCourseToSemester);
        tbodyTag.append(addCourseBtnRow);
      }
    }

    divTag.innerHTML = semesterHtml(sem);
    const tableTag = divTag.querySelector("table");
    tableTag.append(tbodyTag);
    const btnCal = doc.getElementById("calculation-container");
    if (btnCal) {
      btnCal.before(divTag);
    }
  });
}

function onGradeSelect(e) {
  e.target.parentElement.parentElement.children[0].textContent = `${e.target.textContent}`;
  e.preventDefault();
}

function addNewCourseToSemester(e) {
  const addCourse = doc.createElement("tr");
  addCourse.innerHTML = addNewCourse("Extra Course");
  const gradeDropdown = addCourse.querySelector(".dropdown-menu");
  gradeDropdown.addEventListener("click", onGradeSelect);
  const lastRowElement = e.target.parentElement.parentElement.parentElement;
  lastRowElement.before(addCourse);
  e.target.blur();
}

onLoad();

// api call
const fetchData = async () => {
  const BACKEND_API_URL = "https://backend.akshayrathi.com";
  const query = "/analytics?moduleName=CPI_SPI_CALCULATOR";
  const url = BACKEND_API_URL + query;
  const response = await fetch(url);
  const data = await response.json();
  const totalView = data.totalViews.toString();
  let innerHtml = "";
  for (let digit of totalView) {
    innerHtml += `<div style="margin: 0px 2px">${digit}</div>`;
  }
  counterDiv.innerHTML = innerHtml;
};

function gradeCalculation() {
  const allRenderedCourses = doc.querySelectorAll(".container tbody tr");
  for (const course of allRenderedCourses) {
    const gradeDropdown = course.querySelectorAll("td")[2];
    const gradeElement = gradeDropdown.querySelector("a");
    if (gradeElement?.textContent) {
      const grade = gradeElement.textContent;
      if (grade) {
        const gradePoint = gradeToPointMapping[grade];
        const creditElement = course.querySelectorAll("td")[1];
        const creditsEditable = creditElement.querySelector("input");
        if (creditsEditable) {
          const credits = isNaN(Number(creditsEditable.value))
            ? 0
            : Number(creditsEditable.value);
          totalCreditsDone = totalCreditsDone + credits;
          totalDoneCreditsScore = totalDoneCreditsScore + credits * gradePoint;
        } else {
          const credits = isNaN(Number(creditElement.textContent))
            ? 0
            : Number(creditElement.textContent);
          totalCreditsDone = totalCreditsDone + credits;
          totalDoneCreditsScore = totalDoneCreditsScore + credits * gradePoint;
        }
      }
    }
  }

  if (totalCreditsDone === 0 || totalDoneCreditsScore === 0) {
    $("#error-modal-container").modal("show");
    return;
  }
  calculatedGrade = (totalDoneCreditsScore / totalCreditsDone).toFixed(2);

  hide([modalContainer, errorModalContainer, estimateContainer]);
  message.textContent = `Your ${gradeType} is ${calculatedGrade}`;
  show(infoContainer);
}

function onEstimate() {
  show(estimateContainer);
  hide(estimatedSPIelement);
  doc.getElementById(
    "current-cpi"
  ).textContent = `Your current CPI is ${calculatedGrade}`;
  makeDisabled(calculateGradeBtn);

  doc.getElementById(
    "credits-done"
  ).textContent = `Total Credits done are ${totalCreditsDone}`;
}

function estimateCPI() {
  const expectedCredits = Number(doc.getElementById("expected-credits").value);
  const expectedCPI = Number(doc.getElementById("expected-cpi").value);
  let finalExpectedCPI = (
    (expectedCPI * expectedCredits - totalDoneCreditsScore) /
    (expectedCredits - totalCreditsDone)
  ).toFixed(2);
  if (expectedCPI === 0 || expectedCredits === 0) {
    $("#modal-container").modal("show");
  } else {
    if (finalExpectedCPI <= 10) {
      estimatedSPIelement.textContent = `Score ${finalExpectedCPI} SPI in each coming Semester`;
      show(estimatedSPIelement);
    } else {
      doc.getElementById(
        "modalAlertMess"
      ).textContent = `Your Estimated CPI (${finalExpectedCPI}) is greater than 10, which is not possible`;
      $("#modalAlert").modal("show");
    }
  }
}

function onRecalculate() {
  window.location.reload();
  window.scrollTo(0, 0);
}
