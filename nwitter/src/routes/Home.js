import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  console.log(userObj);
  // 챗팅 하나
  const [nweet, setNweet] = useState("");
  // 챗팅 묶음
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // firebase에서 실시간으로 데이터를 가져오기 위해 onSpnapshot을 사용한다.
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    // firebase의 collection : nweets라는 키 값을 가진 데이터 베이스에
    // add -> text와 생성일을 데이터베이스에 추가
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onChange = (event) => {
    // event 안에있는 target의 value값을 가져와라
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  console.log(nweets);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet"></input>
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid} // 우리가 쓴 댓글에만 수정, 삭제를 보이게 하기위해 내가 작성한 글인지 판별해주는 isOwner을 만들어 보낸다.
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
