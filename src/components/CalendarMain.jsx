
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../img/background.jpg";

// 캘린더를 감싸주는 스타일
const StyledCalendarWrapper = styled.div`
    width: 100%;
    //display: flex;
    justify-content: center;
        position: relative;
    

    .react-calendar {
        width: 100%;
        border: none;
        //border-radius: 0.5rem;
        padding: 0 10px;
        background-color: rgb(17,28,45, 0.8);
        font-family: "GowunDodum-Regular"   ;
    }
    .react-calendar:after{
        content: "";
        background-image: url(${backgroundImg});
        background-size:cover;
        opacity:0.5;
        position:absolute;
        top:0px;
        left:0px;
        right:0px;
        bottom:0px;
        z-index: -999;
    }

    /* 네비게이션 가운데 정렬 */

    .react-calendar__navigation {
        justify-content: space-around;
        font-family: "GowunBatang-Bold";
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    /* 네비게이션 폰트 설정 */

    .react-calendar__navigation button {
        font-family: "GowunBatang-Bold";
        //font-weight: 800;
        font-size: 1.1rem;
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
    .react-calendar__month-view__weekdays__weekday{
        border:1px solid #fff;
    }

    .react-calendar__month-view__weekdays abbr {
        text-decoration: none;
        font-family: "GowunBatang-Bold";
        font-size: 0.9rem;
    }
    .react-calendar__month-view__days__day--neighboringMonth, .react-calendar__decade-view__years__year--neighboringDecade, .react-calendar__century-view__decades__decade--neighboringCentury{
        color: #757575 !important;
    }


    /* 토요일에만 파란 폰트 */

    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
        color: blue;
    }

    /* 일요일에만 빨간 폰트 */

    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
        color: red;
    }

    .react-calendar__month-view__days {
        border: 1px solid #fff;
    }

    .react-calendar__month-view__days__day--weekend {
        color: #fff;
        border: 1px solid #fff;
    }

    /* 오늘 날짜 폰트 컬러 */

    .react-calendar__tile--now {
        background: none;

        abbr {
            color: rgba(255,201,49,1);
            text-shadow: 0 0 10px #f6de97;
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
        padding: 5px 0px 67px;
        position: relative;
        border: 1px solid #fff;
        border-radius: 0;
        margin: 5px 0;
        font-size: 0.9rem;
        text-decoration: none;
        font-family: "GowunBatang-Bold";
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
        background-color: #091324;
        //border-radius: 0.3rem;
        color: #ffefc0;
        text-shadow: 0 0 10px rgb(255 188 0);
    }`

// 캘린더를 불러옴
const StyledCalendar = styled(Calendar)``;

const StyledToday = styled.div`
  font-size: x-small;
  color: #fff;
  font-weight: 600;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledDot = styled.div`
  background-color: #f0ce4a;
  //border-radius: 50%;
  //width: 0.5rem;
  //height: 0.5rem;
  //position: absolute;
  //top: 50%;
  //left: 50%;
    width: 100%;
    height: 5px;
  //transform: translateX(-50%);
    position : absolute;
    box-shadow:
            0 0 0.1vw 0.1vw #f6de97, 
            0 0 0.2vw 0.1vw #f8de9f, 
            0 0 0.4vw 0.2vw #ffcc81;
    top: 30px;
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
      <div className="calender-background">
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
                  tileContent={({date, view}) => {
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
                          html.push(<StyledDot key={moment(date).format("YYYYMMDD")}/>);
                      }
                      return <>{html}</>;
                  }}
              />

</StyledCalendarWrapper>
      </div>


)
    ;
}

export default CalendarMain;