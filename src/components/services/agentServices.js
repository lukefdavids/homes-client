export const getAgents = () => {
  return fetch(`http://localhost:8000/agents`).then((res) => res.json());
};
