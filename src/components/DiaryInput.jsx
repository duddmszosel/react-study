import { Input, Button, message } from "antd";
import {useEffect, useState} from "react";
import { Title } from "./CommonStyles";
import styled from "styled-components";
import { FileImageOutlined } from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";


import html2canvas from "html2canvas";
const { TextArea } = Input;

const DiaryInput = ({ selDate, isLoading, onSubmit, messageApi, disabeld }) => {
  const [userInput, setUserInput] = useState("");
  const movePage = useNavigate();
  // 사용자의 입력을 받아, 상위컴포넌트로 데이터를 전달

  // loading 상태 - 사용자가 제출버튼을 못 누르도록 처리
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const selectMusic = () => {
    console.log("search music");
    console.log(userInput);
    movePage('/search',  {state : userInput});
  };

  const handleClick = () => {
    console.log(userInput);
    if (!userInput) {
      messageApi.open({
        type: "error",
        content: "일과를 적어주세요.",
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "생성 요청 완료",
    });

    onSubmit(userInput);
    setUserInput(null);
  };
  const {textArea} = useLocation();
  const [text, setText] = useState('');
  // useEffect(() => {
    useEffect(() => {
      if(localStorage.getItem('textData') != null && localStorage.getItem('textData').length > 0){
        setUserInput(localStorage.getItem('textData'));
        localStorage.setItem('textData', '');
      }

      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [text]);

  const captureAndDownload = async () => {
    const nodeToCapture = document.getElementById("capture");
    console.log(nodeToCapture);
    // HTML2Canvas를 사용하여 노드의 스크린샷을 생성합니다.
    html2canvas(nodeToCapture, {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      // 스크린샷을 이미지로 변환합니다.
      const image = canvas.toDataURL("image/png");

      // 이미지를 다운로드할 수 있는 링크를 생성합니다.
      const a = document.createElement("a");
      a.href = image;
      a.download = "gpt-diary-result.png";
      a.click();
      history.back();
    });

    // // HTML 요소를 가져옵니다.
    // const elementToCapture = document.getElementById("capture");
    // const { cropPositionTop, cropPositionLeft, cropWidth, cropHeigth } = {
    //   cropPositionTop: 0,
    //   cropPositionLeft: 0,
    //   cropWidth: elementToCapture.offsetWidth,
    //   cropHeigth: elementToCapture.offsetHeight,
    // };

    // html2canvas(elementToCapture).then((canvas) => {
    //   let croppedCanvas = document.createElement("canvas");
    //   let croppedCanvasContext = croppedCanvas.getContext("2d");

    //   croppedCanvas.width = cropWidth;
    //   croppedCanvas.height = cropHeigth;

    //   croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);

    //   const a = document.createElement("a");
    //   a.href = croppedCanvas.toDataURL();
    //   a.download = "receipt.png";
    //   a.click();
    // });
  };

  /*
  안녕하세요. 저에겐 사귄지 3년쯤된 여친이 있는데요. 
  나이는 저랑 동갑이예요. 귀엽고 싹싹하고 다 좋은데 뭐가 문제냐면 저를 자꾸 때려요. 
  말하다가 장난하듯이 툭 때리는거 있잖아요. 저는 그게 너무 싫고 짜증나요. 
  솔직히 맞아서 기분 좋은 사람 있나요? 
  제가 몇번 싫다고 진지하게 그러지 말라고 얘길 했는데 여친은 저한테 되려 짜증을 내면서 장난으로 몇대 때린걸 가지고 남자가 뭘그리 난리치냐고 해요. 
  하! 나참. 이게 말이 되나요. 맞은 사람이 싫다는데 그만 해야 되는거 아닌가요. 
  얘가 또 손이 매워가지고 웃긴다고 제 어깨를 때리면 진짜로 찰싹 소리가 나게 때려요. 
  하아.... 이 애를 진짜 어쩌면 좋죠? 어떻게 하면 저를 못 때리게 할까요?

  */

  return (
    <div>
      <Title>{moment(selDate).format('MM.DD')} 오늘의 일</Title>
      
      <TextArea className="textArea"
        value={userInput}
        onChange={handleUserInput}
        placeholder="오늘 일어난 일들을 간단히 적어주세요."
        style={{ height: "200px" }}
      />
      
      <ButtonContainer>
        <Button className="yellowBtn" onClick={selectMusic}>노래 선택</Button>
        <Button className="darkYellowBtn" loading={isLoading} onClick={handleClick}>GPT 회고록을 작성해줘!</Button>
        <Button className="saveBtn" disabled={disabeld} loading={isLoading} onClick={captureAndDownload}>저장 </Button>
      </ButtonContainer>
      
      <canvas id="canvas" style={{ display: "none" }}></canvas>
    </div>
  );
};

export default DiaryInput;

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 5px;
  margin-right: 0;
`;
