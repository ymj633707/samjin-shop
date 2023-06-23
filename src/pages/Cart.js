import React from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch  } from 'react-redux'
import { changeName, changeYear, deleteItem, addCount, subCount} from './store'


export default function Cart() {

    //const state = useSelector((state) => {return state}) : store에 있는 state를 가져오는 hook
    const state =useSelector((state) => state) 
    // 모든스테이트를 다 가져올때는 좌측처럼 내가원하는 state를 가져오고싶은 경우에는 ((state) => state.user) 이런식으로 사용한다. state를 가져오는 공식

    const dispatch = useDispatch() //useDispatch :state 값을 변경하는 것

  return (
    <div>
        <h2><span style={{color: 'blue', fontWeight:'bold'}}>({state.user.name})</span>님의 장바구니</h2> {/* state 중에서 user state를 가져오겠다는 뜻. 단순값을 가져올땐 좌측처럼 씀 */}
        <button onClick={()=>dispatch(changeName())}>닉네임보이기</button> {/* dispatch를 적고 변경할 함수를 불러주면됨 */}
        <h3>회원가입기간: {state.user.memberYear} 년</h3>
        <button onClick={ () =>dispatch(changeYear(1))}>+</button>
        <button onClick={ () =>dispatch(changeYear(-1))}>-</button>

        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>개수</th>
          <th>변경</th>
        </tr>
      </thead>
      <tbody>
        {
          state.cart.map((item, i) => {
            return(
              <tr key={i}>
                <td>{state.cart[i].id}</td> {/* store에 배열로 데이터를 만들어놨기때문에 cart에서 store에 있는 data를 끌어다 써야할 때 배열로 받아줘야함 */}
                <td>{state.cart[i].title}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button onClick = {() => dispatch(addCount(state.cart[i].id))}>+</button>
                  <button onClick = {() => dispatch(subCount(state.cart[i].id))}>-</button>
                  <button onClick={() => dispatch(deleteItem(state.cart[i].id))}>삭제</button> {/* import에 추가됐는지 확인할것, onClick이벤트를 열때 화살표함수를 안넣고 dispatch를 할 경우 오류로 인해 실행되지않는다 */}
                </td>
              </tr>
            )
          })
        }
        
      </tbody>
    </Table>
    </div>
  )
}
