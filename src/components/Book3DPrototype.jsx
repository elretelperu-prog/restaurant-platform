import React,{useMemo,useRef,useState} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import * as THREE from 'three';

function makePageTexture(title,subtitle){
 const c=document.createElement('canvas');c.width=768;c.height=1200;
 const x=c.getContext('2d');x.fillStyle='#fff7df';x.fillRect(0,0,c.width,c.height);
 const g=x.createLinearGradient(0,0,c.width,0);g.addColorStop(0,'#ead9b8');g.addColorStop(.12,'#fffaf0');g.addColorStop(.88,'#fffaf0');g.addColorStop(1,'#e4cfaa');x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
 x.fillStyle='#3a281d';x.textAlign='center';x.font='700 58px Georgia';x.fillText(title,384,150);x.font='26px Arial';x.fillText(subtitle,384,205);
 x.textAlign='left';x.font='32px Georgia';['Croquetas de jamón','Bruschetta mediterránea','Calamares crujientes','Ensalada burrata','Patatas bravas','Tartar de atún'].forEach((n,i)=>{const y=330+i*125;x.fillText(n,90,y);x.font='22px Arial';x.fillStyle='#795f49';x.fillText('Preparado al momento · receta de la casa',90,y+34);x.textAlign='right';x.fillStyle='#3a281d';x.font='700 25px Arial';x.fillText('S/ '+(10+i*3),680,y);x.textAlign='left';x.font='32px Georgia';});
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;t.flipY=true;return t;
}
function CurlPage({progress,dragY=0,texture}){
 const geometry=useMemo(()=>{
  const g=new THREE.PlaneGeometry(2.35,3.55,56,36);
  g.translate(1.175,0,0);
  g.userData.base=Float32Array.from(g.attributes.position.array);
  return g;
 },[]);
 useFrame(()=>{
  const p=geometry.attributes.position,arr=p.array,base=geometry.userData.base;
  const W=2.35,H=3.55;
  for(let i=0;i<p.count;i++){
   const bx=base[i*3],by=base[i*3+1],u=bx/W,v=by/H+.5;
   const wave=Math.sin(Math.PI*u);
   const edge=Math.pow(u,2.15);
   const theta=progress*Math.PI*.82*edge;
   const turnedX=bx*Math.cos(theta);
   const z=bx*Math.sin(theta)*(.30+.20*u)+wave*progress*.045;
   arr[i*3]=bx+(turnedX-bx)*progress;
   arr[i*3+1]=by+dragY*.07*edge*progress;
   arr[i*3+2]=Math.max(.008,z);
  }
  p.needsUpdate=true;geometry.computeVertexNormals();
 });
 return <mesh geometry={geometry} position={[0,0,.035]}>
  <meshStandardMaterial map={texture} side={THREE.DoubleSide} roughness={.9}/>
 </mesh>;
}
export default function Book3DPrototype(){
 const [progress,setProgress]=useState(0),[dragY,setDragY]=useState(0),drag=useRef(null);
 const tex=useMemo(()=>makePageTexture('Platos principales','PROTOTIPO 3D · PÁGINA DERECHA'),[]);
 const start=e=>{e.stopPropagation();};
 const move=e=>{e.stopPropagation();};
 const end=e=>{e.stopPropagation();};
 return <div style={{height:'100dvh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center',background:'radial-gradient(circle at 50% 40%,#34291f,#0e0b09 72%)',touchAction:'none',overflow:'hidden'}}>
  <div style={{width:'88vw',height:'82dvh',maxWidth:760,position:'relative'}}>
  <Canvas orthographic camera={{position:[0,0,10],zoom:1}} dpr={[1,1.7]} onCreated={({camera,size})=>{camera.left=-2.75;camera.right=2.75;camera.top=.713;camera.bottom=-.713;camera.updateProjectionMatrix();}}>
   <ambientLight intensity={1.5}/><directionalLight position={[2,4,5]} intensity={2.1}/>
   <mesh position={[-1.175,0,0]}><planeGeometry args={[2.35,3.55,1,1]}/><meshStandardMaterial color="#fff7df" roughness={.9}/></mesh>
   <CurlPage progress={progress} dragY={dragY} texture={tex}/>
   <mesh position={[0,0,.18]} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
    <planeGeometry args={[4.9,3.8]}/><meshBasicMaterial transparent opacity={0} depthWrite={false}/>
   </mesh>
  </Canvas>
  <div style={{position:'absolute',left:-9999}}>Drag progress {progress}</div>
  </div>
 </div>;
}
