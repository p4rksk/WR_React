import { Container, Row, Col, Button, ListGroup, Badge, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import Chart from 'chart.js/auto';

function TeamRoutine() {
  useEffect(() => {
    // 일간 차트
    const dailyCtx = document.getElementById('dailyChart');
    new Chart(dailyCtx, {
      type: 'doughnut',
      data: {
        labels: ['완료', '미완료'],
        datasets: [{
          data: [70, 30],
          backgroundColor: ['#198754', '#dee2e6'],
        }],
      },
    });

    // 주간 차트
    const weeklyCtx = document.getElementById('weeklyChart');
    new Chart(weeklyCtx, {
      type: 'bar',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [{
          label: '달성률',
          data: [80, 60, 70, 90, 50, 40, 100],
          backgroundColor: '#198754',
        }],
      },
    });
  }, []);

  const changeMonth = (offset) => {
    console.log('Change month:', offset);
    // 실제 달력 로직은 추가적으로 구성 필요
  };

  return (
      <Container fluid>
        {/* Chart 영역 */}
        <Row className="chart-row mb-4">
          <Col md={6}>
            <h6>오늘 루틴 달성률</h6>
            <canvas id="dailyChart"></canvas>
          </Col>
          <Col md={6}>
            <h6>주간 루틴 달성률</h6>
            <canvas id="weeklyChart"></canvas>
          </Col>
        </Row>

        {/* 달력 영역 */}
        <div className="calendar-wrapper mb-4">
          <div className="calendar-controls d-flex align-items-center justify-content-center gap-3">
            <Button variant="outline-success" size="sm" onClick={() => changeMonth(-1)}>◀ 이전</Button>
            <div id="currentMonth" className="fw-bold fs-5">2025-07</div>
            <Button variant="outline-success" size="sm" onClick={() => changeMonth(1)}>다음 ▶</Button>
          </div>
          <div className="calendar-grid mt-3" id="calendar-body">
            {/* 달력 셀은 이후 구성 */}
          </div>
        </div>

        {/* 루틴 요약 리스트 */}
        <div className="routine-list">
          <h6>이번 주 루틴 요약</h6>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-start py-3">
              <a href="#" className="week-routine text-decoration-none text-dark w-100">
                <div className="routine-item">
                  <div className="d-flex align-items-center mb-1">
                    <i className="bi bi-calendar3 me-2 text-muted"></i>
                    <strong className="me-3 text-muted">2025-04-03</strong>
                  </div>
                  <div className="fw-semibold mb-1">아침 스트레칭</div>
                  <div className="d-flex align-items-center small text-muted">
                    <Badge bg="success" className="me-2">운동</Badge>
                  </div>
                </div>
              </a>
              <Form.Check type="checkbox" className="ms-2 mt-1" />
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Container>
  );
}

export default TeamRoutine;
