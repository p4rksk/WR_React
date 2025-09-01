import React, {useCallback , useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import debounce from 'lodash/debounce';


const dummyTeams = [
    {id: 1, name:"러닝팀"},
    {id: 2, name:"독서팀"}
]

function TeamJoinModal({show, handleClose}) {
    const [search, setSearch] = useState('');
        const [results, setResults] = useState([]);
        const [selectedTeam, setSelectedTeam] = useState(null);

      const debouncedSearch = useCallback(
              debounce((value) => {
                const filter = dummyTeams.filter(
                  (team) => team.name.includes(value) 
                );
                
                setResults(filter);
          }, 300),
          []  
        );    


    useEffect(()=> {
         if (!show) {
           setSearch('');
          setResults([]);
          setSelectedTeam(null);
        }

        if(search.trim() !== ''){
            debouncedSearch(search)
        }else{
            setResults([]);
            setSelectedTeam(null);
        }
    }, [show,search, debouncedSearch]);

    const handleSelect =  (team) => {
        setSelectedTeam(team);
        setSearch(team.name);
        setResults([]);
    }
    
    const handleClear = () => {
    setSelectedTeam(null);
    setSearch('');
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
          <Modal.Title>팀 가입</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <label htmlFor="TeamNameInput">팀 이름</label>
          <input type="text" id="TeamNameInput" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="이름을 입력하세요"/>
          {results.length > 0 && !selectedTeam && (
          <div className="border rounded bg-light p-2">
            {results.map((team) => (
              <div
                key={team.id}
                onClick={() => handleSelect(team)}
                className={`p-1 cursor-pointer ${
                  selectedTeam?.id === team.id ? 'active' : ''
                }`}
                style={{ borderRadius: '4px', cursor: 'pointer' }}
              >
                {team.name}
              </div>
            ))}
          </div>
        )}
          {selectedTeam && (
          <div className="border rounded p-2 bg-primary-subtle text-primary-emphasis d-flex justify-content-between align-items-center">
            <span>{selectedTeam.name}</span>
            <button className="btn btn-sm btn-outline-primary" onClick={handleClear}>
              선택 해제
            </button>
          </div>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">팀 가입</Button>
        </Modal.Footer>
      </Modal>          
        </div>
    );
}

export default TeamJoinModal;