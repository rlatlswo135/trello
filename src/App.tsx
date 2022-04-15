import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {DragDropContext,Draggable,Droppable,resetServerContext,DropResult} from 'react-beautiful-dnd'
import styled from 'styled-components'
import { useEffect } from 'react';
import {useRecoilState} from 'recoil'
import {toDoState} from './atoms/index'
import Boards from './Components/Boards'
//react-beautiful-dnd 아름다운 drag-drop을 만들게 도와주는 라이브러리
const Container = styled.div`
  width:100vw;
  height:100vh;
  background-color: ${props => props.theme.bgColor};
`
const Wrapper = styled.div`
  display:flex;
  width:100vw;
  margin:0 auto;
  padding: 0% 10%;
  justify-content: space-evenly;
  align-items: center;
  height:100vh;
`



function App() {
  const [toDos , setToDos] = useRecoilState(toDoState)
  function onDragEnd(args:DropResult){
    //ctrl해서 보면 인자의 타입을 알수있지
    //인자에 드래그된 애가 어떤애인지 정보가 딱온다;;;;; => 출발지:도착지까지 다나옴
    // 그걸 이용해 setAtom을 해야하는덧
    const {destination,source,draggableId} = args
    //타이틀이 같은 보드 내에서 움직일경우
    if(!destination) return;
    if(source.droppableId === destination?.droppableId){
      setToDos((oldState) => {
        //obj안에 배열을 수정할때 obj만 카피해서 그안에 배열을 직접 수정하려했는데 한꺼번에 카피가안되나봄 -> 그래서 그안에있는 배열만 카피해서 obj로 합치니까됨
        // 혹시 JSON으로 카피해서 해도 그럴려나?
        let copyState = [...oldState[source.droppableId]]
        copyState.splice(source.index,1)
        copyState.splice(destination.index,0,draggableId)
        return {
          ...oldState
          ,
          [source.droppableId]:copyState
        }
        })
      }
    //타이틀이 다른 보드내에서 움직일 경우
    if(source.droppableId !== destination?.droppableId){
      // JSON으로 카피하면 obj안에 있는 배열까지 완전하게 카피가되서 오류가 발생안하는 모오습
      setToDos((oldState) => {
        let copyState = JSON.parse(JSON.stringify(oldState))
        let {droppableId:DesID,index:DesIndex} = destination
        copyState[source.droppableId].splice(source.index,1)
        copyState[DesID].splice(DesIndex,0,draggableId)
        return copyState
      })
    }
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          {
            Object.keys(toDos).map(title => {
              return(
                <Boards key={title} id={title} todos={toDos[title]}/>
                // todos를 props로 넘겨주는부분에서 error가 났는데 => atom의 default의 인터페이스 처리때문에 그럼
              )
            })
          }
        </Wrapper>
      </DragDropContext>
    </Container>
  );
}

export default App;
