import { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  // 챗팅 묶음
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // firebase의 onSpnapshot
    // ==> 실시간으로 데이터를 가져오는 기능을 제공해준다.
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  console.log(nweets);

  return (
    <>
      <div className="home">
        <NweetFactory userObj={userObj} />
        <div className="txts">
          {nweets.map((nweet) => (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              userObj={userObj}
              isOwner={nweet.creatorId === userObj.uid} // 우리가 쓴 댓글에만 수정, 삭제를 보이게 하기위해 내가 작성한 글인지 판별해주는 isOwner을 만들어 보낸다.
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
