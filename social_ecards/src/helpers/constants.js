// liongliders pw sugargliders
// lisa pw teamthirteen?

export let baseURL = "https://sg-ecard-api.herokuapp.com/";

export const time = Date.now();
export const timestamp = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}).format(time);
