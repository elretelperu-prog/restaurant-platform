import React from 'react';
export default function BottomNavigation({count,onOrder,orderOpen}){
 return <nav className="dock"><div><b>⌑</b>Carta</div><button type="button" className="dock-order" onClick={onOrder} aria-label={"Ver mi pedido, "+count+" productos"} aria-expanded={orderOpen}><b>◯</b>Mi pedido <span>{count}</span></button><div><b>♙</b>Mi nombre</div></nav>;
}