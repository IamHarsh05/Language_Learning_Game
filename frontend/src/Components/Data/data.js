// api.js

const apiUrl = "http://localhost:8000/questions";

let data = [];

export const fetchData = async () => {
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    data = response;
  } catch (err) {
    console.error(err);
  }
  console.log(data);
  return data;
};
