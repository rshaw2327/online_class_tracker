function getAttendanceHistory(fromAttendance, toAttendance) {
  fetch(
    `https://onlineclasstracker-production.up.railway.app/api/v1/attendance/getAttendanceSheet?startDate=${fromAttendance}&endDate=${toAttendance}`
  )
    .then((res) => res.json())
    .then((data) => showAttendanceData(data.attendance));
}

const attendanceForm = document.getElementById("attendance-form");
const paymentForm = document.getElementById("payment-form");
const selectTeacher = document.getElementById("select-teacher");
const teachers = document.getElementById("teachers");
const fromAttendance = document.getElementById("attendanceFrom");
const toAttendance = document.getElementById("attendanceTo");
const AttendancBtn = document.getElementById("attendanceBtn");
const fromPayment = document.getElementById("fromPayment");
const toPayment = document.getElementById("toPayment");
const paymentBtn = document.getElementById("paymentBtn");

function showAttendanceData(data) {
  let attendanceTable = document.getElementById("attendanceTable");
  data.map((item, index) => {
    let localDate = new Date(item.dateAndTime);
    let singleAttendance = document.createElement("tr");
    singleAttendance.innerHTML = `<td>${localDate}</td>
            <td>${item.instructorName}</td>
            <td>${item.totalHoursStudied} hr</td>`;
    attendanceTable.append(singleAttendance);
  });
}

function getPaymentHistory() {
  fetch(
    "https://onlineclasstracker-production.up.railway.app/api/v1/payment/getAllPayments"
  )
    .then((res) => res.json())
    .then((data1) => showPaymentHistory(data1.payment));
}

function showPaymentHistory(data1) {
  let paymentTable = document.getElementById("paymentTable");
  data1.map((item, index) => {
    let localTime = new Date(item.paymentDate)
    let singlepayment = document.createElement("tr");
    singlepayment.innerHTML = ` 
              <td>${localTime}</td>
              <td>${item.payee}</td>
              <td>${item.amountPaid}</td>
            `;
    paymentTable.append(singlepayment);
  });
}

attendanceForm.addEventListener("submit", function (event) {
  event.preventDefault();
  getAttendanceData(event);
});
// document.querySelector("form").addEventListener("submit", function (event) {
// event.preventDefault(); // Prevent form reload
async function getAttendanceData(event) {
  // Get which button was clicked using submitter
  const teacherId = event.submitter.value; // "akh", "gau", or "sid"
  const dailyAttendanceInput = document.getElementById(`datetime-${teacherId}`);
  console.log(dailyAttendanceInput);
   const dailyAttendanceDate = new Date(dailyAttendanceInput.value);

  //  let attendanceData= {
  //   "dateAndTime":dailyAttendanceDate,
  //   "totalHoursStudied":hoursValue
  //     "instructorName":
  //     "remainingClasses":
  //  }

  // Get the input hours for that teacher

  const hoursInput = document.getElementById(`hours-${teacherId}`);
  if (hoursInput) {
    const hoursValue = Number(hoursInput.value);
    const remainingSpan = document.getElementById(`remaining-${teacherId}`);
    const currentRemaining = Number(remainingSpan.innerText);

   

    await fetch(
      "https://onlineclasstracker-production.up.railway.app/api/v1/attendance/createAttendanceSheet",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json", // or other type like 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          dateAndTime: dailyAttendanceDate,
          totalHoursStudied: hoursValue,
          instructorName: selectTeacher.value,
          remainingClasses: 10 - hoursValue,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        window.location.reload();
      })
      .catch((err) => console.log(err));

    const updatedRemaining = Math.max(currentRemaining - hoursValue, 0);
    remainingSpan.innerText = updatedRemaining;

    hoursInput.value = "";
  } else {
    // Optional: handle Payment submission or just do nothing
    console.log(`No hours input for teacher: ${teacherId}`);
  }
}

paymentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  postPaymentData(event);
});

function postPaymentData(event) {
  const teacherId = event.submitter.value;
  const amountPaid = document.getElementById(`amount-${teacherId}`);
  const paymentDate = document.getElementById(`payment-${teacherId}`);

  let amountValue = amountPaid.value;
  let date = paymentDate.value;

  console.log(teachers.value, amountValue, date);

  fetch(
    "https://onlineclasstracker-production.up.railway.app/api/v1/payment/createPayment",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentDate: paymentDate.value,
        amountPaid: amountValue,
        payee: teachers.value,
      }),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      alert(res.message);
      window.location.reload();
    })

    .catch((err) => console.log(err));
}

AttendancBtn.addEventListener("click", () => {
  console.log(fromAttendance.value, toAttendance.value);
  getAttendanceHistory(fromAttendance.value, toAttendance.value);
});

paymentBtn.addEventListener("click", () => {
  getPaymentHistory(fromPayment.value, toPayment.value);
});
