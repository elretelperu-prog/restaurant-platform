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

  const timers=[];
  let sequence=0;
  const later=()=>pf.getCurrentPageIndex()>=2;
  const point=(depth=2)=>{
   const r=pf.getBoundsRect();
   const back=later();
   return {
    x:back ? r.left+depth : r.left+(r.pageWidth*2)-depth,
    y:r.top+depth
   };
  };
  const nativeCorner=(depth=2)=>{
   const c=pf.getFlipController();
   c.showCorner(point(depth));
  };
  const pulse=()=>{
   const c=pf.getFlipController();
   if(c.getState()!=='fold_corner'&&c.getState()!=='read') return;
   const r=pf.getBoundsRect();
   const depth=Math.min(72,r.pageWidth*.27);
   nativeCorner(depth);
   // Return to the persistent resting curl; never let the hint disappear.
   timers.push(setTimeout(()=>nativeCorner(2),260));
   timers.push(setTimeout(()=>nativeCorner(2),360));
  };
  const scheduleHints=()=>{
   sequence++;
   const my=sequence;
   timers.splice(0).forEach(clearTimeout);
   // Native curl appears first. A tiny downward/inward nudge happens once,
   // then exactly one reminder pulse 3 seconds later.
   timers.push(setTimeout(()=>{if(my!==sequence)return;nativeCorner(2);},180));
   timers.push(setTimeout(()=>{if(my!==sequence)return;pulse();},420));
   timers.push(setTimeout(()=>{if(my!==sequence)return;pulse();},3420));
   timers.push(setTimeout(()=>{if(my!==sequence)return;nativeCorner(2);},3900));
  };

  pf.on('init',scheduleHints);
  pf.on('flip',scheduleHints);
  pf.on('changeState',e=>{
   if(e.data==='read'){
    // Do not restart the 3-second reminder after our own fold-corner animation.
    return;
   }
   if(e.data==='user_fold'||e.data==='flipping'){
    sequence++;
    timers.splice(0).forEach(clearTimeout);
   }
  });

  pf.loadFromHTML(book.querySelectorAll('.page'));
  return()=>{sequence++;timers.splice(0).forEach(clearTimeout);pf.destroy();};
 },[]);

 return <section className="stage">
  <div className="bookWrap" ref={wrapRef}>
   <div ref={bookRef} className="book">{pages.map((p,i)=><MenuPage key={i} page={p} pageIndex={i} onDish={onDish}/>)}</div>
  </div>
 </section>
}
