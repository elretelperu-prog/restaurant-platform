import React,{useLayoutEffect,useRef,useState} from 'react';
const money=n=>'S/ '+Number(n).toFixed(2);
export default function OrderOrbit({open,closing,onClose,items,onChangeQty,onRemove,notes,onNotes}){
 if(!open)return null;
 const count=items.reduce((n,i)=>n+i.qty,0),total=items.reduce((n,i)=>n+i.qty*i.price,0);
 const shapeRef=useRef(null);
 const [thread,setThread]=useState(null);
 useLayoutEffect(()=>{
  if(!open)return;
  let frame=0;
  const measure=()=>{
   const button=document.querySelector('.dock-order');
   const shape=shapeRef.current;
   if(!button||!shape)return;
   const a=button.getBoundingClientRect(),b=shape.getBoundingClientRect();
   setThread({x1:a.left+a.width/2,y1:a.top+a.height/2,x2:b.left+b.width/2,y2:b.bottom-12});
  };
  const refresh=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)};
  refresh();
  // Track the expanding/shrinking edge for the full transition, not just its final position.
  const started=performance.now();
  const track=now=>{measure();if(now-started<650)frame=requestAnimationFrame(track)};
  frame=requestAnimationFrame(track);
  const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(refresh):null;
  if(observer&&shapeRef.current)observer.observe(shapeRef.current);
  window.addEventListener('resize',refresh);
  window.addEventListener('scroll',refresh,true);
  return()=>{cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('resize',refresh);window.removeEventListener('scroll',refresh,true)};
 },[open,closing,items.length]);
 return <div className={'order-orbit '+(closing?'order-closing':'')} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
  <svg className="order-thread" aria-hidden="true">{thread&&<line x1={thread.x1} y1={thread.y1} x2={thread.x2} y2={thread.y2}/>}</svg>
  <section ref={shapeRef} className="order-shape" role="dialog" aria-modal="true" aria-label="Mi pedido" style={{'--order-height':Math.min(76,Math.max(48,48+items.length*6))+'dvh'}}>
   <button type="button" className="order-close" aria-label="Cerrar pedido" onClick={onClose}>×</button>
   <header className="order-heading"><small>LA TERRAZA · MESA 1</small><h2>Mi pedido</h2><p>{count} {count===1?'producto':'productos'} · Borrador</p></header>
   <div className="order-scroll">
    {items.length===0?<p className="order-empty">Aún no has añadido platos. Selecciona uno de la carta para comenzar.</p>:items.map(item=><article className="order-line" key={item.key}>
     <div className="order-line-top"><strong>{item.name}</strong><strong>{money(item.price*item.qty)}</strong></div>
     <small>Para: {item.guest} · {money(item.price)} c/u</small>
     <div className="order-line-actions"><div className="order-qty"><button type="button" aria-label="Reducir cantidad" onClick={()=>onChangeQty(item.key,-1)}>−</button><span>{item.qty}</span><button type="button" aria-label="Aumentar cantidad" onClick={()=>onChangeQty(item.key,1)}>+</button></div><button type="button" className="order-remove" onClick={()=>onRemove(item.key)}>Eliminar</button></div>
    </article>)}
    <label className="order-notes-label" htmlFor="order-notes">Indicaciones para el restaurante</label>
    <textarea id="order-notes" value={notes} onChange={e=>onNotes(e.target.value)} placeholder="Ej.: sin cebolla o indicaciones para la cocina" maxLength={500} rows={2}/>
   </div>
   <footer className="order-footer"><div><span>Subtotal</span><strong>{money(total)}</strong></div><div><span>Total del pedido</span><strong>{money(total)}</strong></div><small>Importes de demostración; cargos adicionales no configurados.</small><p className="order-notice">Borrador: envío a cocina y pago aún no conectados.</p></footer>
  </section>
 </div>;
}