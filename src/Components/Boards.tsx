import React from 'react';
import styled from 'styled-components'
import {Droppable} from 'react-beautiful-dnd'
import DraggableCard from './DraggableCard';
import { gray } from 'colors';

const BoardsBox = styled.div`
  width:30%;
  border-radius: 10px;
  background-color: ${props => props.theme.boardColor};
`
const Board = styled.div<{isDraggingOver:boolean}>`
  padding:5% 8%;
  margin-top:5%;
  border-radius: 10px;
  background-color: ${props => props.isDraggingOver ? 'rgba(0,0,0,0.1)' : null};
  min-height: 300px;
  //theme의 타입지정을 styled-compoenets에 있는 DefaultTheme을 커스텀해서 해줘야지 내임의대로 하고싶은 인터페이스를 박으면 동작은되는데 자동완성은안되네;; => why?
`
const BoardTitle = styled.div`
  font-size:1.25em;
  text-align: center;
  padding-top: 2%;
  font-weight: 900;
`
interface IBoardsProps{
  id:string,
  todos:string[]
}
const Boards = ({id,todos}:IBoardsProps) => {
  //ref : react코드를 이용해서 html 요소를 찝을수있는 기능이지 )useRef비슷한가?
    return (
        <BoardsBox>
          <BoardTitle>{id}</BoardTitle>
        <Droppable droppableId={id}>
          {(magic,snapshot) => (
            // snapshot은 해당 보드에서 카드의 위치정보를 나타내는 여러 인스턴스가 있음 isDraggingOver등 => 타입검색 하면 대충유추가능할듯
            <Board
            isDraggingOver={snapshot.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}>
              {
                todos?.map((todo,index) => {
                  return (
                    // beautiful dnd에서 key는 draggableId랑 같아야한다 =>
                    <DraggableCard key={todo} todo={todo} index={index} />)
                  })
                }
              {/* 드롭퍼블 끝난후에 두는 무언가니까. 드롭퍼블 최하단에*/}
                {/* placeholder = droppable이 끝나고 두는 무언가. 그러니 드롭퍼블해도 뭔가가있으니 사이즈 변경이 없겟지? */}
              {magic.placeholder}
            </Board>
          )}
        </Droppable>
        </BoardsBox>
    );
};

export default Boards;