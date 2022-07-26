export const USERS = [
  { user_id: 1, username: "admin", password: "admin" },
  {
    user_id: 2,
    username: "lisa",
    password: "williams",
    profile_image_url: "www.placekitten.com",
    is_following: {
      id: 3,
      username: "carlos",
    },
  },
  {
    user_id: 3,
    username: "carlos",
    password: "tirado",
    profile_image_url: "www.placekitten.com",
    is_following: {
      user_id: 2,
      username: "lisa",
    },
  },
];
