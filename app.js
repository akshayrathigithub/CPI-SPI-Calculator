let trash = document;
let count = 0;
let Student, Department, SelectorBtn, Clone, Type_Of, fake_No, YearArray, SPI_Sem;
let ArrayNEW = [];
let TotalCreditsPoint = 0,
  TotalCredits = 0;
let expectedCredits;
let expectedCPI;
trash.getElementById("dropdownMenuLink").style.opacity = 0.5;
trash.getElementById("dropdownMenuLink").disabled = true;
trash.getElementById("dropdownYearMenu").style.opacity = 0.5;
trash.getElementById("dropdownYearMenu").disabled = true;
Load();
Click();

function Load() {
  let DepartmentNames = [
    "FirstSemCard",
    "SecondSemCard",
    "AE",
    "CHM",
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
    "SummerSem-1",
    "SummerSem-2",
    "SummerSem-3",
    "SummerSem-4",
    "BOX",
    "btn_cal",
    "Semester_MTech/MSc"
  ];
  DepartmentNames.forEach(function (element) {
    trash.getElementById(`${element}`).style.display = "none";
  });
}

function Click() {
  trash
    .getElementById("dropdownTypeList")
    .addEventListener("click", OnTypeClick);
  trash
    .getElementById("dropdownYearList")
    .addEventListener("click", OnYearClick);
  trash.getElementById("dropdownList").addEventListener("click", OnDeptClick);
  SelectorLoad();
  trash.getElementById("btn_CPI").addEventListener("click", OnCpiCal);
  trash
    .getElementById("estimate_CPI_Btn")
    .addEventListener("click", OnEstimate);
  trash
    .getElementById("calculateagain_btn")
    .addEventListener("click", OnCalulateAgain);
}

function OnYearClick(e) {
  Student = e.target.id;
  document.getElementById("dropdownYearMenu").textContent = `${
    e.target.textContent
    }`;
  if (e.target.textContent === "MTech/MSc") {
    trash.getElementById("Semester_MTech/MSc").style.display = "initial";
    trash.getElementById("btn_cal").style.display = "initial";
    Department = "MTech/MSc";
    trash.getElementById("dropdownMenuLink").disabled = true;
    trash.getElementById("dropdownMenuLink").style.opacity = 0.5;
    let AddBtn = document.createElement("tr");
    AddBtn.id = "courseaddBtn_0";
    AddBtn.innerHTML = `<td ><div class="container" id='courseaddDiv-0'><button class="btn btn-outline-success">Add Course</button></div></td><td></td><td></td>`;
    trash
      .getElementById("Semester_MTech/MSc")
      .getElementsByTagName("tbody")[0]
      .appendChild(AddBtn);
    SelectorBtn = trash.getElementsByClassName("btn btn-outline-success");
    for (i = 0; i < SelectorBtn.length; i++) {
      SelectorBtn[i].addEventListener("click", AddCourseBtn);
    }
    SelectorLoad();
  } else {
    trash.getElementById("dropdownTypeLink").disabled = true;
    trash.getElementById("dropdownTypeLink").style.opacity = 0.5;
    trash.getElementById("dropdownYearMenu").disabled = true;
    trash.getElementById("dropdownYearMenu").style.opacity = 0.5;
    trash.getElementById("dropdownMenuLink").disabled = false;
    trash.getElementById("dropdownMenuLink").style.opacity = 1;
  }
  e.preventDefault();
}
function OnTypeClick(e) {
  Type_Of = e.target.textContent;
  if (Type_Of === "SPI") {
    trash.getElementById("dropdownYearMenu").textContent = "Semester";
    trash.getElementById("btn_CPI").textContent = "Calculate SPI";
    trash.getElementById("estimate_CPI_Btn").style.display = "none";
  }
  else {
    trash.getElementById("dropdownYearMenu").textContent = "Semester Completed";
  }
  trash.getElementById("dropdownTypeLink").textContent = `${
    e.target.textContent
    }`;
  trash.getElementById("dropdownMenuLink").disabled = true;
  trash.getElementById("dropdownMenuLink").style.opacity = 0.5;
  trash.getElementById("dropdownYearMenu").disabled = false;
  trash.getElementById("dropdownYearMenu").style.opacity = 1;
}

function OnDeptClick(e) {
  Department = e.target;
  trash.getElementById("dropdownMenuLink").disabled = true;
  trash.getElementById("dropdownMenuLink").style.opacity = 0.5;
  trash.getElementById("btn_cal").style.display = "initial";
  trash.getElementById("FirstSemCard").id = `FirstSem_${e.target.textContent}`;
  trash.getElementById("SecondSemCard").id = `SecondSem_${
    e.target.textContent
    }`;
  trash.getElementById("SummerSem-1").id = `SummerOne_${e.target.textContent}`;
  trash.getElementById("SummerSem-2").id = `SummerTwo_${e.target.textContent}`;
  trash.getElementById("SummerSem-3").id = `SummerThree_${
    e.target.textContent
    }`;
  trash.getElementById("SummerSem-4").id = `SummerFour_${e.target.textContent}`;

  trash.getElementById("dropdownMenuLink").textContent = `${
    e.target.textContent
    }`;

  if (Department.id % 2 === 0) {
    trash.getElementById("Lif101_sec").style.display = "none";
  }

  if (Department.id % 2 === 1) {
    trash.getElementById("phy101").textContent = "Chm101a";
    trash.getElementById("phy102").textContent = "Phy103a";
    trash.getElementById("lif101").textContent = "Esc101a";
    trash.getElementById("lif101credit").textContent = "14";
    trash.getElementById("ta101tr").style.display = "none";

    trash.getElementById("chm101").textContent = "Phy101a";
    trash.getElementById("phy103").textContent = "Phy102a";
    trash.getElementById("esc101").textContent = "Ta101a";
    trash.getElementById("esc101credit").textContent = "9";
  }

  switch (e.target.textContent) {
    case `${e.target.textContent}`: {
      switch (Student) {
        case "eight": {
          trash.getElementById(`${e.target.textContent}`).style.display =
            "initial";
          trash.getElementById(
            `FirstSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SecondSem_${e.target.textContent}`
          ).style.display = "initial";
          break;
        }

        case "seven": {
          trash.getElementById(`${e.target.textContent}`).style.display =
            "initial";
          trash.getElementById(
            `EightSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SeventhSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SixthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FifthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FourthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `ThirdSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FirstSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SecondSem_${e.target.textContent}`
          ).style.display = "initial";
          break;
        }
        case "six": {
          trash.getElementById(`${e.target.textContent}`).style.display =
            "initial";
          trash.getElementById(
            `EightSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SeventhSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SixthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FifthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FourthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `ThirdSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FirstSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SecondSem_${e.target.textContent}`
          ).style.display = "initial";
          break;
        }
        case "five": {
          trash.getElementById(`${e.target.textContent}`).style.display =
            "initial";
          trash.getElementById(
            `EightSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SeventhSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SixthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FifthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FourthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `ThirdSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FirstSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SecondSem_${e.target.textContent}`
          ).style.display = "initial";
          break;
        }
        case "four": {
          trash.getElementById(`${e.target.textContent}`).style.display =
            "initial";
          trash.getElementById(
            `EightSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SeventhSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SixthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FifthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FourthSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `ThirdSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FirstSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SecondSem_${e.target.textContent}`
          ).style.display = "initial";
          break;
        }
        case "third": {
          trash.getElementById(`${e.target.textContent}`).style.display =
            "initial";
          trash.getElementById(
            `EightSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SeventhSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SixthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FifthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FourthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `ThirdSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `FirstSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SecondSem_${e.target.textContent}`
          ).style.display = "initial";
          break;
        }
        case "two": {
          trash.getElementById(`${e.target.textContent}`).style.display =
            "initial";
          trash.getElementById(
            `EightSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SeventhSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SixthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FifthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FourthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `ThirdSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FirstSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SecondSem_${e.target.textContent}`
          ).style.display = "initial";
          break;
        }
        case "one": {
          trash.getElementById(`${e.target.textContent}`).style.display =
            "initial";
          trash.getElementById(
            `EightSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SeventhSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `SixthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FifthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FourthSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `ThirdSem_${e.target.textContent}`
          ).style.display = "none";
          trash.getElementById(
            `FirstSem_${e.target.textContent}`
          ).style.display = "initial";
          trash.getElementById(
            `SecondSem_${e.target.textContent}`
          ).style.display = "none";
          break;
        }
      }
    }
  }

  trash
    .getElementById(`${e.target.textContent}`)
    .appendChild(trash.getElementById(`SummerOne_${e.target.textContent}`));
  trash
    .getElementById(`${e.target.textContent}`)
    .appendChild(trash.getElementById(`SummerTwo_${e.target.textContent}`));
  trash
    .getElementById(`${e.target.textContent}`)
    .appendChild(trash.getElementById(`SummerThree_${e.target.textContent}`));
  trash
    .getElementById(`${e.target.textContent}`)
    .appendChild(trash.getElementById(`SummerFour_${e.target.textContent}`));
  switch (Student) {
    case "one": {
      trash.getElementById(`SummerOne_${e.target.textContent}`).style.display =
        "none";
      trash.getElementById(`SummerTwo_${e.target.textContent}`).style.display =
        "none";
      trash.getElementById(
        `SummerThree_${e.target.textContent}`
      ).style.display = "none";
      trash.getElementById(`SummerFour_${e.target.textContent}`).style.display =
        "none";
      break;
    }
    case "two":
    case "third": {
      trash
        .getElementById(`SummerOne_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerOne_${e.target.textContent}`),
          trash.getElementById(`ThirdSem_${e.target.textContent}`)
        );
      trash.getElementById(`SummerOne_${e.target.textContent}`).style.display =
        "initial";
      trash.getElementById(`SummerTwo_${e.target.textContent}`).style.display =
        "none";
      trash.getElementById(
        `SummerThree_${e.target.textContent}`
      ).style.display = "none";
      trash.getElementById(`SummerFour_${e.target.textContent}`).style.display =
        "none";
      break;
    }
    case "four":
    case "five": {
      trash
        .getElementById(`SummerOne_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerOne_${e.target.textContent}`),
          trash.getElementById(`ThirdSem_${e.target.textContent}`)
        );
      trash
        .getElementById(`SummerTwo_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerTwo_${e.target.textContent}`),
          trash.getElementById(`FifthSem_${e.target.textContent}`)
        );
      trash.getElementById(`SummerOne_${e.target.textContent}`).style.display =
        "initial";
      trash.getElementById(`SummerTwo_${e.target.textContent}`).style.display =
        "initial";
      trash.getElementById(
        `SummerThree_${e.target.textContent}`
      ).style.display = "none";
      trash.getElementById(`SummerFour_${e.target.textContent}`).style.display =
        "none";
      break;
    }
    case "six":
    case "seven": {
      trash
        .getElementById(`SummerOne_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerOne_${e.target.textContent}`),
          trash.getElementById(`ThirdSem_${e.target.textContent}`)
        );
      trash
        .getElementById(`SummerTwo_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerTwo_${e.target.textContent}`),
          trash.getElementById(`FifthSem_${e.target.textContent}`)
        );
      trash
        .getElementById(`SummerThree_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerThree_${e.target.textContent}`),
          trash.getElementById(`SeventhSem_${e.target.textContent}`)
        );
      trash.getElementById(`SummerOne_${e.target.textContent}`).style.display =
        "initial";
      trash.getElementById(`SummerTwo_${e.target.textContent}`).style.display =
        "initial";
      trash.getElementById(
        `SummerThree_${e.target.textContent}`
      ).style.display = "initial";
      trash.getElementById(`SummerFour_${e.target.textContent}`).style.display =
        "none";
      break;
    }
    case "eight": {
      trash
        .getElementById(`SummerOne_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerOne_${e.target.textContent}`),
          trash.getElementById(`ThirdSem_${e.target.textContent}`)
        );
      trash
        .getElementById(`SummerTwo_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerTwo_${e.target.textContent}`),
          trash.getElementById(`FifthSem_${e.target.textContent}`)
        );
      trash
        .getElementById(`SummerThree_${e.target.textContent}`)
        .parentNode.insertBefore(
          trash.getElementById(`SummerThree_${e.target.textContent}`),
          trash.getElementById(`SeventhSem_${e.target.textContent}`)
        );
      trash.getElementById(`SummerOne_${e.target.textContent}`).style.display =
        "initial";
      trash.getElementById(`SummerTwo_${e.target.textContent}`).style.display =
        "initial";
      trash.getElementById(
        `SummerThree_${e.target.textContent}`
      ).style.display = "initial";
      trash.getElementById(`SummerFour_${e.target.textContent}`).style.display =
        "initial";
      break;
    }
  }
  switch (Student) {
    case "eight": {
      let AddBtn = document.createElement("tr");
      AddBtn.id = "courseaddBtn_8";
      AddBtn.innerHTML = `<td><div class="container" id='courseaddDiv-8'><button class="btn btn-outline-success" id="courseaddBtn">Add Course</button></div></td><td></td><td></td>`;
      trash
        .getElementById(`EightSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddBtn);
    }
    case "seven": {
      let AddBtn = document.createElement("tr");
      AddBtn.id = "courseaddBtn_7";
      AddBtn.innerHTML = `<td ><div class="container" id='courseaddDiv-7'><button class="btn btn-outline-success" id="courseaddBtn">Add Course</button></div></td><td></td><td></td>`;
      trash
        .getElementById(`SeventhSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddBtn);
    }
    case "six": {
      let AddBtn = document.createElement("tr");
      AddBtn.id = "courseaddBtn_6";
      AddBtn.innerHTML = `<td ><div class="container" id='courseaddDiv-6'><button class="btn btn-outline-success" id="courseaddBtn">Add Course</button></div></td><td></td><td></td>`;
      trash
        .getElementById(`SixthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddBtn);
    }
    case "five": {
      let AddBtn = document.createElement("tr");
      AddBtn.id = "courseaddBtn_5";
      AddBtn.innerHTML = `<td ><div class="container" id='courseaddDiv-5'><button class="btn btn-outline-success" id="courseaddBtn">Add Course</button></div></td><td></td><td></td>`;
      trash
        .getElementById(`FifthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddBtn);
    }
    case "four": {
      let AddBtn = document.createElement("tr");
      AddBtn.id = "courseaddBtn_4";
      AddBtn.innerHTML = `<td ><div class="container" id='courseaddDiv-4'><button class="btn btn-outline-success" id="courseaddBtn">Add Course</button></div></td><td></td><td></td>`;
      trash
        .getElementById(`FourthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddBtn);
    }
    case "third": {
      let AddBtn = document.createElement("tr");
      AddBtn.id = "courseaddBtn_3";
      AddBtn.innerHTML = `<td ><div class="container" id='courseaddDiv-3'><button class="btn btn-outline-success">Add Course</button></div></td><td></td><td></td>`;
      trash
        .getElementById(`ThirdSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddBtn);
      break;
    }
  }
  SelectorBtn = trash.getElementsByClassName("btn btn-outline-success");
  for (i = 0; i < SelectorBtn.length; i++) {
    SelectorBtn[i].addEventListener("click", AddCourseBtn);
  }
  if (Type_Of === "SPI" && Student != "MTech/MSc") {
    YearArray = [
      "FirstSem",
      "SecondSem",
      "ThirdSem",
      "FourthSem",
      "FifthSem",
      "SixthSem",
      "SeventhSem",
      "EightSem",
      "SummerOne",
      "SummerTwo",
      "SummerThree",
      "SummerFour",
    ];
    switch (Student) {
      case "one":
        fake_No = 0;
        break;
      case "two":
        fake_No = 1;
        break;
      case "third":
        fake_No = 2;
        break;
      case "four":
        fake_No = 3;
        break;
      case "five":
        fake_No = 4;
        break;
      case "six":
        fake_No = 5;
        break;
      case "seven":
        fake_No = 6;
        break;
      case "eight":
        fake_No = 7;
        break;
    }
    for (i = 0; i < 11; i++) {
      if (i === fake_No) {
        SPI_Sem = YearArray[i];
        YearArray.splice(i, 1);
      }
    }
    YearArray.forEach(element => {
      trash.getElementById(`${element}_${e.target.textContent}`).style.display = 'none';
    });
  }
}

function SelectorLoad() {
  let Selector = trash.getElementsByClassName("dropdown-menu");
  for (i = 2; i < Selector.length; i++) {
    Selector[i].addEventListener("click", OnTableClick);
  }
}

function AddCourseBtn(e) {
  let AddCourse = trash.createElement("tr");
  AddCourse.innerHTML = `<td><input class="form-control-plaintext text-center" placeholder="Extra Course" type="text"></td>
    <td><input class="form-control-plaintext text-center" placeholder="10*" type="number"></td>
    <td><span><div class="dropdown">
                                <a class="btn btn-success dropdown-toggle" href="#" role="button" id="Extra_Course_${count}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                <div class="dropdown-menu" aria-labelledby="Extra_Course_${count}">
                                    <a class="dropdown-item" href="#">A/A*</a>
                                    <a class="dropdown-item" href="#">B</a>
                                    <a class="dropdown-item" href="#">C</a>
                                    <a class="dropdown-item" href="#">D</a>
                                    <a class="dropdown-item" href="#">E</a>
                                    <a class="dropdown-item" href="#">F</a>
                                    <a class="dropdown-item" href="#">Drop</a>
                                </div>
                </div>
        </span>
    </td>`;
  count = count + 1;
  switch (e.target.parentElement.id) {
    case "courseaddDiv-3": {
      trash
        .getElementById(`ThirdSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddCourse);
      trash
        .getElementById(`ThirdSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(
          trash.getElementById(
            e.target.parentElement.parentElement.parentElement.id
          )
        );
      break;
    }
    case "courseaddDiv-4": {
      trash
        .getElementById(`FourthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddCourse);
      trash
        .getElementById(`FourthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(
          trash.getElementById(
            e.target.parentElement.parentElement.parentElement.id
          )
        );
      break;
    }
    case "courseaddDiv-5": {
      trash
        .getElementById(`FifthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddCourse);
      trash
        .getElementById(`FifthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(
          trash.getElementById(
            e.target.parentElement.parentElement.parentElement.id
          )
        );
      break;
    }
    case "courseaddDiv-6": {
      trash
        .getElementById(`SixthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddCourse);
      trash
        .getElementById(`SixthSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(
          trash.getElementById(
            e.target.parentElement.parentElement.parentElement.id
          )
        );
      break;
    }
    case "courseaddDiv-7": {
      trash
        .getElementById(`SeventhSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddCourse);
      trash
        .getElementById(`SeventhSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(
          trash.getElementById(
            e.target.parentElement.parentElement.parentElement.id
          )
        );
      break;
    }
    case "courseaddDiv-8": {
      trash
        .getElementById(`EightSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(AddCourse);
      trash
        .getElementById(`EightSem_${Department.textContent}`)
        .getElementsByTagName("tbody")[0]
        .appendChild(
          trash.getElementById(
            e.target.parentElement.parentElement.parentElement.id
          )
        );
      break;
    }
    case "courseaddDiv-0": {
      trash
        .getElementById("Semester_MTech/MSc")
        .getElementsByTagName("tbody")[0]
        .appendChild(AddCourse);
      trash
        .getElementById("Semester_MTech/MSc")
        .getElementsByTagName("tbody")[0]
        .appendChild(
          trash.getElementById(
            e.target.parentElement.parentElement.parentElement.id
          )
        );
      break;
    }
  }
  SelectorLoad();
}

function OnTableClick(e) {
  document.getElementById(
    `${e.target.parentElement.parentElement.children[0].id}`
  ).textContent = `${e.target.textContent}`;
  e.preventDefault();
}

function OnCpiCal() {
  Calculation();
  let Final_CPI = (TotalCreditsPoint / TotalCredits).toFixed(2);
  trash.getElementById("modalMess").style.display = "none";
  trash.getElementById("modalCPI").style.display = "none";
  trash.getElementById("CPI_extended").style.display = "none";
  if (TotalCredits === 0 || TotalCreditsPoint === 0) {
    $('#modalCPI').modal('show');
  } else {
    if (Type_Of === "SPI")
      trash.getElementById('CPI_Message').textContent = `Your SPI is ${Final_CPI}`;
    else
      trash.getElementById('CPI_Message').textContent = `Your CPI is ${Final_CPI}`;
    trash.getElementById('BOX').style.display = 'initial';
  }
}

function OnEstimate() {
  trash.getElementById("CPI_extended").style.display = "initial";
  trash.getElementById("box_result").style.display = "none";
  trash.getElementById("current_cpi").textContent = `Your current CPI is ${(
    TotalCreditsPoint / TotalCredits
  ).toFixed(2)}`;
  trash.getElementById("btn_CPI").style.opacity = 0.5;
  trash.getElementById("btn_CPI").disabled = true;
  trash.getElementById(
    "credits_done"
  ).textContent = `Total Credits done are ${TotalCredits}`;
  trash
    .getElementById("Estimate_btn")
    .addEventListener("click", OnEstimatedCPI);

  function OnEstimatedCPI() {
    expectedCredits = Number(trash.getElementById("Expected_Credits").value);
    expectedCPI = Number(trash.getElementById("Expected_CPI").value);
    let finalExpectedCPI = (
      (expectedCPI * expectedCredits - TotalCreditsPoint) /
      (expectedCredits - TotalCredits)
    ).toFixed(2);
    if (expectedCPI === 0 || expectedCredits === 0) {
      $("#modalMess").modal("show");
    } else {
      if (finalExpectedCPI <= 10) {
        trash.getElementById(
          "box_result"
        ).textContent = `Score ${finalExpectedCPI} SPI in each coming Semester`;
        trash.getElementById("box_result").style.display = "initial";
      } else {
        trash.getElementById(
          "modalAlertMess"
        ).textContent = `Your Estimated CPI (${finalExpectedCPI}) is greater than 10, which is not possible`;
        $("#modalAlert").modal("show");
      }
    }
  }
}

function Calculation() {
  TotalCredits = 0;
  TotalCreditsPoint = 0;

  if (Type_Of === "CPI") {
    let ArrayYear = [
      "FirstSem",
      "SecondSem",
      "SummerOne",
      "ThirdSem",
      "FourthSem",
      "SummerTwo",
      "FifthSem",
      "SixthSem",
      "SummerThree",
      "SeventhSem",
      "EightSem",
      "SummerFour",
      "Semester"
    ];
    switch (Student) {
      case "eight":
        ArrayYear.splice(12, 1);
        break;
      case "seven":
        ArrayYear.splice(10, 3);
        break;
      case "six":
        ArrayYear.splice(9, 4);
        break;
      case "five":
        ArrayYear.splice(7, 6);
        break;
      case "four":
        ArrayYear.splice(6, 7);
        break;
      case "third":
        ArrayYear.splice(4, 9);
        break;
      case "two":
        ArrayYear.splice(3, 10);
        break;
      case "one":
        ArrayYear.splice(1, 12);
        break;
      case "MTech/MSc":
        ArrayYear.splice(0, 12);
        break;
    }
    ArrayNEW = ArrayYear;
  }
  else if (Type_Of === "SPI" && Student != "MTech/MSc") {
    ArrayNEW = [SPI_Sem];
  }
  else if (Type_Of === "SPI" && Student === "MTech/MSc") {
    ArrayNEW.push("Semester");
  }

  ArrayNEW.forEach(function (element, index) {
    let dust;
    if (element === "Semester") {
      dust = trash.getElementById(`${element}_${Department}`);
    } else {
      dust = trash.getElementById(`${element}_${Department.textContent}`);
    }

    let DustSpan = dust.getElementsByTagName("span");
    for (i = 0; i < DustSpan.length; i++) {
      let SubjectCredit;
      let SubjectGrade = DustSpan[i].children[0].children[0].textContent;
      if (
        DustSpan[i].parentElement.parentElement.children[1].firstChild
          .tagName === "INPUT" &&
        Number(
          DustSpan[i].parentElement.parentElement.children[1].firstChild.value
        ) >= 0
      ) {
        SubjectCredit = Number(
          DustSpan[i].parentElement.parentElement.children[1].firstChild.value
        );
      } else {
        SubjectCredit = Number(
          DustSpan[i].parentElement.parentElement.children[1].textContent
        );
      }
      switch (SubjectGrade) {
        case "A/A*": {
          TotalCreditsPoint = TotalCreditsPoint + 10 * SubjectCredit;
          TotalCredits = TotalCredits + SubjectCredit;
          break;
        }
        case "B": {
          TotalCreditsPoint = TotalCreditsPoint + 8 * SubjectCredit;
          TotalCredits = TotalCredits + SubjectCredit;
          break;
        }
        case "C": {
          TotalCreditsPoint = TotalCreditsPoint + 6 * SubjectCredit;
          TotalCredits = TotalCredits + SubjectCredit;
          break;
        }
        case "D": {
          TotalCreditsPoint = TotalCreditsPoint + 4 * SubjectCredit;
          TotalCredits = TotalCredits + SubjectCredit;
          break;
        }
        case "E": {
          TotalCreditsPoint = TotalCreditsPoint + 2 * SubjectCredit;
          TotalCredits = TotalCredits + SubjectCredit;
          break;
        }
        case "F": {
          TotalCreditsPoint = TotalCreditsPoint + 0 * SubjectCredit;
          TotalCredits = TotalCredits + SubjectCredit;
          break;
        }
        case "Drop": {
          break;
        }
      }
    }
  });
}

function OnCalulateAgain() {
  window.location.reload();
  window.scrollTo(0, 0);
}
