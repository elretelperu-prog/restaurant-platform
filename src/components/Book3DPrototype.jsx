import React,{useMemo,useRef,useState} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import * as THREE from 'three';

function makePageTexture(title,subtitle,items=['Croquetas de jamón','Bruschetta mediterránea','Calamares crujientes','Ensalada burrata','Patatas bravas','Tartar de atún'],mirror=false){
 const c=document.createElement('canvas');c.width=768;c.height=1200;
 const x=c.getContext('2d');if(mirror){x.translate(c.width,0);x.scale(-1,1)}x.fillStyle='#fff7df';x.fillRect(0,0,c.width,c.height);
 const g=x.createLinearGradient(0,0,c.width,0);g.addColorStop(0,'#ead9b8');g.addColorStop(.12,'#fffaf0');g.addColorStop(.88,'#fffaf0');g.addColorStop(1,'#e4cfaa');x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
 x.fillStyle='#3a281d';x.textAlign='center';x.font='700 58px Georgia';x.fillText(title,384,150);x.font='26px Arial';x.fillText(subtitle,384,205);
 x.textAlign='left';x.font='32px Georgia';items.forEach((n,i)=>{const y=330+i*125;x.fillText(n,90,y);x.font='22px Arial';x.fillStyle='#795f49';x.fillText('Preparado al momento · receta de la casa',90,y+34);x.textAlign='right';x.fillStyle='#3a281d';x.font='700 25px Arial';x.fillText('S/ '+(10+i*3),680,y);x.textAlign='left';x.font='32px Georgia';});
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;t.flipY=false;return t;
}
function CurlPage({progress,dragY=0,frontTexture,backTexture}){
 const mesh=useRef();
 const geometry=useMemo(()=>new THREE.PlaneGeometry(2.35,3.55,36,18),[]);
 useFrame(()=>{
  const p=geometry.attributes.position,arr=p.array;
  for(let i=0;i<p.count;i++){
   const baseX=geometry.parameters.width*((i%(geometry.parameters.widthSegments+1))/geometry.parameters.widthSegments-.5);
   const row=Math.floor(i/(geometry.parameters.widthSegments+1));
   const baseY=geometry.parameters.height*(row/geometry.parameters.heightSegments-.5);
   const local=baseX+1.175;
   const u=Math.max(0,Math.min(1,local/2.35));
   const v=(baseY/3.55)+.5;
   const cornerBias=(1-u)*.22+(v*.12)-(dragY*.10*(1-u));
   const phase=Math.max(0,Math.min(1,progress*1.22-cornerBias));
   const eased=phase*phase*(3-2*phase);
   const a=Math.PI*eased;
   const curl=Math.sin(Math.PI*u)*Math.sin(Math.PI*phase)*(.16+.18*(1-v));
   arr[i*3]=local*Math.cos(a);
   arr[i*3+1]=baseY+dragY*.16*Math.sin(Math.PI*u)*Math.sin(a);
   arr[i*3+2]=Math.max(.012,local*Math.sin(a)+curl);
  }
  p.needsUpdate=true;geometry.computeVertexNormals();
 });
 return <group position={[0,0,.035]}>
  <mesh ref={mesh} geometry={geometry}><meshStandardMaterial map={frontTexture} side={THREE.FrontSide} roughness={.88}/></mesh>
  <mesh geometry={geometry}><meshStandardMaterial map={backTexture} side={THREE.BackSide} roughness={.9}/></mesh>
 </group>;
}
export default function Book3DPrototype(){
 const [progress,setProgress]=useState(0),[dragY,setDragY]=useState(0),drag=useRef(null);
 const frontTex=useMemo(()=>makePageTexture('Platos principales','PÁGINA 2'),[]);
 const backTex=useMemo(()=>makePageTexture('Entrantes','PÁGINA 3',['Carpaccio de res','Gambas al ajillo','Pulpo a la brasa','Burrata italiana','Ceviche clásico','Tabla de quesos'],true),[]);
 const leftTex=useMemo(()=>makePageTexture('Terraza','PÁGINA 1',['Pan de la casa','Aceitunas marinadas','Ensalada verde','Sopa del día','Jamón ibérico','Tortilla española']),[]);
 const underTex=useMemo(()=>makePageTexture('Especialidades','PÁGINA 4',['Arroz meloso','Lomo a la parrilla','Salmón al limón','Pollo al romero','Pasta fresca','Verduras asadas']),[]);
 const start=e=>{e.stopPropagation();drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,p:progress};e.target.setPointerCapture?.(e.pointerId)};
 const move=e=>{if(!drag.current||drag.current.id!==e.pointerId)return;e.stopPropagation();const dx=drag.current.x-e.clientX,dy=drag.current.y-e.clientY;setProgress(Math.max(0,Math.min(1,drag.current.p+dx/260)));setDragY(Math.max(-1,Math.min(1,dy/220)))};
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
