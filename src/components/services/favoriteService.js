export const deleteFavorite = (token, homeId) => {
  console.log("Home unfavorited");
  return fetch(`http://localhost:8000/homes/${homeId}/favorite`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then();
};

export const favoriteHome = (token, homeId) => {
  return fetch(`http://localhost:8000/homes/${homeId}/favorite`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(homeId),
  }).then((res) => res.json());
};
export const getFavorites = (token) => {
  return fetch(`http://localhost:8000/homes/list_favorites`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
