import React,{useEffect,useRef} from 'react';
import {PageFlip} from 'page-flip';
import MenuPage from './MenuPage.jsx';
import {pages} from '../data/la-terraza.js';

export default function MenuBook({onDish}){
 const bookRef=useRef(null), wrapRef=useRef(null);

 useEffect(()=>{
  const book=bookRef.current,wrap=wrapRef.current;
  const w=Math.max(150,Math.floor(wrap.clientWidth/2));
  const h=Math.max(480,Math.floor(wrap.clientHeight));
  const pf=new PageFlip(book,{width:w,height:h,size:'stretch',minWidth:145,maxWidth:270,minHeight:480,maxHeight:760,showCover:false,usePortrait:false,drawShadow:true,maxShadowOpacity:.55,flippingTime:700,mobileScrollSupport:false,useMouseEvents:true,disableFlipByClick:true,clickEventForward:true,startPage:0,autoSize:true,showPageCorners:true});

  let hintTimer, growTimer;
  const showNativeCorner=()=>{
   clearTimeout(hintTimer);
   clearTimeout(growTimer);
   hintTimer=setTimeout(()=>{
    if(pf.getState()!=='read') return;
    const rect=pf.getBoundsRect();
    const current=pf.getCurrentPageIndex();
    const last=pf.getPageCount()-1;
    // Use StPageFlip's own fold renderer — never a CSS/SVG imitation.
    // First/intermediate spreads hint forward on the upper-right.
    // On the final spread hint backward on the upper-left.
    const atLastSpread=current>=last-1;
    const x=atLastSpread ? rect.left+2 : rect.left+(rect.pageWidth*2)-2;
    const y=rect.top+2;
    const controller=pf.getFlipController();
    controller.showCorner({x,y});
    // V2: keep StPageFlip's native fold, then pull it only a little farther inward.
    // This preserves the exact renderer/shadow/reverse-page effect from V1.
    growTimer=setTimeout(()=>{
     if(controller.getState()!=='fold_corner') return;
     const inset=Math.min(64,rect.pageWidth*.24);
     const gx=atLastSpread ? rect.left+inset : rect.left+(rect.pageWidth*2)-inset;
     const gy=rect.top+inset;
     controller.showCorner({x:gx,y:gy});
    },120);
   },180);
  };

  pf.on('init',showNativeCorner);
  pf.on('flip',showNativeCorner);
  pf.on('changeState',e=>{
   if(e.data==='read') showNativeCorner();
   else {clearTimeout(hintTimer);clearTimeout(growTimer);}
  });

  pf.loadFromHTML(book.querySelectorAll('.page'));
  return()=>{clearTimeout(hintTimer);clearTimeout(growTimer);pf.destroy();};
 },[]);

 return <section className="stage">
  <div className="bookWrap" ref={wrapRef}>
   <div ref={bookRef} className="book">{pages.map((p,i)=><MenuPage key={i} page={p} pageIndex={i} onDish={onDish}/>)}</div>
  </div>
 </section>
}
