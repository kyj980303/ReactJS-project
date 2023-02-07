import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false); // edit모드인지 아닌지 true 또는 false를 리턴
  const [newNweet, setNewNweet] = useState(nweetObj.text); // edit된 새로운 텍스트로 업데이트해주기 위함

  // 삭제
  const onDeleteClick = async () => {
    // alert창과 비슷 -> 확인을 누르면 true리턴
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      // delete nweet
      // firebase의 document에서 nweets라는 컬렉션에 삭제하고싶은 메시지를 찾아 삭제한다.
      await dbService.doc(`/nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete(); // 이미지 삭제
    }
  };

  // 상태를 변경해주기위함
  const toggleEditing = () => setEditing((prev) => !prev);

  // 수정
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet, // newNweet: 새로 저장할 텍스트
    });
    setEditing(false); // Update Nweet 버튼을 누르고 나면 수정상태를 false로 바꿔주고 화면에 수정된 text를 보여준다.
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  // 만약 프로필에서 이름을 수정했다면
  // nweetObj 객체에 있는 이름도 수정된 이름으로 변경해준다.
  function changeName() {
    if (nweetObj.creatorId === userObj.uid) {
      nweetObj.userName = userObj.displayName;
    }
  }

  changeName();

  // editing이 true인 상태이고(수정하기를 누르면) isOwner(글쓴이)가 true(자신)이면
  // 새로 수정할 텍스를 담을 input박스와 취소버트을 보이게 하고
  // 그렇지 않으면 삭제버튼과 수정 버튼을 보이게 한다.
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="update">
            <input
              className="editText"
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input className="updatetxt" type="submit" value="Update Nweet" />
            <button className="canceltxt" onClick={toggleEditing}>
              Cancel
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="txt">
            <h4>{nweetObj.text}</h4>
            {isOwner && (
              <>
                <span className="debtn">
                  <span className="editBtn" onClick={toggleEditing}>
                    <img src={process.env.PUBLIC_URL + "/img/pen.png"} />
                  </span>
                  <span className="deleteBtn" onClick={onDeleteClick}>
                    <img src={process.env.PUBLIC_URL + "/img/delete.png"} />
                  </span>
                </span>
              </>
            )}
            {nweetObj.attachmentUrl && (
              <img className="sendThumbnail" src={nweetObj.attachmentUrl} />
            )}
          </div>
          <p className="userName">from. {nweetObj.userName}</p>
        </>
      )}
    </div>
  );
};

export default Nweet;
