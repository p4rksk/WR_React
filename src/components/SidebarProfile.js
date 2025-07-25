import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import FriendInviteModal from './modal/FriendInviteModal';
import { useState } from 'react';


function SidebarProfile() {
  
  
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const popover = (
  <Popover id="profile-popover" className="bg-dark text-white border-0">
    <Popover.Body>
      <a href="" className="dropdown-item text-white">Profile</a>
      <button className="dropdown-item text-white">Sign out</button>
      <hr className="border-light" />
      <strong className='text-white'>👥 친구 목록</strong>
      <ul className="list-unstyled ms-2 text-white">
        <li>- 이지훈</li>
        <li>- 홍길동</li>
        <li>- 김개발</li>
      </ul>
      <hr className="border-light" />
      <Button className="dropdown-item text-info fw-bold text-white" onClick={handleShow} >+ 친구 추가</Button>
    </Popover.Body>
  </Popover>
);


  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      rootClose
      overlay={popover}
    >
      <div>
        <div className="d-flex align-items-center gap-2 text-white" style={{ cursor: 'pointer' }}>
          <img
            src="https://github.com/mdo.png"
            alt="프로필"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
          <span>선규</span>
        </div>
        <FriendInviteModal show={show} handleClose={handleClose}/>
      </div>
    </OverlayTrigger>
  );
}

export default SidebarProfile;