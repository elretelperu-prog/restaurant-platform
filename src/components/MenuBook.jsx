import React,{useEffect,useRef,useState} from 'react';
import {PageFlip} from 'page-flip';
import MenuPage from './MenuPage.jsx';
import {pages} from '../data/la-terraza.js';

export default function MenuBook({onDish,popupOpen=false}){
 const bookRef=useRef(null),wrapRef=useRef(null),viewportRef=useRef(null),restoreFoldRef=useRef(null),hadPopupRef=useRef(false);
 const [zoomed,setZoomed]=useState(false);

 useEffect(()=>{
  const book=bookRef.current,wrap=wrapRef.current,viewport=viewportRef.current;
  const w=Math.max(150,Math.floor(wrap.clientWidth/2)),h=Math.max(480,Math.floor(wrap.clientHeight));
  const pf=new PageFlip(book,{width:w,height:h,size:'stretch',minWidth:145,maxWidth:270,minHeight:480,maxHeight:760,showCover:false,usePortrait:false,drawShadow:true,maxShadowOpacity:.55,flippingTime:700,mobileScrollSupport:false,useMouseEvents:true,disableFlipByClick:true,clickEventForward:true,startPage:0,autoSize:true,showPageCorners:false});

  let timers=[],raf=0,token=0,scale=1,baseScale=1,pinchDist=0,panX=0,panY=0,panStartX=0,panStartY=0,basePanX=0,basePanY=0,mode='normal',moved=false,tappedDish=null,gestureShield=false;
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];cancelAnimationFrame(raf)};
  const isBack=()=>pf.getCurrentPageIndex()>=2;
  const foldPos=(depth,drop=0)=>{const r=pf.getBoundsRect(),back=isBack();return{x:back?r.left+depth:r.left+r.pageWidth*2-depth,y:r.top+depth+drop}};
  const hold=(depth=48,drop=0)=>{try{pf.getFlipController().fold(foldPos(depth,drop))}catch(e){}};
  const animate=(a,b,c,d,ms,done)=>{const st=performance.now(),my=token;const tick=n=>{if(my!==token)return;const t=Math.min(1,(n-st)/ms),q=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;hold(a+(b-a)*q,c+(d-c)*q);if(t<1)raf=requestAnimationFrame(tick);else done?.()};raf=requestAnimationFrame(tick)};
  const pulse=()=>{const my=token;animate(48,68,0,20,210,()=>{if(my!==token)return;animate(68,48,20,0,240,()=>hold())})};
  const startIdle=()=>{if(mode!=='normal')return;token++;clearTimers();const my=token;timers.push(setTimeout(()=>{if(my!==token)return;hold();pulse()},180));timers.push(setTimeout(()=>{if(my!==token)return;pulse()},3180))};
  const stopIdle=()=>{token++;clearTimers();try{pf.getFlipController().stopMove()}catch(e){}};
  const restoreFold=()=>{if(mode==='normal')startIdle();else if(mode==='reading')requestAnimationFrame(()=>hold());};
  restoreFoldRef.current=restoreFold;
  const distance=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
  const transform=()=>{
   /* V8.8: clamp pan to the scaled book itself, so dragging can never reveal
      the dark stage behind the menu. */
   const baseW=Math.min(wrap.offsetWidth,viewport.clientWidth);
   const baseH=Math.min(wrap.offsetHeight,viewport.clientHeight);
   const maxX=Math.max(0,(baseW*scale-viewport.clientWidth)/2);
   const maxY=Math.max(0,(baseH*scale-viewport.clientHeight)/2);
   panX=Math.max(-maxX,Math.min(maxX,panX));panY=Math.max(-maxY,Math.min(maxY,panY));
   wrap.style.transform=`translate3d(${panX}px,${panY}px,0) scale(${scale})`;
   const z=scale>1.05;setZoomed(z);book.classList.toggle('reading-mode',z);
  };
  const enterReading=()=>{if(mode==='reading')return;mode='reading';stopIdle();book.style.pointerEvents='auto'};
  const exitReading=()=>{mode='normal';scale=1;panX=0;panY=0;transform();startIdle()};

  const down=e=>{
   if(e.touches.length===1&&scale<=1.05){
    const dish=e.target.closest('.item');
    if(dish){
     tappedDish=dish;moved=false;panStartX=e.touches[0].clientX;panStartY=e.touches[0].clientY;
     // Capture the dish tap before StPageFlip can consume it at normal scale.
     e.stopImmediatePropagation();return;
    }
   }
   if(e.touches.length===2){
    gestureShield=true;enterReading();mode='pinch';pinchDist=distance(e.touches);baseScale=scale;moved=true;
    e.preventDefault();e.stopImmediatePropagation();return;
   }
   if((gestureShield||scale>1.05)&&e.touches.length===1){
    mode='pan';moved=false;tappedDish=e.target.closest('.item');panStartX=e.touches[0].clientX;panStartY=e.touches[0].clientY;basePanX=panX;basePanY=panY;
   }
  };
  const move=e=>{
   if(tappedDish&&mode==='normal'&&e.touches.length===1){
    const dx=e.touches[0].clientX-panStartX,dy=e.touches[0].clientY-panStartY;
    if(Math.hypot(dx,dy)>8){moved=true;tappedDish=null;}
    e.stopImmediatePropagation();return;
   }
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
   if(tappedDish&&mode==='normal'&&e.touches.length===0){
    const dish=tappedDish;tappedDish=null;
    e.preventDefault();e.stopImmediatePropagation();
    if(!moved)dish.click();
    return;
   }
   if(mode==='pinch'&&e.touches.length<2){
    mode=e.touches.length===1?'pan':'reading';
    if(e.touches.length===1){
     panStartX=e.touches[0].clientX;panStartY=e.touches[0].clientY;basePanX=panX;basePanY=panY;moved=true;
    }else if(scale<=1.05){
     gestureShield=false;exitReading();
    }else{
     restoreFold();
    }
    e.preventDefault();e.stopImmediatePropagation();return;
   }
   if(mode==='pan'&&e.touches.length===0){
    const wasMoved=moved,dish=tappedDish;
    mode='reading';tappedDish=null;
    if(scale<=1.05&&gestureShield){gestureShield=false;exitReading();}
    else restoreFold();
    if(wasMoved){e.preventDefault();e.stopImmediatePropagation();}
    else if(dish){
     // StPageFlip can swallow the synthetic click while zoomed, so trigger the row explicitly.
     e.preventDefault();e.stopImmediatePropagation();dish.click();
    }
   }
  };

  // Capture phase: zoom/pan wins before StPageFlip can interpret the same gesture.
  viewport.addEventListener('touchstart',down,{passive:false,capture:true});
  viewport.addEventListener('touchmove',move,{passive:false,capture:true});
  viewport.addEventListener('touchend',end,{passive:false,capture:true});
  viewport.addEventListener('touchcancel',end,{passive:false,capture:true});
  pf.on('init',startIdle);pf.on('flip',startIdle);
  pf.loadFromHTML(book.querySelectorAll('.page'));

  return()=>{restoreFoldRef.current=null;token++;clearTimers();viewport.removeEventListener('touchstart',down,true);viewport.removeEventListener('touchmove',move,true);viewport.removeEventListener('touchend',end,true);viewport.removeEventListener('touchcancel',end,true);pf.destroy()};
 },[]);

 // Repaint the resting curl after Circle + Thread finishes closing.
 // The PageFlip instance is intentionally not recreated when the popup changes.
 useEffect(()=>{
  if(popupOpen){hadPopupRef.current=true;return;}
  if(!hadPopupRef.current)return;
  hadPopupRef.current=false;
  const frame=requestAnimationFrame(()=>restoreFoldRef.current?.());
  return()=>cancelAnimationFrame(frame);
 },[popupOpen]);

 const selectDish=d=>onDish(d);
 return <section className={'stage '+(zoomed?'isZoomed':'')} ref={viewportRef}>
  <div className="bookWrap" ref={wrapRef}>
   <div ref={bookRef} className="book">{pages.map((p,i)=><MenuPage key={i} page={p} pageIndex={i} onDish={selectDish}/>)}</div>
  </div>
 </section>
}
