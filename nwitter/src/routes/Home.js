import { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid"; // 랜덤으로 아이디값을 부여해줌 (npm install uuid)
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  console.log(userObj);
  // 챗팅 하나 하나
  const [nweet, setNweet] = useState("");
  // 챗팅 묶음
  const [nweets, setNweets] = useState([]);
  // 이미지 파일
  const [attachment, setAttachment] = useState();

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
    let attachmentUrl = "";
    if (attachment != "") {
      // 사진을 첨부했다면
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetOvj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    // firebase의 collection : nweets라는 키 값을 가진 데이터 베이스에
    // nweet객체를 추가한다.
    await dbService.collection("nweets").add(nweetOvj);
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    // event 안에있는 target의 value값을 가져와라
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0]; // 파일을 준비하고
    const reader = new FileReader(); // 파일 리더를 만들어 준비하고
    // 파일 로딩이 끝날 때 finishedEvent를 얻고
    // finishedEvent의 currentTarget에 result를 갖고와서
    // setAttachment에 저장하고 미리보기 이미지로 보여준다.
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // readAsDataURL을 사용해서 파일을 읽는다.
  };

  // 사진 등록 취소
  const onClearAttachmentClick = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet"></input>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
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
