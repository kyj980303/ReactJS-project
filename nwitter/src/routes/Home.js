import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  // nweets라는 키값에 들어이쓴 데이터들을 가져옴
  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        // 모든 document의 데이터값을 갖고 id값을 추가해준다.
        ...document.data(),
        id: document.id,
      };
      // setNweets에 함수를 전달해 배열을 리턴함 --> 첫 번째 요소는 가장 최근의 document이고 그 뒤로 이전의 document를 붙여 리턴한다.
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  // 한 번만 실행함
  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    // nweets라는 키 값을 가진 데이터 베이스에 nweet(메시지)과 생성일을 데이터베이스에 추가함
    await dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now(),
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
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
