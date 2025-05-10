document.addEventListener("DOMContentLoaded", () => {
  const bansForm = document.getElementById("bans-form");
  const mutesForm = document.getElementById("mutes-form");
  const kicksForm = document.getElementById("kicks-form");
  const warnsForm = document.getElementById("warns-form");
  const searchForm = document.getElementById("search-form");
  const summaryContainer = document.getElementById("summary");
  const resultContainer = document.getElementById("result");

  let allPunishments = [];
  let filteredPunishments = [];

  // Upload handlers
  bansForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFileUpload(document.getElementById("bans-file"), "Bans");
  });

  mutesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFileUpload(document.getElementById("mutes-file"), "Mutes");
  });

  kicksForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFileUpload(document.getElementById("kicks-file"), "Kicks");
  });

  warnsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFileUpload(document.getElementById("warns-file"), "Warns");
  });

  function handleFileUpload(fileInput, type) {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target.result;
        const cleanedData = cleanCSV(csvContent, type);
        allPunishments = allPunishments.concat(cleanedData);
        filteredPunishments = [...allPunishments];
        updateSummary(filteredPunishments);
        displayResults(filteredPunishments);
      };
      reader.readAsText(file);
    } else {
      alert(`Please upload a ${type} CSV file.`);
    }
  }

  function cleanCSV(csvContent, type) {
    const rows = csvContent.split("\n");
    const cleanedData = [];

    for (const row of rows) {
      const cells = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const trimmedRow = cells.map((cell) => cell.trim().replace(/"/g, ""));
      if (trimmedRow.length >= 4) {
        while (trimmedRow.length < 5) {
          trimmedRow.push("");
        }
        trimmedRow.push(type);
        cleanedData.push(trimmedRow);
      }
    }
    return cleanedData;
  }

  function updateSummary(data) {
    const staffPunishments = {};
    data.forEach((row) => {
      const staff = row[1] || "Unknown";
      if (!staffPunishments[staff]) staffPunishments[staff] = 0;
      staffPunishments[staff]++;
    });

    summaryContainer.innerHTML = "";
    const table = document.createElement("table");
    table.classList.add("summary-table");

    const headerRow = document.createElement("tr");
    ["Staff", "Total Punishments"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    Object.entries(staffPunishments).forEach(([staff, count]) => {
      const row = document.createElement("tr");
      const staffCell = document.createElement("td");
      staffCell.textContent = staff;
      const countCell = document.createElement("td");
      countCell.textContent = count;
      row.appendChild(staffCell);
      row.appendChild(countCell);
      table.appendChild(row);
    });

    summaryContainer.appendChild(table);
  }

  function displayResults(data) {
    resultContainer.innerHTML = "";

    if (data.length === 0) {
      resultContainer.textContent = "No results found.";
      return;
    }

    const table = document.createElement("table");
    table.classList.add("punishment-table");

    const headerRow = document.createElement("tr");
    ["Player", "Staff", "Reason", "Punishment Date & Time", "Unban Date & Time", "Type"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.forEach((row) => {
      const tableRow = document.createElement("tr");
      const displayRow = [...row];
      while (displayRow.length < 6) {
        displayRow.push("");
      }
      displayRow.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell || "N/A";
        tableRow.appendChild(td);
      });
      table.appendChild(tableRow);
    });

    resultContainer.appendChild(table);
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const staffName = document.getElementById("search-staff")?.value.trim().toLowerCase() || "";
    const searchMonthInput = document.getElementById("search-month");
    const searchMonth = searchMonthInput.value ? searchMonthInput.value.substring(0, 7) : "";
    const [searchYear, searchMonthNum] = searchMonth.split('-');

    filteredPunishments = allPunishments.filter((row) => {
      const staffMatch = staffName === "" || (row[1] && row[1].toLowerCase().includes(staffName));

      let monthMatch = true;
      if (searchMonth) {
        const dateStr = row[3] || "";
        const date = new Date(dateStr);

        if (!isNaN(date)) {
          const punishmentYear = date.getFullYear().toString();
          const punishmentMonth = (date.getMonth() + 1).toString().padStart(2, '0');
          monthMatch = punishmentYear === searchYear && punishmentMonth === searchMonthNum;
        } else {
          monthMatch = false;
        }
      }

      return staffMatch && monthMatch;
    });

    updateSummary(filteredPunishments);
    displayResults(filteredPunishments);
  });
});
