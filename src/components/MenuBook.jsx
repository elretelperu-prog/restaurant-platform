import React,{useEffect,useRef,useState} from 'react';
import {PageFlip} from 'page-flip';
import MenuPage from './MenuPage.jsx';
import {pages} from '../data/la-terraza.js';

export default function MenuBook({onDish}){
 const bookRef=useRef(null), wrapRef=useRef(null), viewportRef=useRef(null);
 const [zoomed,setZoomed]=useState(false);

 useEffect(()=>{
  const book=bookRef.current,wrap=wrapRef.current,viewport=viewportRef.current;
  const w=Math.max(150,Math.floor(wrap.clientWidth/2));
  const h=Math.max(480,Math.floor(wrap.clientHeight));
  const pf=new PageFlip(book,{width:w,height:h,size:'stretch',minWidth:145,maxWidth:270,minHeight:480,maxHeight:760,showCover:false,usePortrait:false,drawShadow:true,maxShadowOpacity:.55,flippingTime:700,mobileScrollSupport:false,useMouseEvents:true,disableFlipByClick:true,clickEventForward:true,startPage:0,autoSize:true,showPageCorners:false});

  let timers=[],raf=0,token=0,idle=false,scale=1,lastScale=1,startDistance=0,startX=0,startY=0,panX=0,panY=0,lastPanX=0,lastPanY=0,panning=false,pinching=false;
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];cancelAnimationFrame(raf)};
  const isBack=()=>pf.getCurrentPageIndex()>=2;
  const pos=(depth,drop=0)=>{const r=pf.getBoundsRect(),back=isBack();return{x:back?r.left+depth:r.left+r.pageWidth*2-depth,y:r.top+depth+drop}};
  const hold=(depth=48,drop=0)=>{try{pf.getFlipController().fold(pos(depth,drop));idle=true}catch(e){}};
  const animate=(a,b,c,d,duration,done)=>{const started=performance.now(),my=token;const tick=now=>{if(my!==token)return;const t=Math.min(1,(now-started)/duration),e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;hold(a+(b-a)*e,c+(d-c)*e);if(t<1)raf=requestAnimationFrame(tick);else done?.()};raf=requestAnimationFrame(tick)};
  const pulse=()=>{const my=token;animate(48,68,0,20,210,()=>{if(my!==token)return;animate(68,48,20,0,240,()=>hold(48,0))})};
  const startIdle=()=>{token++;clearTimers();const my=token;timers.push(setTimeout(()=>{if(my!==token||scale>1.01)return;hold(48);pulse()},180));timers.push(setTimeout(()=>{if(my!==token||scale>1.01)return;pulse()},3180))};
  const stopIdle=()=>{token++;clearTimers();idle=false;try{pf.getFlipController().stopMove()}catch(e){}};

  const applyTransform=()=>{
   const maxX=Math.max(0,(viewport.clientWidth*(scale-1))/2+80);
   const maxY=Math.max(0,(viewport.clientHeight*(scale-1))/2+120);
   panX=Math.max(-maxX,Math.min(maxX,panX));panY=Math.max(-maxY,Math.min(maxY,panY));
   wrap.style.transform=`translate3d(${panX}px,${panY}px,0) scale(${scale})`;
   setZoomed(scale>1.01);
  };
  const dist=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);

  const onTouchStart=e=>{
   if(e.touches.length===2){pinching=true;panning=false;stopIdle();startDistance=dist(e.touches);lastScale=scale;e.preventDefault();return}
   if(scale>1.01&&e.touches.length===1){panning=true;startX=e.touches[0].clientX;startY=e.touches[0].clientY;lastPanX=panX;lastPanY=panY;e.preventDefault()}
  };
  const onTouchMove=e=>{
   if(pinching&&e.touches.length===2){scale=Math.max(1,Math.min(3,lastScale*dist(e.touches)/startDistance));applyTransform();e.preventDefault();return}
   if(panning&&e.touches.length===1){panX=lastPanX+e.touches[0].clientX-startX;panY=lastPanY+e.touches[0].clientY-startY;applyTransform();e.preventDefault()}
  };
  const onTouchEnd=e=>{
   if(e.touches.length<2)pinching=false;
   if(e.touches.length===0)panning=false;
   if(scale<=1.03){scale=1;panX=0;panY=0;applyTransform();startIdle()}
  };

  pf.on('init',startIdle);pf.on('flip',startIdle);
  viewport.addEventListener('touchstart',onTouchStart,{passive:false});
  viewport.addEventListener('touchmove',onTouchMove,{passive:false});
  viewport.addEventListener('touchend',onTouchEnd,{passive:false});
  viewport.addEventListener('touchcancel',onTouchEnd,{passive:false});
  pf.loadFromHTML(book.querySelectorAll('.page'));

  return()=>{token++;clearTimers();viewport.removeEventListener('touchstart',onTouchStart);viewport.removeEventListener('touchmove',onTouchMove);viewport.removeEventListener('touchend',onTouchEnd);viewport.removeEventListener('touchcancel',onTouchEnd);pf.destroy()};
 },[]);

 return <section className={'stage '+(zoomed?'isZoomed':'')} ref={viewportRef}>
  <div className="bookWrap" ref={wrapRef}>
   <div ref={bookRef} className="book">{pages.map((p,i)=><MenuPage key={i} page={p} pageIndex={i} onDish={onDish}/>)}</div>
  </div>
 </section>
}
