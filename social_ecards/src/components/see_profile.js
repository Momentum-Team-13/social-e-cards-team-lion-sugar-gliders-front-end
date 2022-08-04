import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useEffect, useState } from "react";
import { useResolvedPath, useNavigate } from "react-router-dom";

export default function SeeProfile({ token, username }) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [followerList, setFollowerList] = useState([]);
  const [editPage, setEditPage] = useState(false);
  const [unfollow, setUnfollow] = useState(false);
  const [singleUserID, setSingleUserID] = useState("");

  let navigate = useNavigate();

  const getProfileInfo = () => {
    axios
      .get(`${baseURL}auth/users/me/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setProfileInfo(res.data);
        console.log(res);
      })
      .catch((res) => console.log(res));
  };

  const seeFollowers = () => {
    axios
      .get(`${baseURL}followers/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        let followers = res.data;
        console.log(followers);
        setFollowerList(followers);
      })
      .catch((res) => console.log(res));
  };

  const handleUnfollow = (props) => {
    console.log(props);
    let userID = props;
    axios
      .delete(`${baseURL}followers/${userID}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUnfollow(true));
  };

  const handleSeeUserProfile = (e) => {
    let userPK = e;
    console.log(userPK);
  };

  // const handleEdit = (e) => {
  //   console.log("wanna edit");
  //   return <EditForm token={token} username={username} />;
  // };

  return (
    <div>
      <>
        <div onClick={(e) => getProfileInfo(e)}> click to get user info</div>
        {profileInfo && (
          <div>
            <h1>{profileInfo.username}'s page</h1>
            <div>Email is: {profileInfo.email}</div>
            <div>Profile Id Number: {profileInfo.id}</div>
            {/* <button onClick={() => handleEdit()}>Edit Profile</button> */}
          </div>
        )}
        <h3>{username}'s followers</h3>
        <div onClick={(e) => seeFollowers(e)}> click to see follower list</div>

        <div>
          {followerList && (
            <div className="follower_list">
              {followerList.map((follower) => (
                <div className="individual_follower" key={follower}>
                  <div key={follower.user_following.username}>
                    Following {follower.user_following.username}
                  </div>
                  <button
                    id={follower.id}
                    onClick={(e) => handleUnfollow(e.target.id)}
                  >
                    unfollow
                  </button>
                  <button
                    id={follower.following}
                    onClick={(e) => handleSeeUserProfile(e.target.id)}
                  >
                    Click to see {follower.user_following.username}'s Profile
                  </button>
                  {unfollow ? <div>You no longer follow this user</div> : ""}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
      <CardList token={token} />
    </div>
  );
}

const CardList = ({ token }) => {
  const [myCards, setMyCards] = useState([]);
  let navigate = useNavigate();

  const handleEditCard = (props) => {
    let cardID = props.card.id;
    console.log(cardID);
    navigate(`/editcard/${cardID}`);
  };

  const handleDeleteCard = (props) => {
    let cardID = props.card.id;
    console.log(cardID);
    navigate(`/deletecard/${cardID}`);
  };

  axios
    .get(`${baseURL}ecards/?list=me`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      let cards = res.data;
      setMyCards(cards);
    });
  return (
    <div>
      <h1>Cards You've Made</h1>
      {myCards.map((card) => (
        <div className="card" id={card.id}>
          <div>{card.card_outer_message}</div>
          <h2>{card.card_inner_message}</h2>
          <p>Card created at: {card.created_at}</p>
          <p>Card updated at: {card.updated_at}</p>
          <img
            src={card.card_image_file ? card.card_image_file : card.card_image}
            alt="place kitten card cover"
          />
          <div onClick={(e) => handleEditCard({ card })}>Edit Card</div>
          <div onClick={(e) => handleDeleteCard({ card })}>Delete card </div>
        </div>
      ))}
    </div>
  );
};
