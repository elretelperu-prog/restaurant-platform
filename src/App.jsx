import React,{useState} from 'react'; import OrderOrbit from './components/OrderOrbit.jsx'; import MenuBook from './components/MenuBook.jsx'; import BottomNavigation from './components/BottomNavigation.jsx';
export default function App(){
 const [theme,setTheme]=useState(()=>new URLSearchParams(window.location.search).get('tema')==='minimalista'?'minimalista':'futurista');
 const switchTheme=next=>{if(next===theme)return;setTheme(next);const url=new URL(window.location.href);url.searchParams.set('tema',next);window.history.replaceState(null,'',url.pathname+url.search+url.hash)};
 const [selected,setSelected]=useState(null),[qty,setQty]=useState(1),[items,setItems]=useState([]),[closing,setClosing]=useState(false);
 const [orderOpen,setOrderOpen]=useState(false),[orderClosing,setOrderClosing]=useState(false),[orderNotes,setOrderNotes]=useState('');
 const count=items.reduce((n,item)=>n+item.qty,0);
 const [bubblePos,setBubblePos]=useState({x:0,y:0});
 const [drag,setDrag]=useState(null);
 const [customerName,setCustomerName]=useState('');
 const [nameError,setNameError]=useState(false);
 const [blinkKey,setBlinkKey]=useState(0);
 const choose=d=>{setClosing(false);setSelected(d);setQty(1);setCustomerName('');setNameError(false);setBubblePos({x:window.innerWidth/2,y:window.innerHeight*.47})};
 const finishClose=()=>{setClosing(true);setTimeout(()=>{setSelected(null);setClosing(false)},620)};
 const add=()=>{if(closing)return;if(customerName.trim().split(/\s+/).length<2){setNameError(true);setBlinkKey(k=>k+1);return;}setNameError(false);setItems(current=>{const name=customerName.trim().replace(/\s+/g,' ');const key=selected.name+'|'+name;const index=current.findIndex(item=>item.key===key);if(index<0)return [...current,{key,name:selected.name,guest:name,price:Number(selected.price),qty}];return current.map((item,i)=>i===index?{...item,qty:item.qty+qty}:item)});finishClose()};
 const cancel=()=>{if(!closing)finishClose()};
 const openOrder=()=>{if(selected||orderClosing)return;setOrderOpen(true)};
 const closeOrder=()=>{if(orderClosing)return;setOrderClosing(true);setTimeout(()=>{setOrderOpen(false);setOrderClosing(false)},540)};
 const changeItem=(key,delta)=>setItems(current=>current.map(item=>item.key===key?{...item,qty:Math.max(0,item.qty+delta)}:item).filter(item=>item.qty>0));
 const removeItem=key=>setItems(current=>current.filter(item=>item.key!==key));
 const startDrag=e=>{
  if(e.target.closest('button,input'))return;
  e.preventDefault();e.currentTarget.setPointerCapture?.(e.pointerId);
  setDrag({id:e.pointerId,dx:e.clientX-bubblePos.x,dy:e.clientY-bubblePos.y});
 };
 const moveDrag=e=>{
  if(!drag||drag.id!==e.pointerId||closing)return;
  const r=e.currentTarget.getBoundingClientRect(),radius=r.width/2,margin=8;
  const x=Math.max(radius+margin,Math.min(window.innerWidth-radius-margin,e.clientX-drag.dx));
  const y=Math.max(radius+margin,Math.min(window.innerHeight-radius-margin,e.clientY-drag.dy));
  setBubblePos({x,y});
 };
 const endDrag=e=>{if(drag?.id===e.pointerId)setDrag(null)};
 return <div className={'restaurant-theme theme-'+theme}><main className={'app '+(selected?'dish-open':'')}><div className="top"><div className="pill">Mesa 1</div><div className="brand"><b>LA TERRAZA</b><small>DEMO · PAGE CURL ENGINE</small></div><div className="pill">ES | EN</div></div><div className="theme-picker" role="group" aria-label="Diseño de demostración"><button type="button" className={theme==='minimalista'?'active':''} aria-pressed={theme==='minimalista'} onClick={()=>switchTheme('minimalista')}>Minimalista</button><button type="button" className={theme==='futurista'?'active':''} aria-pressed={theme==='futurista'} onClick={()=>switchTheme('futurista')}>Futurista</button></div><MenuBook onDish={choose} popupOpen={Boolean(selected)}/><div className="hint">Toma una esquina de la hoja y arrástrala lentamente. El pliegue sigue tu dedo en ambos sentidos.</div></main><BottomNavigation count={count} onOrder={openOrder} orderOpen={orderOpen}/>
 {selected&&<div className={'dish-orbit '+(closing?'closing':'')} onPointerDownCapture={e=>{if(e.target===e.currentTarget){e.preventDefault();e.stopPropagation();cancel()}}} onClickCapture={e=>{if(e.target===e.currentTarget){e.preventDefault();e.stopPropagation()}}} style={{'--anchor-x':selected.x+'px','--anchor-y':selected.y+'px','--bubble-x':bubblePos.x+'px','--bubble-y':bubblePos.y+'px'}}>
   <svg className="dish-thread dish-neon-thread" aria-hidden="true" viewBox={'0 0 '+window.innerWidth+' '+window.innerHeight} preserveAspectRatio="none">
    <defs><linearGradient id="dishNeonGradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#20dfff"/><stop offset="52%" stopColor="#478bff"/><stop offset="100%" stopColor="#bd4dff"/></linearGradient><filter id="dishNeonGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter></defs>
    {theme==='futurista'?(()=>{const dx=bubblePos.x-selected.x,dy=bubblePos.y-selected.y,dist=Math.max(1,Math.hypot(dx,dy));const radius=Math.min(window.innerWidth*.299,132);const reach=Math.min(radius,Math.max(0,dist-2));const tipX=bubblePos.x-dx/dist*reach,tipY=bubblePos.y-dy/dist*reach;const filament=offset=>{const nx=-dy/dist,ny=dx/dist;const ax=selected.x+nx*offset,ay=selected.y+ny*offset;return 'M '+ax+' '+ay+' C '+(ax+dx*.34)+' '+(ay+dy*.16)+', '+(tipX+nx*offset*.45-dx*.17)+' '+(tipY+ny*offset*.45-dy*.12)+', '+tipX+' '+tipY};return <>{[-5,0,5].map((offset,i)=><g key={offset}><path d={filament(offset)} className="dish-neon-glow"/><path d={filament(offset)} className="dish-neon-filament"/><circle r={i===1?2.1:1.35} className="dish-neon-particle"><animateMotion dur={(1.7+i*.32)+'s'} begin={(i*.38)+'s'} repeatCount="indefinite" path={filament(offset)}/></circle></g>)}<circle cx={selected.x} cy={selected.y} r="4" className="dish-neon-origin"/><circle cx={tipX} cy={tipY} r="4" className="dish-neon-origin"/></>})():<line x1={selected.x} y1={selected.y} x2={bubblePos.x} y2={bubblePos.y}/>}
   </svg>
   <div className={'dish-bubble '+(drag?'dragging':'')} style={{left:bubblePos.x,top:bubblePos.y}} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
    <button className="bubble-close" aria-label="Cerrar" onPointerDown={e=>e.stopPropagation()} onClick={e=>{e.stopPropagation();cancel()}}>×</button>
    <h2>{selected.name}</h2><div className="bubble-price">S/ {selected.price}</div>
    <div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><b>{qty}</b><button onClick={()=>setQty(q=>q+1)}>+</button></div>
    <div className={"name-field "+(nameError&&!customerName.trim()?"empty-name-error":"")}><input key={blinkKey} className={(nameError?"name-input-blink ":"")+(nameError&&customerName.trim()&&!/\s/.test(customerName.trim())?"has-surname-hint":"")} placeholder={nameError&&!customerName.trim()?"":"Escriba nombre y apellido"} autoComplete="off" autoCorrect="off" spellCheck={false} name="guest-full-name" aria-label="Nombre y apellido" aria-invalid={nameError} value={customerName} onChange={e=>{setCustomerName(e.target.value);if(nameError&&e.target.value.trim().split(/\s+/).length>=2)setNameError(false)}}/>{nameError&&customerName.trim()&&!/\s/.test(customerName.trim())&&<span className="surname-hint" aria-hidden="true"><span className="surname-mirror">{customerName.trim()}</span><span className="surname-suggestion">apellido</span></span>}</div>
    
    <button className="confirm" onClick={add}>Añadir al pedido</button>
   </div>
  </div>}
 <OrderOrbit theme={theme} open={orderOpen} closing={orderClosing} onClose={closeOrder} items={items} onChangeQty={changeItem} onRemove={removeItem} notes={orderNotes} onNotes={setOrderNotes}/>
 </div>}
