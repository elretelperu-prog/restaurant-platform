import React,{useEffect,useRef,useState} from 'react';
import {PageFlip} from 'page-flip';
import MenuPage from './MenuPage.jsx';
import {pages} from '../data/la-terraza.js';

export default function MenuBook({onDish}){
 const bookRef=useRef(null),wrapRef=useRef(null),viewportRef=useRef(null);
 const [zoomed,setZoomed]=useState(false);

 useEffect(()=>{
  const book=bookRef.current,wrap=wrapRef.current,viewport=viewportRef.current;
  const w=Math.max(150,Math.floor(wrap.clientWidth/2)),h=Math.max(480,Math.floor(wrap.clientHeight));
  const pf=new PageFlip(book,{width:w,height:h,size:'stretch',minWidth:145,maxWidth:270,minHeight:480,maxHeight:760,showCover:false,usePortrait:false,drawShadow:true,maxShadowOpacity:.55,flippingTime:700,mobileScrollSupport:false,useMouseEvents:true,disableFlipByClick:true,clickEventForward:true,startPage:0,autoSize:true,showPageCorners:false});

  let timers=[],raf=0,token=0,scale=1,baseScale=1,pinchDist=0,panX=0,panY=0,panStartX=0,panStartY=0,basePanX=0,basePanY=0,mode='normal',moved=false;
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];cancelAnimationFrame(raf)};
  const isBack=()=>pf.getCurrentPageIndex()>=2;
  const foldPos=(depth,drop=0)=>{const r=pf.getBoundsRect(),back=isBack();return{x:back?r.left+depth:r.left+r.pageWidth*2-depth,y:r.top+depth+drop}};
  const hold=(depth=48,drop=0)=>{try{pf.getFlipController().fold(foldPos(depth,drop))}catch(e){}};
  const animate=(a,b,c,d,ms,done)=>{const st=performance.now(),my=token;const tick=n=>{if(my!==token)return;const t=Math.min(1,(n-st)/ms),q=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;hold(a+(b-a)*q,c+(d-c)*q);if(t<1)raf=requestAnimationFrame(tick);else done?.()};raf=requestAnimationFrame(tick)};
  const pulse=()=>{const my=token;animate(48,68,0,20,210,()=>{if(my!==token)return;animate(68,48,20,0,240,()=>hold())})};
  const startIdle=()=>{if(mode!=='normal')return;token++;clearTimers();const my=token;timers.push(setTimeout(()=>{if(my!==token)return;hold();pulse()},180));timers.push(setTimeout(()=>{if(my!==token)return;pulse()},3180))};
  const stopIdle=()=>{token++;clearTimers();try{pf.getFlipController().stopMove()}catch(e){}};
  const distance=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
  const transform=()=>{
   const maxX=Math.max(0,(viewport.clientWidth*(scale-1))/2+viewport.clientWidth*.45);
   const maxY=Math.max(0,(viewport.clientHeight*(scale-1))/2+viewport.clientHeight*.45);
   panX=Math.max(-maxX,Math.min(maxX,panX));panY=Math.max(-maxY,Math.min(maxY,panY));
   wrap.style.transform=`translate3d(${panX}px,${panY}px,0) scale(${scale})`;
   const z=scale>1.05;setZoomed(z);book.classList.toggle('reading-mode',z);
  };
  const enterReading=()=>{if(mode==='reading')return;mode='reading';stopIdle();book.style.pointerEvents='auto'};
  const exitReading=()=>{mode='normal';scale=1;panX=0;panY=0;transform();startIdle()};

  const down=e=>{
   if(e.touches.length===2){
    enterReading();mode='pinch';pinchDist=distance(e.touches);baseScale=scale;moved=true;
    e.preventDefault();e.stopImmediatePropagation();return;
   }
   if(scale>1.05&&e.touches.length===1){
    mode='pan';moved=false;panStartX=e.touches[0].clientX;panStartY=e.touches[0].clientY;basePanX=panX;basePanY=panY;
    e.stopImmediatePropagation();
   }
  };
  const move=e=>{
   if(mode==='pinch'&&e.touches.length===2){
    scale=Math.max(1,Math.min(3,baseScale*distance(e.touches)/pinchDist));transform();e.preventDefault();e.stopImmediatePropagation();return;
   }
   if(mode==='pan'&&e.touches.length===1){
    const dx=e.touches[0].clientX-panStartX,dy=e.touches[0].clientY-panStartY;
    if(Math.hypot(dx,dy)>5)moved=true;
    panX=basePanX+dx;panY=basePanY+dy;transform();e.preventDefault();e.stopImmediatePropagation();
   }
  };
  const end=e=>{
   if(mode==='pinch'&&e.touches.length<2){
    if(scale<=1.05)exitReading();else mode='reading';
    e.preventDefault();e.stopImmediatePropagation();return;
   }
   if(mode==='pan'&&e.touches.length===0){
    mode='reading';e.stopImmediatePropagation();
   }
  };

  // Capture phase: zoom/pan wins before StPageFlip can interpret the same gesture.
  viewport.addEventListener('touchstart',down,{passive:false,capture:true});
  viewport.addEventListener('touchmove',move,{passive:false,capture:true});
  viewport.addEventListener('touchend',end,{passive:false,capture:true});
  viewport.addEventListener('touchcancel',end,{passive:false,capture:true});
  pf.on('init',startIdle);pf.on('flip',startIdle);
  pf.loadFromHTML(book.querySelectorAll('.page'));

  return()=>{token++;clearTimers();viewport.removeEventListener('touchstart',down,true);viewport.removeEventListener('touchmove',move,true);viewport.removeEventListener('touchend',end,true);viewport.removeEventListener('touchcancel',end,true);pf.destroy()};
 },[]);

 const selectDish=d=>onDish(d);
 return <section className={'stage '+(zoomed?'isZoomed':'')} ref={viewportRef}>
  <div className="bookWrap" ref={wrapRef}>
   <div ref={bookRef} className="book">{pages.map((p,i)=><MenuPage key={i} page={p} pageIndex={i} onDish={selectDish}/>)}</div>
  </div>
 </section>
}
