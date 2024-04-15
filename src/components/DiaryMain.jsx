import React, {useEffect, useState} from "react";
import { CallGPT } from "../api/gpt";
import DiaryInput from "./DiaryInput";
import styled from "styled-components";
import logo from "../assets/logo.png";
import DiaryDisplay from "./DiaryDisplay";
import { message } from "antd";
import { useLocation } from 'react-router-dom';
import isEmpty from "is-empty";
import SearchComponent from "./SearchComponent";
import SpotifyPlayerComponent from "./SpotifyPlayer.jsx";



function DiaryMain() {
  let diaryData = "";
  //달력에서 받아온 날짜 데이터
  const STORAGE_SAVE_KEY = 'DIARY_REACT_DATA';
  const selDate = useLocation().state.selDate;
  const diaryDataKey = `diary ${selDate}`;
  console.log('selDate', diaryDataKey);
  const totalDiaryData = localStorage.getItem(STORAGE_SAVE_KEY) == null ? [] : JSON.parse(localStorage.getItem(STORAGE_SAVE_KEY));
  diaryData = totalDiaryData.find((o)=>{return o.selDate == selDate }) || {};
  console.log(diaryData);
  const [data, setData] = useState(diaryData);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const musicData = {};
  const handlePlayTrack = async (uri) => {

  };

  const handleClickAPICall = async (userInput) => {
    console.log(userInput);
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: userInput,
      });
      console.log(JSON.parse(message));
        const musicData = !isEmpty(localStorage.getItem('musicData')) ? JSON.parse(localStorage.getItem('musicData')) : {};
      localStorage.setItem('musicData', '{}');
        console.log(musicData);
      // }
      //데이터에 날짜 저장
      let msgObj = JSON.parse(message);
      msgObj.selDate = selDate;
      msgObj.musicData = musicData;
      // msgOBj.

      totalDiaryData.push(msgObj);

      localStorage.setItem(STORAGE_SAVE_KEY, JSON.stringify(totalDiaryData));
      setData(msgObj);
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: error?.message,
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = (userInput) => {
    handleClickAPICall(userInput);
  };

  useEffect(() => {


    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);



  return (
    <AppConatiner>
        {contextHolder}
        <AppTitle>
          심리상담사 GPT, AI 회고록 <img width={"100px"} src={logo}></img>
        </AppTitle>
        <DiaryInput selDate={selDate} disabeld={isEmpty(diaryData)} messageApi={messageApi} isLoading={isLoading} onSubmit={handleSubmit}/>
        <div id="capture">
          {isEmpty(data) ? '' : <DiaryDisplay isLoading={isLoading} data={data} />}
        </div>

    </AppConatiner>
  );
}

export default DiaryMain;

const AppConatiner = styled.div`
  padding: 20px 20px 120px 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  //font-weight: 400;
  font-size: 35px;
  text-align: center;
  //font-family: "GowunBatang-Bold";
`;
