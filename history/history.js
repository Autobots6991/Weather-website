'use strict';
const dataList = $('#data-list');

async function fetchData() {
  const response = await fetch('/history');
  const data = await response.json();

  data.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = JSON.stringify(item, null, 2);
    dataList.appendChild(listItem);
  });
}

module.exports = fetchData();
