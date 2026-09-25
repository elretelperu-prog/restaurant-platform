import React from 'react';
import {descriptions, price, dishImages} from '../data/la-terraza.js';
export default function MenuPage({page,pageIndex,onDish}){
 return <div className="page" data-density="soft">
  <h2>{page[0]}</h2><div className="sub">{page[1]}</div>
  {page[2].map((name,i)=><button className="item" key={name} onClick={(e)=>{e.stopPropagation();const r=e.currentTarget.getBoundingClientRect();onDish({name,price:price(pageIndex,i),x:r.left+r.width/2,y:r.top+r.height/2})}}><svg className="item-integrated-outline" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path className="row-top" d="M 10 2 H 960"/><path d="M 960 2 Q 990 2 990 20 Q 990 33 967 35 Q 948 36 936 36 H 852 Q 837 36 826 45 L 810 50 L 826 55 Q 837 64 852 64 H 936 Q 948 64 967 65 Q 990 67 990 80 V 98 H 10 Q 2 98 2 90 V 10 Q 2 2 10 2"/><circle cx="810" cy="50" r="3.5"/></svg><span className="thumb" style={{backgroundImage:`url("${dishImages[name]}")`}}/><span><span className="nm">{name}</span><span className="ds">{descriptions[(pageIndex+i)%4]}</span></span><span className="price-connector"><span className="price">S/ {price(pageIndex,i)}</span></span></button>)}
  <div className="pg">{pageIndex+1} / 4</div>
 </div>
}