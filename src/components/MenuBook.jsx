import React,{useEffect,useRef,useState} from 'react';
import {PageFlip} from 'page-flip';
import MenuPage from './MenuPage.jsx';
import CornerFold from './CornerFold.jsx';
import {pages} from '../data/la-terraza.js';

export default function MenuBook({onDish}){
 const bookRef=useRef(null), wrapRef=useRef(null);
 const [later,setLater]=useState(false);
 const [flipping,setFlipping]=useState(false);

 useEffect(()=>{
  const book=bookRef.current,wrap=wrapRef.current;
  const w=Math.max(150,Math.floor(wrap.clientWidth/2));
  const h=Math.max(480,Math.floor(wrap.clientHeight));
  const pf=new PageFlip(book,{width:w,height:h,size:'stretch',minWidth:145,maxWidth:270,minHeight:480,maxHeight:760,showCover:false,usePortrait:false,drawShadow:true,maxShadowOpacity:.55,flippingTime:700,mobileScrollSupport:false,useMouseEvents:true,disableFlipByClick:true,clickEventForward:true,startPage:0,autoSize:true});
  pf.loadFromHTML(book.querySelectorAll('.page'));
  pf.on('flip',e=>setLater(Number(e.data)>=2));
  pf.on('changeState',e=>setFlipping(e.data==='flipping'));
  return()=>pf.destroy();
 },[]);

 return <section className="stage">
  <div className="bookWrap" ref={wrapRef}>
   <div ref={bookRef} className="book">{pages.map((p,i)=><MenuPage key={i} page={p} pageIndex={i} onDish={onDish}/>)}</div>
   <CornerFold side="left" hidden={!later} flipping={flipping}/>
   <CornerFold side="right" flipping={flipping}/>
  </div>
 </section>
}
