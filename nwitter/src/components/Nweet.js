import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); // edit모드인지 아닌지 true 또는 false를 리턴
  const [newNweet, setNewNweet] = useState(nweetObj.text); // edit된 새로운 텍스트로 업데이트해주기 위함

  // 삭제
  const onDeleteClick = async () => {
    // alert창과 비슷 -> 확인을 누르면 true리턴
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    console.log(ok);
    if (ok) {
      // delete nweet
      await dbService.doc(`/nweets/${nweetObj.id}`).delete();
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

  // editing이 true인 상태이면 (수정하기를 누르면) 새로 수정할 텍스를 담을 input박스와 취소버트을 보이게 하고
  // 그렇지 않으면 삭제버튼과 수정 버튼을 보이게 한다.
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
