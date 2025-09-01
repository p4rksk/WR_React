import Chart from 'chart.js/auto';
import { useEffect, useState, useRef } from 'react';
import { Badge, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import '../../css/MyRoutine.css';

const routineList = {
  "2025-08-03": [ { title: "아침 스트레칭", category: "운동" } ],
  "2025-08-06": [ { title: "영어 단어 암기", category: "공부" }, { title: "밤 명상", category: "명상" } ]
}

function MyRoutine() {
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

  const calendarBodyRef = useRef(null);
  const monthLabelRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());


  //달력 
 useEffect(() => {
    const body = calendarBodyRef.current;
    const label = monthLabelRef.current;
    if (!body || !label) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    label.textContent = `${year}년 ${month + 1}월`;
    body.innerHTML = '';

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 빈 칸 채우기
    for (let i = 0; i < startDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar-cell';
      body.appendChild(empty);
    }

    // 날짜 채우기
    for (let d = 1; d <= lastDate; d++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const has = !!routineList[fullDate];

      const cell = document.createElement('div');
      cell.className = `calendar-cell ${has ? 'has-routine' : ''}`;
      cell.innerHTML = `<div>${d}</div>`;
      if (has) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.textContent = '●';
        cell.appendChild(dot);
      }
      body.appendChild(cell);
    }
  }, [currentDate]); 

  const changeMonth = (offset) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  return (
      <Container fluid>
        {/* Chart 영역 */}
        <Row className="chart-row mb-4">
          <Col md={2}>
            <h6>오늘 루틴 달성률</h6>
            <canvas id="dailyChart"></canvas>
          </Col>
          <Col md={4}>
            <h6>주간 루틴 달성률</h6>
            <canvas id="weeklyChart"></canvas>
          </Col>
        </Row>

        {/* 달력 영역 */}
        <div className="calendar-wrapper">
          <div className="calendar-controls">
            <Button variant="outline-success" size="sm" onClick={() => changeMonth(-1)}>◀ 이전</Button>
            <div ref={monthLabelRef} className="fw-bold fs-5" />
            <Button variant="outline-success" size="sm" onClick={() => changeMonth(1)}>다음 ▶</Button>
          </div>
          <div className="calendar-grid" ref={calendarBodyRef} />
        </div>

        {/* 루틴 요약 리스트 */}
        <div className="routine-list">
          <h6>이번 주 루틴 요약</h6>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-start py-3">
              <a href="#" className="week-routine text-decoration-none text-dark w-100">
                <div className="routine-item">
                  <div className="d-flex align-items-center mb-1">
                    <h4 className="me-3 text-muted">2025-04-03</h4>
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

export default MyRoutine;
