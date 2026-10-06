import React,{useMemo,useRef,useState} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import * as THREE from 'three';

function makePageTexture(title,subtitle,items=['Croquetas de jamón','Bruschetta mediterránea','Calamares crujientes','Ensalada burrata','Patatas bravas','Tartar de atún'] ){
 const c=document.createElement('canvas');c.width=768;c.height=1200;
 const x=c.getContext('2d');x.fillStyle='#fff7df';x.fillRect(0,0,c.width,c.height);
 const g=x.createLinearGradient(0,0,c.width,0);g.addColorStop(0,'#ead9b8');g.addColorStop(.12,'#fffaf0');g.addColorStop(.88,'#fffaf0');g.addColorStop(1,'#e4cfaa');x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
 x.fillStyle='#3a281d';x.textAlign='center';x.font='700 58px Georgia';x.fillText(title,384,150);x.font='26px Arial';x.fillText(subtitle,384,205);
 x.textAlign='left';x.font='32px Georgia';items.forEach((n,i)=>{const y=330+i*125;x.fillText(n,90,y);x.font='22px Arial';x.fillStyle='#795f49';x.fillText('Preparado al momento · receta de la casa',90,y+34);x.textAlign='right';x.fillStyle='#3a281d';x.font='700 25px Arial';x.fillText('S/ '+(10+i*3),680,y);x.textAlign='left';x.font='32px Georgia';});
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;t.flipY=false;return t;
}
function CurlPage({progress,dragY=0,frontTexture,backTexture}){
 const geometry=useMemo(()=>{
  const g=new THREE.PlaneGeometry(2.35,3.55,64,40);
  g.translate(1.175,0,0);
  g.userData.base=Float32Array.from(g.attributes.position.array);
  return g;
 },[]);
 useFrame(()=>{
  const p=geometry.attributes.position,arr=p.array,base=geometry.userData.base;
  const W=2.35,H=3.55;
  const tipX=W*(1-progress);
  const tipY=-H*.5+dragY*.72;
  const nx=.94,ny=-dragY*.34;
  const nlen=Math.hypot(nx,ny),ux=nx/nlen,uy=ny/nlen;
  const band=.34;
  for(let i=0;i<p.count;i++){
   const bx=base[i*3],by=base[i*3+1];
   const dx=bx-tipX,dy=by-tipY;
   const d=dx*ux+dy*uy;
   let x=bx,y=by,z=.012;
   if(d>0){
    const q=Math.min(1,d/band);
    const theta=Math.PI*q;
    const r=Math.min(d,band);
    const tx=bx-r*ux,ty=by-r*uy;
    const folded=-r*Math.cos(theta);
    x=tx+folded*ux;
    y=ty+folded*uy;
    z=.025+r*Math.sin(theta)+.07*Math.sin(Math.PI*q);
    if(d>band){x-=(d-band)*ux;y-=(d-band)*uy}
   } else if(d>-band*.7){
    const q=(d+band*.7)/(band*.7);
    z=.012+.028*Math.sin(Math.PI*q)*progress;
   }
   const spine=Math.max(0,1-bx/.32);
   z+=spine*.018;
   arr[i*3]=x;arr[i*3+1]=y;arr[i*3+2]=z;
  }
  p.needsUpdate=true;geometry.computeVertexNormals();
 });
 return <mesh geometry={geometry} position={[0,0,.035]} castShadow>
  <meshStandardMaterial map={frontTexture} side={THREE.FrontSide} roughness={.9}/>
  <mesh geometry={geometry} position={[0,0,-.002]}><meshStandardMaterial map={backTexture} side={THREE.BackSide} roughness={.92}/></mesh>
 </mesh>;
}
export default function Book3DPrototype(){
 const [progress,setProgress]=useState(0),[dragY,setDragY]=useState(0),drag=useRef(null);
 const frontTex=useMemo(()=>makePageTexture('Platos principales','PÁGINA 2'),[]);
 const backTex=useMemo(()=>makePageTexture('Entrantes','PÁGINA 3',['Carpaccio de res','Gambas al ajillo','Pulpo a la brasa','Burrata italiana','Ceviche clásico','Tabla de quesos']),[]);
 const leftTex=useMemo(()=>makePageTexture('Terraza','PÁGINA 1',['Pan de la casa','Aceitunas marinadas','Ensalada verde','Sopa del día','Jamón ibérico','Tortilla española']),[]);
 const underTex=useMemo(()=>makePageTexture('Especialidades','PÁGINA 4',['Arroz meloso','Lomo a la parrilla','Salmón al limón','Pollo al romero','Pasta fresca','Verduras asadas']),[]);
 const start=e=>{e.stopPropagation();drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,p:progress};e.target.setPointerCapture?.(e.pointerId)};
 const move=e=>{if(!drag.current||drag.current.id!==e.pointerId)return;e.stopPropagation();const dx=drag.current.x-e.clientX,dy=drag.current.y-e.clientY;setProgress(Math.max(0,Math.min(1,drag.current.p+dx/360)));setDragY(Math.max(-1,Math.min(1,dy/300)))};
 const end=e=>{if(!drag.current||drag.current.id!==e.pointerId)return;drag.current=null;setProgress(v=>v>.5?1:0);setDragY(0)};
 return <div style={{height:'72vh',minHeight:520,background:'radial-gradient(circle at 50% 40%,#34291f,#0e0b09 72%)',touchAction:'none',borderRadius:18,overflow:'hidden'}}>
  <Canvas shadows camera={{position:[0,0,6.4],fov:42}} dpr={[1,1.7]}>
   <ambientLight intensity={1.25}/><directionalLight castShadow position={[2,4,5]} intensity={2.1}/>
   <mesh position={[-1.175,0,0]} receiveShadow><planeGeometry args={[2.35,3.55,1,1]}/><meshStandardMaterial map={leftTex} roughness={.9}/></mesh>
   <mesh position={[1.175,0,-.018]} receiveShadow><planeGeometry args={[2.35,3.55,1,1]}/><meshStandardMaterial map={underTex} roughness={.9}/></mesh>
   <mesh position={[0,0,-.035]}><planeGeometry args={[.075,3.58,1,1]}/><meshStandardMaterial color="#bda98a" roughness={1}/></mesh>
   <CurlPage progress={progress} dragY={dragY} frontTexture={frontTex} backTexture={backTex}/>
   <mesh position={[0,0,.18]} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
    <planeGeometry args={[4.9,3.8]}/><meshBasicMaterial transparent opacity={0} depthWrite={false}/>
   </mesh>
  </Canvas>
  <div style={{position:'absolute',left:-9999}}>Drag progress {progress}</div>
 </div>;
}
