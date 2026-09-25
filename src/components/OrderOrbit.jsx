import React,{useLayoutEffect,useRef,useState} from 'react';
const money=n=>'S/ '+Number(n).toFixed(2);
export default function OrderOrbit({open,closing,onClose,items,onChangeQty,onRemove,notes,onNotes}){
 const shapeRef=useRef(null);
 const [thread,setThread]=useState(null);
 const [confirmNotice,setConfirmNotice]=useState(false);
 const count=items.reduce((n,i)=>n+i.qty,0),total=items.reduce((n,i)=>n+i.qty*i.price,0);
 useLayoutEffect(()=>{
  if(!open)return;
  let raf=0;
  const measure=()=>{
   const button=document.querySelector('.dock-order'),shape=shapeRef.current;
   if(!button||!shape)return;
   const a=button.getBoundingClientRect(),b=shape.getBoundingClientRect();
   const next={x:a.left+a.width/2,y:a.top+8,top:b.bottom-12,w:window.innerWidth,h:window.innerHeight};
   setThread(prev=>prev&&Object.keys(next).every(k=>Math.abs(prev[k]-next[k])<.5)?prev:next);
  };
  const track=()=>{measure();raf=requestAnimationFrame(track)};
  raf=requestAnimationFrame(track);
  return()=>cancelAnimationFrame(raf);
 },[open]);
 if(!open)return null;
 const filament=(offset)=>{if(!thread)return '';const {x,y,top}=thread;const gap=Math.max(1,y-top);return 'M '+(x+offset)+' '+y+' C '+(x+offset*1.2)+' '+(y-gap*.28)+', '+(x+offset*.65)+' '+(top+gap*.36)+', '+x+' '+top};
 const contour='M 200 8 C 163 8 154 47 121 56 C 55 67 30 111 31 173 C 29 224 13 254 18 324 C 20 380 34 403 35 465 C 33 534 58 568 113 574 C 160 578 168 606 185 636 C 191 649 194 664 200 690 C 206 664 209 649 215 636 C 232 606 240 578 287 574 C 342 568 367 534 365 465 C 366 403 380 380 382 324 C 387 254 371 224 369 173 C 370 111 345 67 279 56 C 246 47 237 8 200 8 Z';
 return <div className={'order-orbit order-neon '+(closing?'order-closing':'')} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
  <svg className="order-thread order-neon-thread" viewBox={'0 0 '+window.innerWidth+' '+window.innerHeight} aria-hidden="true" preserveAspectRatio="none">
   <defs><linearGradient id="orderNeonGradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#20dfff"/><stop offset="52%" stopColor="#478bff"/><stop offset="100%" stopColor="#bd4dff"/></linearGradient><filter id="orderNeonGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter></defs>
   {thread&&[-10,-3,3,10].map((offset,i)=><g key={offset}><path d={filament(offset)} className="order-neon-glow"/><path d={filament(offset)} className="order-neon-filament" style={{animationDelay:i*.12+'s'}}/></g>)}
   {thread&&<><circle cx={thread.x} cy={thread.y} r="5" className="order-neon-origin"/><circle cx={thread.x} cy={thread.top} r="4" className="order-neon-origin"/></>}
  </svg>
  <div className="order-neon-dock-light" aria-hidden="true"><span>◯</span></div>
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
  </section>
 </div>;
}