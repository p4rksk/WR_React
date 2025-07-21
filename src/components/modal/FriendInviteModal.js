import React, {useCallback , useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import debounce from 'lodash/debounce';


const dummyFriends = [
    {id: 1, name:"김철수"},
    {id: 2, name:"홍길동"}
]

function FriendInviteModal({show, handleClose}) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const debouncedSearch = useCallback(
          debounce((value) => {
            const filter = dummyFriends.filter(
              (friend) => friend.name.includes(value) 
            );
            
            setResults(filter);
      }, 300),
      [] // 의존성 없음 = 재생성 안되게 한다.          
    );

    useEffect(() => {
        if(search.trim() !== '') {
            debouncedSearch(search);
        }else{
            setResults([]);
            setSelectedFriend(null);
        }
    }, [search, debouncedSearch]);

    const handleSelect = (friend) => {
    setSelectedFriend(friend);
    setSearch(friend.name); 
    setResults([]); 
  };



    return (
        <div>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>친구추가</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <label htmlFor="friendNameInput">친구 이름</label>
          <input type="text" id="friendNameInput" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="이름을 입력하세요"/>
          {results.length > 0 && (
          <div className="border rounded bg-light p-2">
            {results.map((friend) => (
              <div
                key={friend.id}
                onClick={() => handleSelect(friend)}
                className={`p-1 cursor-pointer ${
                  selectedFriend?.id === friend.id ? 'text-black' : ''
                }`}
                style={{ borderRadius: '4px', cursor: 'pointer' }}
              >
                {friend.name}
              </div>
            ))}
          </div>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">친구추가</Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}

export default FriendInviteModal;