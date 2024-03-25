
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 캘린더를 감싸주는 스타일
const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 3% 5%;
    background-color: white;
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: black;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 토요일에만 파란 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: blue;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: red;
  }

  .react-calendar__month-view__days__day--weekend{
    color:black
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: blue;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: gray;
    padding: 0;
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 5px 0px 58px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 0;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    background: white;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.yellow_2};
    border-radius: 0.3rem;
  }`

// 캘린더를 불러옴
const StyledCalendar = styled(Calendar)``;

const StyledToday = styled.div`
  font-size: x-small;
  color: gray;
  font-weight: 600;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledDot = styled.div`
  background-color: #f3a95f;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

function CalendarMain() {
  const STORAGE_SAVE_KEY = 'DIARY_REACT_DATA';
  const totalDiaryData = localStorage.getItem(STORAGE_SAVE_KEY) == null ? [] : JSON.parse(localStorage.getItem(STORAGE_SAVE_KEY));
  console.log(totalDiaryData);
  const attendDay = totalDiaryData.length > 0 ? totalDiaryData.map((o)=>{return o.selDate}) : [];

  const today = new Date();
  const [date, setDate] = useState(new Date());
  
  const movePage = useNavigate();

  const goDiaryMain= (selDate) => {
    console.log("go diary");
    let formatDate = moment(selDate).format('YYYYMMDD');
    movePage('/diary', {
      state: {
       selDate: formatDate,
      } 
    });
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={setDate}
        onClickDay={goDiaryMain}
        formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
        tileContent={({ date, view }) => {
          let html = [];
          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(<StyledToday key={"today"}>오늘</StyledToday>);
          }
          if (
            attendDay.find((x) => x === moment(date).format("YYYYMMDD"))
          ) {
            html.push(<StyledDot key={moment(date).format("YYYYMMDD")} />);
          }
          return <>{html}</>;
        }}
      />
    </StyledCalendarWrapper>
  );
}

export default CalendarMain;