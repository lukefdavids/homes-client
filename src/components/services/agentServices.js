export const getAgents = (token) => {
  return fetch(`http://localhost:8000/agents`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
