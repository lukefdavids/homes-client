export const getUsersHomes = (token) => {
  return fetch(`http://localhost:8000/homes/user_homes`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
};

export const updateHome = (token, home) => {
  return fetch(`http://localhost:8000/homes/${home.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(home),
  }).then((res) => res.json());
};

export const deleteHome = (token, homeId) => {
  return fetch(`http://localhost:8000/homes/${homeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then();
};

export const getAllHomes = (token) => {
  if (token) {
    return fetch(`http://localhost:8000/homes`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((res) => res.json());
  } else {
    return fetch(`http://localhost:8000/homes`).then((res) => res.json());
  }
};

export const getHomeById = (homeId) => {
  return fetch(`http://localhost:8000/homes/${homeId}`, {}).then((res) =>
    res.json()
  );
};
