import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import logo from "../../../assets/pdflogo.png";
import "jspdf-autotable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DisplayHealth() {
  const [report, setReport] = useState({});
  const [Index, setIndex] = useState("");
  const [loading, setLoading] = useState(true);
  const [vaccinations, setvaccinations] = useState([]);
  const param = useParams();
  const { id } = useParams();

  useEffect(() => {
    const pid = param.id;

    async function getProfile() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/health/getreport/${pid}`
        );
        setReport(res.data.petReport);
        setvaccinations(res.data.petReport.vaccinations);
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    }

    getProfile();
  }, [param.id]);

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "px", "a4", false);
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const title = "Vaccination Report";

    // Set document font and color
    doc.setFont("helvetica");
    doc.setTextColor("#000000");

    // Add title and date
    doc.setFontSize(24);
    doc.text(title, 20, 30);
    doc.setFontSize(12);
    doc.setTextColor("#999999");
    doc.text(`Generated on ${date}`, 20, 40);

    doc.setFontSize(16);
    doc.setTextColor("#121212");
    doc.text(40, 140, "Pet ID :  ");
    doc.text(90, 140, id);

    doc.addImage(logo, "JPG", 20, 60, 40, 40);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#000000");
    doc.text("Happy Tails", 70, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text("Tel: +94 11 234 5678", 70, 80);
    doc.text("Email: info@happytails.com", 70, 90);
    doc.text("Address: No 221/B, Peradeniya Road, Kandy", 70, 100);

    doc.autoTable({
      startY: 150,
      head: [["Vac Name", "Date Given", "Expiration Date"]],
      body: vaccinations.map((vaccination) => [
        vaccination.name,
        vaccination.dateGiven.toString(),
        vaccination.expirationDate.toString(),
      ]),

      theme: "striped",
    });

    doc.save("VacReport.pdf");
  };

  const onDelete = (index) => {
    toast.warn(
      <div>
        <p class="text-red-700 ml-8">Do you want to delete ?</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{ marginRight: "1rem" }}
            onClick={() => {
              axios
                .delete(
                  `http://localhost:8080/api/health/deletevac/${index}/${id}`
                )
                .then((res) => {})
                .catch((err) => {
                  toast.warning(err);
                });
              toast.success("Item deleted successfully", {
                autoClose: 1000,
              });
              setTimeout(() => {
                window.location.href = `/petprofile/displayhealth/${id}`;
              }, 1500);
            }}
          >
            Yes
          </button>
          <button onClick={() => toast.dismiss()}>No</button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const onDeleteprofile = (id) => {
    toast.warn(
      <div>
        <p class="text-red-700 ml-8">Do you want to delete ?</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{ marginRight: "1rem" }}
            onClick={() => {
              axios
                .delete(`http://localhost:8080/api/health/deletereport/${id}`)
                .then((res) => {})
                .catch((err) => {
                  toast.warning(err);
                });
              toast.success("Item deleted successfully", {
                autoClose: 1000,
              });
              setTimeout(() => {
                window.location.href = `/petprofile/healthprofile`;
              }, 1500);
            }}
          >
            Yes
          </button>
          <button onClick={() => toast.dismiss()}>No</button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  return (
    <>
      <div class="bg-slate-400 ml-96 mt-36 mb-20 mr-36 w-auto rounded-2xl">
        <div class="pt-10">
          <h1 class="text-2xl font-bold text-[#131342] text-center">
            Vaccination Report
          </h1>
        </div>
        <div class="ml-[600px] -mt-7">
          <Link
            to={`/petprofile/addvac/${id}/${report.currentHealthStatus}/${report.description}`}
            className=" bg-[#2E4960] hover:bg-[#084469] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[14px] block w-[150px] text-center mb-7 mx-auto"
          >
            {" "}
            Edit Report
          </Link>
        </div>
        <div class="flex gap-4 ml-20 mt-5">
          <h1 class="text-lg font-bold">Pet ID : </h1>
          <h1 class="text-lg">{report.petId}</h1>
        </div>

        <div class="flex gap-4 ml-20 mt-2">
          <h1 class="text-lg font-bold">Pet Status : </h1>
          <h1 class="text-lg">
            <span
              class={`text-white text-sm w-1/3 pb-1 font-semibold px-2 rounded-full ${
                report.currentHealthStatus === "Critical"
                  ? "bg-red-600"
                  : "bg-green-600"
              }`}
            >
              {report.currentHealthStatus === "Critical"
                ? "Critical"
                : "Normal"}
            </span>
          </h1>
        </div>

        <div class="flex gap-4 ml-20 mt-2">
          <h1 class="text-lg font-bold">Description : </h1>
          <p class="text-lg">{report.description}</p>
        </div>

        {loading ? (
          <button
            disabled
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        ) : (
          <div class="flex pt-[30px] pb-16">
            <div class=" w-full ml-20 mr-20 bg-slate-100 border rounded-lg overflow-hidden dark:border-gray-700">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr class="bg-blue-400">
                    <th
                      scope="col"
                      class="px-2 py-3 text-center text-xs font-medium text-black uppercase"
                    >
                      Vaccine Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-black uppercase"
                    >
                      Inject Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-black uppercase"
                    >
                      Expire Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-black uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {report.vaccinations.map((vaccine, index) => (
                    <tr
                      key={index}
                      class={`${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-blue-100 dark:bg-blue-100"
                      }`}
                    >
                      <td class="px-1 py-2 text-center whitespace-nowrap text-sm font-medium text-black">
                        {vaccine.name}
                      </td>
                      <td class="px-1 py-2 text-center whitespace-nowrap text-sm text-gray-800">
                        {vaccine.dateGiven}
                      </td>
                      <td class="px-1 py-2 text-center whitespace-nowrap text-sm text-gray-800">
                        {vaccine.expirationDate}
                      </td>
                      <td class="py-3 px-6  text-center">
                        <div class="flex item-center justify-center">
                          <Link
                            to={`/petprofile/upvac/${id}/${index}/${report.currentHealthStatus}`}
                          >
                            <div class="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                          </Link>

                          <button onClick={() => onDelete(index)}>
                            <div class="w-4 mr-2 transform hover:text-red-600 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <button
          onClick={generatePDF}
          className="bg-[#30475c]  hover:bg-[#084469] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[14px] block w-[150px] text-center mx-auto"
        >
          Download pdf
        </button>

        <button
          onClick={() => onDeleteprofile(report.petId)}
          className="bg-red-700 mt-3  hover:bg-red-600 px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[14px] block w-[150px] text-center mx-auto"
        >
          Delete Report
        </button>

        <br></br>
      </div>
    </>
  );
}
