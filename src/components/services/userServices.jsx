export const getCurrentUser = (token) => {
  return fetch("http://localhost:8000/current_user", {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
