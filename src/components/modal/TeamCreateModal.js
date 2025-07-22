import React, {useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


function TeamCreateModal({show, handleClose}) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [category, setCategory] = useState('');


    const handleImageSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
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
        <Modal.Body >
          <Form className="d-flex flex-column gap-2">
            <Form.Group controlId="teamImage">
              <Form.Label>팀 대표 이미지</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageSelect} required />
            </Form.Group>
            {previewUrl && (
              <img src={previewUrl} alt="미리보기" className="img-thumbnail mt-2" width="200" />
            )}
            <Form.Group controlId="teamCategory">
              <Form.Label>카테고리</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">카테고리 선택</option>
                <option value="운동">운동</option>
                <option value="독서">독서</option>
                <option value="식단">식단</option>
                <option value="공부">공부</option>
                <option value="기상">기상</option>
              </Form.Select>
            </Form.Group>
            <Form.Group  controlId="teamName">            
              <Form.Label>팀 이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="팀 이름을 입력해주세요"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="teamDescription">
              <Form.Label>팀 소개</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder='팀 소개를 입력해주세요' required/>
            </Form.Group>
          </Form>
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

export default TeamCreateModal;