import React,{useLayoutEffect,useRef,useState} from 'react';
const money=n=>'S/ '+Number(n).toFixed(2);
export default function OrderOrbit({open,closing,onClose,items,onChangeQty,onRemove,notes,onNotes}){
 const shapeRef=useRef(null);
 const [thread,setThread]=useState(null);
 const [confirmNotice,setConfirmNotice]=useState(false);
 const count=items.reduce((n,i)=>n+i.qty,0),total=items.reduce((n,i)=>n+i.qty*i.price,0);
 useLayoutEffect(()=>{
  if(!open)return;
  let frame=0;
  const measure=()=>{
   const button=document.querySelector('.dock-order'),shape=shapeRef.current;
   if(!button||!shape)return;
   const a=button.getBoundingClientRect(),b=shape.getBoundingClientRect();
   setThread({x:a.left+a.width/2,y:a.top+7,top:b.bottom-4,w:window.innerWidth,h:window.innerHeight});
  };
  const refresh=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)};
  const started=performance.now();
  const track=now=>{measure();if(now-started<700)frame=requestAnimationFrame(track)};
  frame=requestAnimationFrame(track);
  const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(refresh):null;
  if(observer&&shapeRef.current)observer.observe(shapeRef.current);
  window.addEventListener('resize',refresh);
  window.addEventListener('scroll',refresh,true);
  return()=>{cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('resize',refresh);window.removeEventListener('scroll',refresh,true)};
 },[open,closing,items.length]);
 if(!open)return null;
 const filament=(offset)=>{if(!thread)return '';const {x,y,top}=thread;const endX=x+offset*.25,startX=x+offset;const span=Math.max(1,y-top);return 'M '+startX+' '+y+' C '+(startX+offset*.55)+' '+(y-span*.23)+', '+(endX-offset*.8)+' '+(top+span*.31)+', '+endX+' '+top};
 return <div className={'order-orbit order-neon '+(closing?'order-closing':'')} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
  {thread&&<><svg className="order-thread order-neon-thread" viewBox={'0 0 '+thread.w+' '+thread.h} aria-hidden="true" preserveAspectRatio="none">
   <defs><linearGradient id="orderNeonGradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#20dfff"/><stop offset="52%" stopColor="#478bff"/><stop offset="100%" stopColor="#bd4dff"/></linearGradient><filter id="orderNeonGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter></defs>
   {[-17,-7,7,17].map((offset,i)=><g key={offset}><path d={filament(offset)} className="order-neon-glow"/><path d={filament(offset)} className="order-neon-filament" style={{animationDelay:i*.12+'s'}}/></g>)}
   <circle cx={thread.x} cy={thread.y} r="6" className="order-neon-origin"/><circle cx={thread.x} cy={thread.top} r="4" className="order-neon-origin"/>
  </svg><div className="order-neon-dock-light" style={{left:thread.x,top:thread.y+19}} aria-hidden="true"><span>◯</span></div></>}
  <section ref={shapeRef} className="order-shape" role="dialog" aria-modal="true" aria-label="Mi pedido" style={{'--order-height':Math.min(77,Math.max(49,49+items.length*6))+'dvh'}}>
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
  </section>
 </div>;
}