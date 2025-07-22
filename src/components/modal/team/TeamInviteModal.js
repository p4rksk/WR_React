import React, {useCallback , useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import debounce from 'lodash/debounce';


const dummyTeams = [
    {id: 1, name:"러닝팀"},
    {id: 2, name:"독서팀"}
]

const dummyFriends = [
    {id: 1, name:"김철수"},
    {id: 2, name:"홍길동"}
]

function TeamInviteModal({show, handleClose}) {
    const [teamNameSearch, setTeamNameSearch] = useState('');    
    const [teamNameResults, setTeamNameResults] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const [friendNameSearch, setFriendNameSearch] = useState('');    
    const [friendNameResults, setFriendNameResults] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);


    const teamDebouncedSearch = useCallback(
               debounce((value) => {
                 const filter = dummyTeams.filter(
                   (team) => team.name.includes(value) 
                 );
                 
                 setTeamNameResults(filter);
           }, 300),
           []  
         );

    const friendDebouncedSearch = useCallback(
               debounce((value) => {
                 const filter = dummyFriends.filter(
                   (friend) => friend.name.includes(value) 
                 );
                 
                 setFriendNameResults(filter);
           }, 300),
           []  
         );     
    
    useEffect(()=>{
      if (!show) {
          setTeamNameSearch('');
          setTeamNameResults([]);
          setSelectedTeam(null);
        }

      if(teamNameSearch !== '') {
        teamDebouncedSearch(teamNameSearch)
      }else{
        setTeamNameResults([]);
        setSelectedTeam([]);
      }

    
    },[show,teamNameSearch, teamDebouncedSearch]);
    
     useEffect(()=>{
      if (!show) {
          setFriendNameSearch('');
          setFriendNameResults([]);
          setSelectedFriend(null);
        }

      if(friendNameSearch !== '') {
        friendDebouncedSearch(friendNameSearch)
      }else{
        setFriendNameResults([]);
        setSelectedFriend([]);
      }

    
    },[show,friendNameSearch, friendDebouncedSearch]);


    const handleTeamNameSelect = (team) => {
      setSelectedTeam(team);
      setTeamNameSearch(team.name);
      setTeamNameResults([]);

    }

    const handleFriendNameSelect = (friend) => {
      setSelectedFriend(friend);
      setFriendNameSearch(friend.name);
      setFriendNameResults([]);
    }

    return (
        <div>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>팀 초대</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form className="d-flex flex-column gap-2">
            <Form.Group  controlId="teamName">            
              <Form.Label>팀 이름</Form.Label>
              <Form.Control
                type="text"
                value={teamNameSearch}
                onChange={(e)=> setTeamNameSearch(e.target.value)}
                placeholder="팀 이름을 입력해주세요"
                autoFocus
                required
                className='mb-2'
              />
             {teamNameResults.length > 0 && (
                <div className="border rounded bg-light p-2">
                  {teamNameResults.map((team) => (
                    <div
                      key={team.id}
                      onClick={() => handleTeamNameSelect(team)}
                      className={`p-1 cursor-pointer ${
                        selectedTeam?.id === team.id ? 'text-black' : ''
                      }`}
                      style={{ borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {team.name}
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
            <Form.Group controlId="friendName">
              <Form.Label>친구 이름</Form.Label>
              <Form.Control
                type="text"
                value={friendNameSearch}
                onChange={(e) => setFriendNameSearch(e.target.value)}
                placeholder="초대할 친구 이름을 입력해주세요"
                required
              />
            </Form.Group>
            {friendNameResults.length > 0 && (
              <div
                className="border rounded bg-light p-2"
                style={{
                  top: '100%',
                  left: 0,
                  zIndex: 10,
                  width: '100%',
                }}
              >
                {friendNameResults.map((friend) => (
                  <div
                    key={friend.id}
                    onClick={() => handleFriendNameSelect(friend)}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">팀 초대</Button>
        </Modal.Footer>
      </Modal>          
        </div>
    );
}

export default TeamInviteModal;