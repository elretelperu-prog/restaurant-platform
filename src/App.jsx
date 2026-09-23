import React,{useState} from 'react'; import MenuBook from './components/MenuBook.jsx'; import BottomNavigation from './components/BottomNavigation.jsx';
export default function App(){
 const [selected,setSelected]=useState(null),[qty,setQty]=useState(1),[count,setCount]=useState(0),[closing,setClosing]=useState(false);
 const choose=d=>{setClosing(false);setSelected(d);setQty(1)};
 const add=()=>{setCount(c=>c+qty);setClosing(true);setTimeout(()=>{setSelected(null);setClosing(false)},620)};
 return <><main className="app"><div className="top"><div className="pill">Mesa 1</div><div className="brand"><b>LA TERRAZA</b><small>DEMO · PAGE CURL ENGINE</small></div><div className="pill">ES | EN</div></div><MenuBook onDish={choose}/><div className="hint">Toma una esquina de la hoja y arrástrala lentamente. El pliegue sigue tu dedo en ambos sentidos.</div></main><BottomNavigation count={count}/>
 {selected&&<div className={'dish-orbit '+(closing?'closing':'')} style={{'--anchor-x':selected.x+'px','--anchor-y':selected.y+'px'}}>
   <svg className="dish-thread" aria-hidden="true"><line x1={selected.x} y1={selected.y} x2="50%" y2="50%"/></svg>
   <div className="dish-bubble">
    <h2>{selected.name}</h2><div className="bubble-price">€{selected.price}</div>
    <div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><b>{qty}</b><button onClick={()=>setQty(q=>q+1)}>+</button></div>
    <input placeholder="Tu nombre"/>
    <button className="confirm" onClick={add}>Añadir al pedido</button>
   </div>
  </div>}
 </>}
