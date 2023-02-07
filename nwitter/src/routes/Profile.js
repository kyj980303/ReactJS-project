import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory(); // logout하면 메인으로 돌아가게하기위해 사용
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName); // 새로운 프로필 이름을 설정하기 위함

  const onLogOutClick = () => {
    authService.signOut(); // logout해줌
    history.push("/");
  };

  // 내 정보 불러오기 위함
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid) // 쿼리 조건문(where 여러개 할 수 있다.)
      .orderBy("createdAt") // 정렬
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
      history.push("/");
    }
  };

  useEffect(() => {
    getMyNweets();
  });

  function updateUserName() {
    alert("Your username has been changed.");
  }

  return (
    <>
      <p className="changeUserName">Change Username</p>
      <form onSubmit={onSubmit}>
        <input
          className="changeName"
          onChange={onChange}
          type="text"
          value={newDisplayName}
          placeholder={userObj.displayName}
        />
        <input
          className="updateProfile"
          type="submit"
          value="Update Profile"
          onClick={updateUserName}
        />
        <span className="bar"></span>
      </form>
      <button className="logout" onClick={onLogOutClick}>
        LogOut
      </button>
    </>
  );
};
