import React from "react";
import { dbService, storageService } from "fbase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // 랜덤으로 아이디값을 부여해줌 (npm install uuid)

const NweetFactory = ({ userObj }) => {
  // 챗팅 하나 하나
  const [nweet, setNweet] = useState("");
  // 이미지 파일
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweet === "") {
      return;
    }
    let attachmentUrl = "";
    // 사진을 첨부했다면
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      userName: userObj.displayName,
    };
    // firebase의 collection : nweets라는 키 값을 가진 데이터 베이스에
    // nweet객체를 추가한다.
    await dbService.collection("nweets").add(nweetObj);
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
    <>
      <form onSubmit={onSubmit} className="textForm">
        <input
          className="textInput"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" id="file" accept="image/*" onChange={onFileChange} />
        <input className="send" type="submit" value="➞"></input>
        <label htmlFor="file" className="photos">
          Add Photos +
        </label>
        {attachment && (
          <div>
            <img src={attachment} className="thumbnail" />
            <button onClick={onClearAttachmentClick} className="removeImage">
              Remove
            </button>
          </div>
        )}
      </form>
    </>
  );
};
export default NweetFactory;
