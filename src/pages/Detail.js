import React from 'react'
import {useParams} from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addItem } from './store'

export default function Detail(props) {

    const {bests} = props
    const {id} = useParams()
    const dispatch = useDispatch()

  return (
    <div>
        <h2>Detail_page</h2>
        <img src={bests[id].image} alt='' style={{width:500}}/>
        <h4>{bests[id].title}</h4>
        <p>{bests[id].price}</p>
        <button onClick={() => {
          dispatch(addItem({id: bests[id].id, title:bests[id].title, count:1}))
        }}>장바구니</button>
    </div>
  )
}
