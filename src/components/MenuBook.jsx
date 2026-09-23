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
  const pf=new PageFlip(book,{width:w,height:h,size:'stretch',minWidth:145,maxWidth:270,minHeight:480,maxHeight:760,showCover:false,usePortrait:false,drawShadow:true,maxShadowOpacity:.55,flippingTime:700,mobileScrollSupport:false,useMouseEvents:true,disableFlipByClick:true,clickEventForward:true,startPage:0,autoSize:true,showPageCorners:false});

  let timers=[], raf=0, token=0, idle=false;
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];cancelAnimationFrame(raf)};
  const isBack=()=>pf.getCurrentPageIndex()>=2;
  const pos=(depth,drop=0)=>{
   const r=pf.getBoundsRect(), back=isBack();
   return {x:back?r.left+depth:r.left+r.pageWidth*2-depth,y:r.top+depth+drop};
  };
  const hold=(depth=48,drop=0)=>{
   const c=pf.getFlipController();
   try{
    c.fold(pos(depth,drop));
    idle=true;
   }catch(e){}
  };
  const animate=(fromDepth,toDepth,fromDrop,toDrop,duration,done)=>{
   const started=performance.now(), my=token;
   const tick=now=>{
    if(my!==token)return;
    const t=Math.min(1,(now-started)/duration);
    const ease=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
    hold(fromDepth+(toDepth-fromDepth)*ease,fromDrop+(toDrop-fromDrop)*ease);
    if(t<1)raf=requestAnimationFrame(tick); else done?.();
   };
   raf=requestAnimationFrame(tick);
  };
  const pulse=()=>{
   const my=token;
   animate(48,68,0,20,210,()=>{
    if(my!==token)return;
    animate(68,48,20,0,240,()=>hold(48,0));
   });
  };
  const startIdle=()=>{
   token++; clearTimers();
   const my=token;
   timers.push(setTimeout(()=>{if(my!==token)return;hold(48,0);pulse();},180));
   timers.push(setTimeout(()=>{if(my!==token)return;pulse();},3180));
  };

  pf.on('init',startIdle);
  pf.on('flip',startIdle);

  const interrupt=()=>{
   if(!idle)return;
   token++; clearTimers(); idle=false;
   try{pf.getFlipController().stopMove()}catch(e){}
  };
  book.addEventListener('pointerdown',interrupt,{passive:true});
  book.addEventListener('touchstart',interrupt,{passive:true});

  pf.loadFromHTML(book.querySelectorAll('.page'));
  return()=>{token++;clearTimers();book.removeEventListener('pointerdown',interrupt);book.removeEventListener('touchstart',interrupt);pf.destroy()};
 },[]);

 return <section className="stage">
  <div className="bookWrap" ref={wrapRef}>
   <div ref={bookRef} className="book">{pages.map((p,i)=><MenuPage key={i} page={p} pageIndex={i} onDish={onDish}/>)}</div>
  </div>
 </section>
}
