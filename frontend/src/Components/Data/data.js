// api.js

const apiUrl = process.env.REACT_APP_API;

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
