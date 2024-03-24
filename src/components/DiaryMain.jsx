import { useState } from "react";
import { CallGPT } from "../api/gpt";
import DiaryInput from "./DiaryInput";
import styled from "styled-components";
import logo from "../assets/logo.png";
import DiaryDisplay from "./DiaryDisplay";
import { message } from "antd";
import { useLocation } from 'react-router-dom';




function DiaryMain() {
  let diaryData = "";
  //달력에서 받아온 날짜 데이터
  const diaryDataKey = useLocation().state.selDate;
  console.log('selDate', diaryDataKey);
  diaryData = localStorage.getItem(diaryDataKey) == null ? "" : JSON.parse(JSON.parse(localStorage.getItem(diaryDataKey)));

  const [data, setData] = useState(diaryData);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickAPICall = async (userInput) => {
    console.log(userInput);
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `${userInput}`,
      });
      console.log(JSON.parse(message));

      localStorage.setItem(selDate, JSON.stringify(message));
      setData(JSON.parse(message));
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

  return (
    <AppConatiner>
        {contextHolder}
        <AppTitle>
          심리상담사 GPT, AI 회고록 <img width={"100px"} src={logo}></img>
        </AppTitle>
        <DiaryInput messageApi={messageApi} isLoading={isLoading} onSubmit={handleSubmit}/>
        <div id="capture">
          {data === "" ? "" : <DiaryDisplay isLoading={isLoading} data={data} />}
        </div>
    </AppConatiner>
  );
}

export default DiaryMain;

const AppConatiner = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  font-family: "Noto Serif KR";
`;
