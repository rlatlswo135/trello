import {atom,selector} from 'recoil'

interface IToDoState{
    [key:string]:string[];
    //이렇게 단순히 key:string[]구조라고 선언해준거 타입을
}

export  const toDoState = atom<IToDoState>({
    key:"toDo",
    default:{
        To_Do : ['a','b','c','d','e','f'],
        Doing:[],
        Done:[]
    }
    // IToDoState의 타입이 없게되면 타입스크립트는 toDoState의 키가 항상 위의3개로 정해져있고 다른거는 못넣는다고 정해놓는다.
    // 그래서 인터페이스를 주고 단지 default의 값은 key:string[] 구조라는것을 알려준거다
})