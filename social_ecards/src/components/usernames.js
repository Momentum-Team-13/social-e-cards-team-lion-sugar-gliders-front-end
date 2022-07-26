export const USERS = [
  { user_id: 1, username: "admin", password: "admin" },
  {
    user_id: 2,
    username: "lisa",
    password: "williams",
    profile_image_url: "http://placekitten.com/200/300",
    is_following: {
      id: 3,
      username: "carlos",
    },
  },
  {
    user_id: 3,
    username: "carlos",
    password: "tirado",
    profile_image_url: "http://placekitten.com/200/300",
    is_following: {
      user_id: 2,
      username: "lisa",
    },
  },
];

let lastUserId = 3;

export function getAuthToken(username, password) {
  return new Promise((resolve, reject) => {
    resolve({ token: "testtoken" });
  });
}

export function getUsers(authToken) {
  return new Promise((resolve, reject) => {
    resolve({ USERS: USERS });
  });
}

export function storeUser(authoken, user) {
  lastUserId += 1;
  user.id = lastUserId;
  USERS.push(user);
  return new Promise((resolve, reject) => {
    resolve(user);
  });
}
