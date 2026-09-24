import React from 'react';
import {descriptions, price, dishImages} from '../data/la-terraza.js';
export default function MenuPage({page,pageIndex,onDish}){
 return <div className="page" data-density="soft">
  <h2>{page[0]}</h2><div className="sub">{page[1]}</div>
  {page[2].map((name,i)=><button className="item" key={name} onClick={(e)=>{e.stopPropagation();const r=e.currentTarget.getBoundingClientRect();onDish({name,price:price(pageIndex,i),x:r.left+r.width/2,y:r.top+r.height/2})}}><span className="thumb" style={{backgroundImage:`url("${dishImages[name]}")`}}/><span><span className="nm">{name}</span><span className="ds">{descriptions[(pageIndex+i)%4]}</span></span><span className="price">S/ {price(pageIndex,i)}</span></button>)}
  <div className="pg">{pageIndex+1} / 4</div>
 </div>
}