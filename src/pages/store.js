import {configureStore, createSlice } from "@reduxjs/toolkit";

// user state
const user =createSlice({ //createSlice : state 생성 메서드
    name: 'user',
    //initialState:'홍길동',
    initialState: {name: '홍길동', memberYear: 1},

    reducers : { //reducers : 객체나 배열은 return을 돌릴필요가 없다
        /* changeName() {
            return '이순신'
        } */
        /* changeName(state) {
            return state + ' : Green'
        } */
        changeName(state){
            state.name = state.name + ' : Green'
        },
        changeYear(state, action) {
            state.memberYear += action.payload
        }
    } //reducers
    
}) // createSlice

export const {changeName, changeYear} = user.actions //user의 변경함수


//cart_state 생성
//서브,디테일페이지 어디서 누르든 상태변경관리가 되도록 
//장바구니를 눌렀을때 카트컴포넌트에 추가된 데이터들이 store가 데이터를 상태관리함
const cart = createSlice({
    name: 'cart',
    initialState: [], //초기값없음, 사용자가 추가해야지 store에 데이터가 생기고, 장바구니에 추가했을때 상태변경 함수가 필요(reducers), 같은 항목을 추가했을 때 카운터만 올라가야하고, 받는 data도 여러개이므로 장바구니항목은 배열로 관리할수밖에 없다
    reducers: {
        addItem(state, action) { //action은 다른이름 사용가능
            //state.push(action.payload) //사용자가 누른 그것(action.payload)을 장바구니에 push하겠다, action.payload->정보

            //두개가 일치하는 인덱스를 찾고, 그 인덱스 값에 해당하는 걸 카운터 올려줌
            const index = state.findIndex((findId) => {return findId.id === action.payload.id}) //내가가지고 있는 아이디와 사용자가 누른 항목의 아이디가 같다면 트루를 넘기고, 그것의 index번호를 findIndex가 찾아서 같은 index번호에 넣어줌 -> 일치하면 1을 받고, 일치하지않다면 -1을 받게됨
            if(index > -1) { //-1보다 크다는것은 일치했다는 뜻(인덱스값 0,1,2,3...)
                state[index].count++
            } else { //일치하지않다면 존재하지않는 인덱스값이므로 그 인덱스를 push해주라는 뜻
                state.push(action.payload)
            }
        }, //addItem, id,title,count 세개의 data를 받는것 이 세개중 id를 뽑아내서 비교하는것

        deleteItem(state, action) {
            const index = state.findIndex((findId) => {return findId.id === action.payload}) 
            state.splice(index, 1)
        }, //deleteItem, 클릭한 버튼의 id만 전송해줘서 받는 것 자체가 id이기때문에 payload뒤에 id를 붙이면 안됨

        addCount(state, action) {
            const index = state.findIndex((findId) => {return findId.id === action.payload})
            state[index].count++
        },

        subCount(state, action) {
            const index = state.findIndex((findId) => {return findId.id === action.payload})
            if(state[index].count > 1) state[index].count--
        }//수량이 -(마이너스)가 되면 안되므로, if문으로 조건을 건다
    }
})

//addItem도 내보내야 사용가능, 상태변경 세터
export const { addItem, deleteItem, addCount, subCount } = cart.actions


export default configureStore({ //내보내기도 객체로 내보내야함
    reducer: {
        user: user.reducer,
        cart: cart.reducer 
    }
})