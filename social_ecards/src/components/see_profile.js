import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useEffect, useState } from "react";
import { useResolvedPath, useNavigate } from "react-router-dom";
import moment from "moment";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

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
        // console.log(res);
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
        <h2>Cards You've Made</h2>
        <h4>My cards</h4>
        <button id="seeinfo" onClick={(e) => getProfileInfo(e)}>
          {" "}
          click to get user info
        </button>
        {profileInfo && (
          <div>
            <h1>{profileInfo.username}'s page</h1>
            <div>Email is: {profileInfo.email}</div>
            <div>Profile Id Number: {profileInfo.id}</div>
            {/* <button onClick={() => handleEdit()}>Edit Profile</button> */}
          </div>
        )}
        <h4>{username}'s followers</h4>
        <button id="seeinfo" onClick={(e) => seeFollowers(e)}>
          {" "}
          click to see follower list
        </button>
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
  const [expanded, setExpanded] = useState(false);
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
      // console.log(res);
      let cards = res.data;
      setMyCards(cards);
    });

  const settings = {
    dots: true,
    infinite: true,
    speed: 280,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    rows: 1,
  };

  return (
    <div>
      {/* <Slider {...settings}> */}
      {myCards.map((card) => (
        <div className="card" id={card.id}>
          {/* <img
            className="img"
            src={card.card_image}
            alt="place kitten card cover"
          /> */}
          <div>{card.card_outer_message}</div>
          <div>{card.card_color}</div>
          <div className="see-profilecards">
            <div>
              created:
              {moment(card.card_created_at).format("MMM Do YY, h:mm a")}
            </div>
            <div>
              updated:{" "}
              {moment(card.card_updated_at).format("MMM Do YY, h:mm a")}
            </div>
            <img
              src={
                card.card_image_file ? card.card_image_file : card.card_image
              }
              alt="place kitten card cover"
            />
            {!expanded ? (
              <div onClick={(e) => setExpanded(true)}>see inner message</div>
            ) : (
              <InnerMessage card_inner_message={card.card_inner_message} />
            )}
            <br />
            <div onClick={(e) => handleEditCard({ card })}>Edit Card</div>
            <div onClick={(e) => handleDeleteCard({ card })}>Delete card </div>
            <button onClick={(e) => handleEditCard({ card })}>Edit Card</button>
            <button onClick={(e) => handleDeleteCard({ card })}>
              Delete card{" "}
            </button>
          </div>
        </div>
      ))}
      {/* </Slider> */}
    </div>
  );
};

const InnerMessage = ({ card_inner_message }) => {
  return (
    <div>
      {" "}
      <div>{card_inner_message}</div>
    </div>
  );
};
