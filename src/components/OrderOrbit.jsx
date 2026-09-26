import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {dishImages} from '../data/la-terraza.js';
const money=n=>'S/ '+Number(n).toFixed(2);
export default function OrderOrbit({theme='futurista',open,closing,onClose,items,onChangeQty,onRemove,notes,onNotes}){
 const shapeRef=useRef(null);
 const suppressActionClickRef=useRef(false);
 const [thread,setThread]=useState(null);
 const [confirmNotice,setConfirmNotice]=useState(false);
 const [view,setView]=useState({zoom:1,x:0,y:0,closeProgress:0});
 const viewRef=useRef({zoom:1,x:0,y:0,closeProgress:0});
 useEffect(()=>{
  if(!open){viewRef.current={zoom:1,x:0,y:0,closeProgress:0};setView(viewRef.current);return;}
  if(theme!=='futurista')return;
  const panel=shapeRef.current,list=panel?.querySelector('.order-holo-scroll');
  if(!panel||!list)return;
  let gesture=null;
  const distance=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
  const midpoint=t=>({x:(t[0].clientX+t[1].clientX)/2,y:(t[0].clientY+t[1].clientY)/2});
  const update=next=>{viewRef.current=next;setView(next);};
  const clamp=next=>{
   const z=next.zoom,w=panel.offsetWidth*z,h=panel.offsetHeight*z,vw=window.innerWidth,vh=window.innerHeight;
   const maxX=Math.max(0,(w-vw)/2+Math.min(100,vw*.24));
   const maxY=Math.max(0,(h-vh)/2+Math.min(130,vh*.24));
   return {...next,x:Math.max(-maxX,Math.min(maxX,next.x)),y:Math.max(-maxY,Math.min(maxY,next.y))};
  };
  const start=e=>{
   if(e.touches.length===1)suppressActionClickRef.current=false;
   if(e.touches.length>=2){const m=midpoint(e.touches);gesture={mode:'pinch',distance:Math.max(1,distance(e.touches)),mid:m,...viewRef.current};return;}
   if(e.touches.length!==1)return;
   const t=e.touches[0],target=e.target;
   const onList=!!target.closest('.order-holo-scroll');
   const onHeader=!!target.closest('.order-holo-heading');
   const onButton=!!target.closest('button');
   const onControl=!!target.closest('textarea,input,summary');
   const mode=onControl?'control':onButton?'button-pending':onList?'scroll':viewRef.current.zoom>1.01?'pan':onHeader?'dismiss':'idle';
   gesture={mode,onList,onHeader,startX:t.clientX,startY:t.clientY,scroll:list.scrollTop,...viewRef.current};
  };
  const move=e=>{
   if(e.touches.length>=2){
    e.preventDefault();e.stopPropagation();
    if(!gesture||gesture.mode!=='pinch'){start(e);return;}
    const m=midpoint(e.touches),z=Math.max(.65,Math.min(4,gesture.zoom*distance(e.touches)/gesture.distance));
    update(clamp({zoom:z,x:gesture.x+m.x-gesture.mid.x,y:gesture.y+m.y-gesture.mid.y,closeProgress:0}));return;
   }
   if(e.touches.length!==1||!gesture||gesture.mode==='pinch'||gesture.mode==='control')return;
   const t=e.touches[0],dx=t.clientX-gesture.startX,dy=t.clientY-gesture.startY;
   if(gesture.mode==='button-pending'){
    if(Math.hypot(dx,dy)<7)return;
    gesture.mode=gesture.onList?'scroll':gesture.zoom>1.01?'pan':gesture.onHeader?'dismiss':'idle';
    suppressActionClickRef.current=true;
   }
   if(gesture.mode==='dismiss'){
    if(Math.abs(dy)<8&&Math.abs(dx)<8)return;
    e.preventDefault();e.stopPropagation();
    const progress=Math.max(0,Math.min(1,dy/Math.max(180,window.innerHeight*.35)));
    update({...viewRef.current,closeProgress:progress});return;
   }
   if(gesture.mode==='scroll'){
    e.preventDefault();e.stopPropagation();
    list.scrollTop=gesture.scroll-dy/gesture.zoom;return;
   }
   if(gesture.mode==='pan'){
    e.preventDefault();e.stopPropagation();
    update(clamp({zoom:gesture.zoom,x:gesture.x+dx,y:gesture.y+dy,closeProgress:0}));
   }
  };
  const end=e=>{
   if(gesture?.mode==='dismiss'&&e.touches.length===0){
    const progress=viewRef.current.closeProgress;
    if(progress>=.72){gesture=null;onClose();return;}
    update({...viewRef.current,closeProgress:0});
   }
   if(e.touches.length===0)gesture=null;
   else if(e.touches.length===1)start(e);
  };
  const cancelActionClick=e=>{
   if(suppressActionClickRef.current&&e.target.closest('button')){
    e.preventDefault();e.stopPropagation();suppressActionClickRef.current=false;
   }
  };
  panel.addEventListener('click',cancelActionClick,true);
  panel.addEventListener('touchstart',start,{passive:true,capture:true});
  panel.addEventListener('touchmove',move,{passive:false,capture:true});
  panel.addEventListener('touchend',end,{passive:true,capture:true});
  panel.addEventListener('touchcancel',end,{passive:true,capture:true});
  return()=>{panel.removeEventListener('click',cancelActionClick,true);panel.removeEventListener('touchstart',start,true);panel.removeEventListener('touchmove',move,true);panel.removeEventListener('touchend',end,true);panel.removeEventListener('touchcancel',end,true);};
 },[open,theme,onClose]);

 const count=items.reduce((n,i)=>n+i.qty,0),total=items.reduce((n,i)=>n+i.qty*i.price,0);
 useLayoutEffect(()=>{
  if(!open)return;
  let raf=0;
  const measure=()=>{
   const button=document.querySelector('.dock-order'),shape=shapeRef.current;
   if(!button||!shape)return;
   const a=button.getBoundingClientRect(),b=shape.getBoundingClientRect();
   const next={x:a.left+a.width/2,y:a.top+8,tipX:b.left+b.width/2,top:theme==='futurista'?b.bottom-2:b.top+b.height*690/700,w:window.innerWidth,h:window.innerHeight};
   setThread(prev=>prev&&Object.keys(next).every(k=>Math.abs(prev[k]-next[k])<.5)?prev:next);
  };
  const track=()=>{measure();raf=requestAnimationFrame(track)};
  raf=requestAnimationFrame(track);
  return()=>cancelAnimationFrame(raf);
 },[open,theme]);
 if(!open)return null;
 const filament=(offset)=>{if(!thread)return '';const {x,y,tipX,top}=thread;const gap=Math.max(1,y-top);return 'M '+(x+offset)+' '+y+' C '+(x+offset*.9)+' '+(y-gap*.34)+', '+(tipX+offset*.65)+' '+(top+gap*.29)+', '+tipX+' '+top};
 const contour='M 200 8 C 163 8 154 47 121 56 C 55 67 30 111 31 173 C 29 224 13 254 18 324 C 20 380 34 403 35 465 C 33 534 58 568 113 574 C 160 578 168 606 185 636 C 191 649 194 664 200 690 C 206 664 209 649 215 636 C 232 606 240 578 287 574 C 342 568 367 534 365 465 C 366 403 380 380 382 324 C 387 254 371 224 369 173 C 370 111 345 67 279 56 C 246 47 237 8 200 8 Z';
 return <div className={'order-orbit '+(theme==='minimalista'?'order-minimal':'order-neon')+' '+(closing?'order-closing':'')} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
  <svg className="order-thread order-neon-thread" viewBox={'0 0 '+window.innerWidth+' '+window.innerHeight} aria-hidden="true" preserveAspectRatio="none">
   <defs><linearGradient id="orderNeonGradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#20dfff"/><stop offset="52%" stopColor="#478bff"/><stop offset="100%" stopColor="#bd4dff"/></linearGradient><filter id="orderNeonGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter></defs>
   {thread&&[-5,0,5].map((offset,i)=><g key={offset}><path d={filament(offset)} className="order-neon-glow"/><path d={filament(offset)} className="order-neon-filament"/><circle r={i===1?2.1:1.35} className="order-neon-particle"><animateMotion dur={(1.7+i*.32)+'s'} begin={(i*.38)+'s'} repeatCount="indefinite" path={filament(offset)}/></circle></g>)}
   {thread&&<><circle cx={thread.x} cy={thread.y} r="4" className="order-neon-origin"/><circle cx={thread.tipX} cy={thread.top} r="4" className="order-neon-origin"/></>}
  </svg>
  <div className="order-neon-dock-light" style={thread?{left:thread.x,top:thread.y+18}:undefined} aria-hidden="true"><span>◯</span></div>
  {theme==='futurista'?<section ref={shapeRef} className={"order-shape order-holo-panel "+(items.length===0?"order-holo-empty":"order-holo-filled")} role="dialog" aria-modal="true" aria-label="Mi pedido" style={{'--holo-zoom':view.zoom,'--holo-pan-x':view.x+'px','--holo-pan-y':view.y+'px','--holo-close-progress':view.closeProgress,'--holo-close-y':Math.round(view.closeProgress*window.innerHeight*.42)+'px','--holo-effective-zoom':view.zoom*(1-view.closeProgress*.87)}}>
   <button type="button" className="order-close" aria-label="Cerrar pedido" onClick={onClose}>×</button>
   <header className="order-holo-heading"><span className="order-holo-cart" aria-hidden="true">⌑</span><div><h2>MI PEDIDO</h2><p>{count} {count===1?'producto':'productos'} · Borrador</p></div><button type="button" className="order-add-dishes order-holo-add-top" onClick={onClose}>+ Añadir platos</button></header>
   <div className="order-holo-scroll">
    {items.length===0?<p className="order-empty">Aún no has añadido platos.<br/>Elige tus platos desde la carta.</p>:items.map(item=><article className="order-holo-line" key={item.key}>
     <div className="order-holo-dish">{dishImages[item.name]&&<img src={dishImages[item.name]} alt="" loading="lazy"/>}<div className="order-holo-name"><strong>{item.name}</strong><small>Para: {item.guest}</small></div></div>
     <div className="order-holo-controls"><div className="order-qty"><button type="button" aria-label={'Reducir '+item.name} onClick={()=>onChangeQty(item.key,-1)}>−</button><span>{item.qty}</span><button type="button" aria-label={'Aumentar '+item.name} onClick={()=>onChangeQty(item.key,1)}>+</button></div><span className="order-holo-unit">{money(item.price)}</span><strong className="order-holo-price">{money(item.price*item.qty)}</strong><button type="button" className="order-remove" aria-label={'Eliminar '+item.name} onClick={()=>onRemove(item.key)}><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m5 4v7m4-7v7"/></svg></button></div>
    </article>)}
    <details className="order-holo-notes" open={undefined}><summary>Notas para el restaurante {notes.trim()? "• Añadidas" : "(opcional)"}</summary><textarea id="order-holo-notes" aria-label="Notas para el restaurante" value={notes} onChange={e=>onNotes(e.target.value)} placeholder="Ej.: sin cebolla o indicaciones para la cocina" maxLength={500} rows={2}/></details>
   </div>
   <footer className="order-holo-footer"><button type="button" className="order-clear" disabled={!items.length} onClick={()=>items.forEach(item=>onRemove(item.key))}>Vaciar pedido</button><div className="order-holo-total"><span>Total:</span><strong>{money(total)}</strong></div><button type="button" className="order-send" disabled={!items.length} onClick={()=>setConfirmNotice(true)}>Enviar pedido</button></footer>
   {confirmNotice&&<p className="order-notice" role="status">Esta demo todavía no envía pedidos a cocina ni procesa pagos.</p>}
  </section>:<>
  <section ref={shapeRef} className="order-shape" role="dialog" aria-modal="true" aria-label="Mi pedido" style={{'--order-height':Math.min(78,Math.max(57,57+items.length*5))+'dvh'}}>
   <svg className="order-organic-outline" viewBox="0 0 400 700" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="orderOrganicGradient" x1="0%" y1="15%" x2="100%" y2="85%"><stop offset="0%" stopColor="#00dfff"/><stop offset="46%" stopColor="#4b79ff"/><stop offset="100%" stopColor="#d448ff"/></linearGradient><filter id="orderOrganicGlow" x="-30%" y="-20%" width="160%" height="140%"><feGaussianBlur stdDeviation="4"/></filter></defs><path d={contour} fill="none" stroke="#338dff" strokeWidth="7" opacity=".7" filter="url(#orderOrganicGlow)"/><path d={contour} fill="url(#orderOrganicFill)" stroke="url(#orderOrganicGradient)" strokeWidth="1.5"/><defs><linearGradient id="orderOrganicFill" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#09162e"/><stop offset="55%" stopColor="#10152c"/><stop offset="100%" stopColor="#090f22"/></linearGradient></defs><path d={contour} fill="none" stroke="#bc5cff" strokeWidth=".6" opacity=".75" transform="translate(2 2)"/></svg>
   <button type="button" className="order-close" aria-label="Cerrar pedido" onClick={onClose}>×</button>
   <header className="order-heading"><small>LA TERRAZA · MESA 1</small><h2>Mi pedido</h2><p>{count} {count===1?'producto':'productos'} · Borrador</p></header>
   <div className="order-scroll">
    {items.length===0?<p className="order-empty">Aún no has añadido platos. Selecciona uno de la carta para comenzar.</p>:items.map(item=><article className="order-line" key={item.key}>
     <div className="order-line-top"><strong>{item.name}</strong><strong>{money(item.price*item.qty)}</strong></div>
     <small>Para: {item.guest} · {money(item.price)} c/u</small>
     <div className="order-line-actions"><div className="order-qty"><button type="button" aria-label="Reducir cantidad" onClick={()=>onChangeQty(item.key,-1)}>−</button><span>{item.qty}</span><button type="button" aria-label="Aumentar cantidad" onClick={()=>onChangeQty(item.key,1)}>+</button></div><button type="button" className="order-remove" onClick={()=>onRemove(item.key)}>Eliminar</button></div>
    </article>)}
    <label className="order-notes-label" htmlFor="order-notes">Notas para el restaurante (opcional)</label>
    <textarea id="order-notes" value={notes} onChange={e=>onNotes(e.target.value)} placeholder="Ej.: sin cebolla o indicaciones para la cocina" maxLength={500} rows={2}/>
   </div>
   <footer className="order-footer"><div><span>Subtotal</span><strong>{money(total)}</strong></div><div><span>Total</span><strong>{money(total)}</strong></div><div className="order-footer-actions"><button type="button" className="order-clear" disabled={!items.length} onClick={()=>items.forEach(item=>onRemove(item.key))}>Vaciar pedido</button><button type="button" className="order-send" disabled={!items.length} onClick={()=>setConfirmNotice(true)}>Enviar pedido</button></div>{confirmNotice&&<p className="order-notice" role="status">Esta demo todavía no envía pedidos a cocina ni procesa pagos.</p>}</footer>
  </section></>}
 </div>;
}