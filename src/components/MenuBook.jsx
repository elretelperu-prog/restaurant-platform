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
  // V41: PageFlip is the only owner of page-turn geometry.
  // Mark the active scene so CSS can isolate the exact visible spread during Safari compositing.
  book.classList.add('single-face-pageflip','v41-pageflip-scene');

  let timers=[],raf=0,token=0,scale=1,baseScale=1,pinchDist=0,panX=0,panY=0,panStartX=0,panStartY=0,basePanX=0,basePanY=0,mode='normal',moved=false,tappedDish=null,gestureShield=false,turnTouch=null;
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
    // Stage 2: leave ordinary one-finger page gestures entirely to StPageFlip.
    // We only remember the touch so a horizontal swipe can be completed if a
    // mobile browser drops PageFlip's internal move/end sequence.
    turnTouch={x:e.touches[0].clientX,y:e.touches[0].clientY,t:performance.now()};
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
   if(turnTouch&&mode==='normal'&&scale<=1.05&&e.touches.length===0){
    const changed=e.changedTouches&&e.changedTouches[0],start=turnTouch;turnTouch=null;
    if(changed){
     const dx=changed.clientX-start.x,dy=changed.clientY-start.y,dt=performance.now()-start.t;
     // Fallback only for a deliberate horizontal swipe. PageFlip normally
     // handles this itself; this covers Safari/Android interrupted gestures.
     if(Math.abs(dx)>=52&&Math.abs(dx)>Math.abs(dy)*1.35&&dt<1400){
      stopIdle();
      try{dx<0?pf.flipNext('top'):pf.flipPrev('top')}catch(err){}
      e.preventDefault();e.stopImmediatePropagation();return;
     }
    }
   }
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
  const syncVisibleSpread=()=>{
   const current=pf.getCurrentPageIndex();
   const left=current%2===0?current:current-1;
   const right=left+1;
   book.querySelectorAll('.page').forEach((page,i)=>{
    const visible=i===left||i===right;
    page.classList.toggle('v41-visible-page',visible);
    page.setAttribute('aria-hidden',visible?'false':'true');
   });
  };
  pf.on('init',()=>{syncVisibleSpread();startIdle()});
  pf.on('flip',()=>{syncVisibleSpread();startIdle()});
  pf.on('changeState',e=>{if(e.data==='flipping'||e.data==='user_fold')stopIdle();else if(e.data==='read')startIdle()});
  pf.loadFromHTML(book.querySelectorAll('.page'));
  requestAnimationFrame(syncVisibleSpread);

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
   <div className="physical-book-cover" aria-hidden="true"><span className="physical-book-pages-left"/><span className="physical-book-pages-right"/></div>\n   <svg className="physical-book-surface-svg" viewBox="0 0 1000 1500" preserveAspectRatio="none" aria-hidden="true">
    <defs>
     <linearGradient id="paperLeft" x1="0" x2="1"><stop offset="0" stopColor="#ead8b9"/><stop offset=".18" stopColor="#fff9e9"/><stop offset=".76" stopColor="#fffbed"/><stop offset="1" stopColor="#8b6042"/></linearGradient>
     <linearGradient id="paperRight" x1="0" x2="1"><stop offset="0" stopColor="#8b6042"/><stop offset=".24" stopColor="#fffbed"/><stop offset=".82" stopColor="#fff9e9"/><stop offset="1" stopColor="#ead8b9"/></linearGradient>
     <linearGradient id="gutter" x1="0" x2="1"><stop offset="0" stopColor="#6a4528" stopOpacity="0"/><stop offset=".5" stopColor="#25140b" stopOpacity=".72"/><stop offset="1" stopColor="#6a4528" stopOpacity="0"/></linearGradient>
    </defs>
    <path className="surface-page surface-page-left" d="M24 45 C175 9 365 8 500 72 L500 1432 C355 1380 180 1391 25 1450 C10 1120 10 365 24 45Z" fill="url(#paperLeft)"/>
    <path className="surface-page surface-page-right" d="M500 72 C635 8 825 9 976 45 C990 365 990 1120 975 1450 C820 1391 645 1380 500 1432Z" fill="url(#paperRight)"/>
    <path className="surface-gutter-svg" d="M465 62 C490 150 488 1320 462 1440 C487 1424 513 1424 538 1440 C512 1320 510 150 535 62 C513 78 487 78 465 62Z" fill="url(#gutter)"/>
   </svg>
   <div ref={bookRef} className="book">{pages.map((p,i)=><MenuPage key={i} page={p} pageIndex={i} onDish={selectDish}/>)}</div>
   <div className="physical-book-spine" aria-hidden="true"><span className="physical-book-spine-light"/></div>
  </div>
 </section>
}
