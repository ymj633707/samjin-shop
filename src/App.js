import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './pages/productData'
import About from './pages/About'
import Detail from './pages/Detail'
import Cart from './pages/Cart'

import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './pages/store'



function App() {

  const navigate = useNavigate()
  const [bests] = useState(data) //데이터로 받아서 bests 배열로 쓰겠다는 뜻
  const state = useSelector((state) => state)
  const dispatch = useDispatch() //상태변경관리를 호출(actions)

  return (
    <div className="App">
     
     <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => {navigate('/')}}>Samjin_Shop</Navbar.Brand> 
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about/info')}}>Information</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>

        <Route path='/' element={

          <Container>
            <img src={process.env.PUBLIC_URL + './images/visual_main_01.jpg' } alt='visual_main' style={{width:1240, height:'auto', margin:'0 auto', marginBottom:50 }}/>
            <h2>Best 상품</h2>
            <Row>
              {
                bests.map((best, index) => {
                  return (
                    <Col key={index}>
                      <Link to={`detail/${index}`} style={{textDecoration:'none', color: 'black'}}>
                        <img src={best.image} alt='product_img' style={{width:280}} />
                        <h4>{best.title}</h4>
                        <p>{best.desc}</p>
                        <p>{best.price}</p>
                      </Link>
                      <button onClick={()=>{
                        dispatch(addItem({id: best.id, title: best.title, count:1}))
                      }}>장바구니</button> {/* 버튼을 클릭하게되면 항목을 장바구니에 추가, onClick했을 때 항목추가할 상태변경addItem호출, 객체형태로 항목 호출 */}
                    </Col>
                  )
                })
              }
              
                
            </Row>
          </Container>

        } />

        <Route path='about' element={<About />}> 
          <Route path='info' element={<div>Information</div>} />
          <Route path='loca' element={<div>Location</div>} />
        </Route>
        <Route path='detail/:id' element={<Detail  bests={bests}/>} />
        <Route path='cart' element={<Cart/>} />

      </Routes>

    </div>
  );
}

export default App;
