import React from 'react';
import {descriptions, price} from '../data/la-terraza.js';
export default function MenuPage({page,pageIndex,onDish}){
 return <div className="page" data-density="soft">
  <h2>{page[0]}</h2><div className="sub">{page[1]}</div>
  {page[2].map((name,i)=><button className="item" key={name} onClick={(e)=>{e.stopPropagation();onDish({name,price:price(pageIndex,i)})}}><span className="thumb"/><span><span className="nm">{name}</span><span className="ds">{descriptions[(pageIndex+i)%4]}</span></span><span className="price">€{price(pageIndex,i)}</span></button>)}
  <div className="pg">{pageIndex+1} / 4</div>
 </div>
}
