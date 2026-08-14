export const fetchData = (endpoint, method = "get", fd = {}) => {
  let url = import.meta.env.VITE_APP_API_URL + endpoint;
  let username = import.meta.env.VITE_APP_API_KEY;
  let password = "";
  let auth = btoa(`${username}:${password}`);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic " + auth);
  myHeaders.append("Content-Type", "application/json");

  let options = {
    method,
    headers: myHeaders,
  };

  if (method !== "get") {
    options = {
      ...options,
      body: JSON.stringify(fd),
    };
  }

  const data = fetch(url, options).then((res) => res.json());
  return data;
};
