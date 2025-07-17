import { Button, Nav } from 'react-bootstrap';
import '../css/Sidebar.css';
import SidebarProfile from './SidebarProfile';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function Sidebar() {
  const teamPopover = (
  <Popover id="team-popover" className="bg-dark text-white border-0">
    <Popover.Body>
      <div className="dropdown-item text-white">A팀</div>
      <div className="dropdown-item text-white">팀 가입</div>
    </Popover.Body>
  </Popover>
);

  return (
    <>
      <div className="sidebar">
        <h4 className="mt-2 mb-2">WR</h4>
        <hr className="border-secondary" />
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
          <Button
            variant="light"
            size="sm"
            className="mt-2 w-100"
            onClick={() => alert('모달 열기 구현 예정')}
          >
            + 친구 추가
          </Button>
        </div>
        <hr></hr>
        <SidebarProfile/>
      </div>
    </>
  );
}

export default Sidebar;
