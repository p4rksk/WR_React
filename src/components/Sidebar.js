import { Button, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import '../css/Sidebar.css';
import SidebarProfile from './SidebarProfile';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FriendInviteModal from './FriendInviteModal';



function Sidebar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const teamPopover = (
  <Popover id="team-popover" className="bg-dark text-white border-0">
    <Popover.Body>
      <Link href='' className="dropdown-item text-white">A팀</Link>
      <hr className="border-light" />
      <Button className="dropdown-item text-white">팀 가입</Button>
      <Button className="dropdown-item text-white">팀 생성</Button>
      <Button className="dropdown-item text-white">팀 초대</Button>
    </Popover.Body>
  </Popover>
);

  return (
    <>
      <div className="sidebar">
        <h4 className="mt-2 mb-2">WR</h4>
        <hr className="border-secondary"/>
        <Nav className="mt-4 flex-column gap-3">
          <Nav.Link href="#home">홈</Nav.Link>    
          <Nav.Link href="#notifications">알림함</Nav.Link>
          <Nav.Link href="#search">루틴 검색</Nav.Link>
          <Nav.Link>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose
              overlay={teamPopover}
            >
              <div className="nav-link p-0 text-white" style={{ cursor: 'pointer' }}>
                팀 피드 
              </div>
            </OverlayTrigger>
          </Nav.Link>
        </Nav>
        <div className="mt-auto p-3 bg-dark text-white rounded">
          친구를 초대하고 <br /> 팀을 만들어보세요!
          <Button variant="light" size="sm" className="mt-2 w-100" onClick={handleShow}>
            + 친구 추가
          </Button>
        </div>
        <hr className="border-light" />
        <SidebarProfile/>
      </div>
      <FriendInviteModal show={true} handleClose={handleClose}/>
    </>
  );
}

export default Sidebar;
