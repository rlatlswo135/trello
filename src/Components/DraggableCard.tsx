import React from 'react';
import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'
const Card = styled.div<{isDragging:boolean}>`
  padding:10px;
  /* 패딩을 퍼센트로 주면 카드가 셀렉트시 커지는데 그 패딩이 적용되니 px로 고정시켜야함 */
  border-radius: 10px;
  background-color: ${props=>props.isDragging?'rgba(255,255,155,0.8)':props.theme.cardColor};
  margin-bottom: 3%;
`
interface IProps {
    todo:string,
    index:number
}
const DraggableCard = ({todo,index}:IProps) => {
  //react.. 부모state가 바뀌면 어쨋든 자식컴포넌트들 전부다 렌더링되자너
  console.log('render count')

    return (
        <Draggable draggableId={todo} index={index}>
            {(magic,snapshot) => (
            <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}>
            {todo}
            </Card>)}
      </Draggable>
    );
};

// 이 React.memo를 써주면 props가 변한 컴포넌트만 재렌더해준다. 규모가 큰 프로젝트에선 잘 사용하진않지만. 규모가작고 정확히 props의 변화를 볼수있는 애들한테는
// 쓰는게 좋을듯

export default React.memo(DraggableCard);