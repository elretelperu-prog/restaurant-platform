import React from 'react';
const money=n=>'S/ '+Number(n).toFixed(2);
export default function OrderOrbit({open,closing,onClose,items,onChangeQty,onRemove,notes,onNotes}){
 if(!open)return null;
 const count=items.reduce((n,i)=>n+i.qty,0),total=items.reduce((n,i)=>n+i.qty*i.price,0);
 return <div className={'order-orbit '+(closing?'order-closing':'')} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
  <svg className="order-thread" aria-hidden="true"><line x1="50%" y1="92%" x2="50%" y2="47%"/></svg>
  <section className="order-shape" role="dialog" aria-modal="true" aria-label="Mi pedido" style={{'--order-height':Math.min(76,Math.max(48,48+items.length*6))+'dvh'}}>
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