'use strict';
const dataList = $('#data-list');

async function fetchData() {
  const response = await fetch('/history'); // Fetch data from server root path
  const data = await response.json();

  data.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = JSON.stringify(item, null, 2); // Format data (optional)
    dataList.appendChild(listItem);
  });
}

fetchData();
