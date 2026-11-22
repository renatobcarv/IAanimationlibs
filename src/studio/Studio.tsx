import React, {useMemo,useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls,Stars} from '@react-three/drei';
import {DURATION,SHOTS,shotAt} from '../engine/timeline';
import libraryCatalog from '../../catalog/libraries.json';
import {Scene} from '../engine/Scene';

type Tab='scene'|'libraries';
export default function Studio(){
 const [tab,setTab]=useState<Tab>('scene');
 const [time,setTime]=useState(1.5);
 const [playing,setPlaying]=useState(true);
 const [speed,setSpeed]=useState(1);
 const [query,setQuery]=useState('');
 const current=shotAt(time);
 const sources=useMemo(()=>libraryCatalog.libraries.filter(l=>(l.title+' '+l.provider+' '+l.tags.join(' ')).toLowerCase().includes(query.toLowerCase())),[query]);
 return <main className="shell">
  <aside className="sidebar">
   <div className="brand"><span className="brandmark">◈</span><span><b>IA Animation</b><small>LIBRARIES / MOTION STUDIO</small></span></div>
   <p className="sideheading">WORKSPACE</p>
   <button className={tab==='scene'?'nav active':'nav'} onClick={()=>setTab('scene')}>◉ &nbsp; Scene Studio</button>
   <button className={tab==='libraries'?'nav active':'nav'} onClick={()=>setTab('libraries')}>▦ &nbsp; Asset Libraries</button>
   <p className="sideheading">PROJETO</p>
   <div className="assetblock"><strong>Forest Encounter</strong><small>Demo procedural · 18s</small><span className="status">● Ready to preview</span></div>
   <div className="sidefooter">CLAUDE CODE + THREE.JS <br/> SHADERS · TIMELINE · ASSETS</div>
  </aside>
  <section className="workspace">
   <header className="topbar"><div><h1>{tab==='scene'?'Scene Studio':'Asset Libraries'}</h1><p>{tab==='scene'?'Editor cinematográfico · Prévia demonstrativa':'Fontes oficiais, licenças e importação de assets'}</p></div><span className="topbadge">{tab==='scene'?'DEMO / PREVIEW':'11 SOURCES'}</span></header>
   {tab==='scene'?<>
    <div className="viewer">
      <Canvas shadows camera={{position:[7,5,9],fov:43}} gl={{antialias:true}} dpr={[1,1.75]}>
       <color attach="background" args={['#0c1018']}/>
       <fog attach="fog" args={['#111b25',9,30]}/>
       <ambientLight intensity={1.4}/>
       <directionalLight position={[5,10,4]} intensity={2.6} castShadow/>
       <pointLight position={[-5,3,-2]} intensity={25} color="#ff7350" distance={14}/>
       <Scene time={time} playing={playing} speed={speed} onTick={setTime}/>
       <Stars radius={50} depth={35} count={350} factor={2} saturation={0} fade speed={0.25}/>
       <OrbitControls enablePan={false} minDistance={5} maxDistance={18} target={[0,1,0]}/>
      </Canvas>
      <div className="viewlabel">SCENE 001 / FOREST ENCOUNTER</div><div className="viewinfo">WebGL · Realtime demo</div>
    </div>
    <div className="transport">
      <button onClick={()=>setPlaying(p=>!p)}>{playing?'Ⅱ Pausar':'▶ Reproduzir'}</button>
      <input aria-label="Tempo" type="range" min="0" max={DURATION} step="0.01" value={time} onChange={e=>setTime(Number(e.target.value))}/>
      <span className="timecode">{time.toFixed(1)}s / {DURATION}s</span>
      <select value={speed} onChange={e=>setSpeed(Number(e.target.value))} aria-label="Velocidade"><option value={0.5}>0.5×</option><option value={1}>1×</option><option value={1.5}>1.5×</option></select>
    </div>
    <section className="panel"><div className="sectionhead"><h2>Storyboard / Timeline</h2><small>4 shots · {DURATION} seconds</small></div><div className="shots">{SHOTS.map(s=><button key={s.id} className={current.id===s.id?'shot selected':'shot'} onClick={()=>{setTime(s.start);setPlaying(false)}}><b>{s.label}</b><span>{s.description}</span><small>{s.start}–{s.end}s</small></button>)}</div></section>
    <section className="panel"><div className="sectionhead"><h2>Integração de assets externos</h2></div><p className="muted">Esta cena usa geometrias procedurais de demonstração. Para utilizar personagens GLB, animações Mixamo e cenários baixados, abra Asset Libraries e consulte a documentação do importador.</p><button onClick={()=>setTab('libraries')}>Abrir bibliotecas →</button></section>
   </>:<>
    <section className="panel"><div className="sectionhead"><h2>Catálogo centralizado</h2><small>{sources.length} resultados</small></div><p className="muted">Links para bibliotecas oficiais. Arquivos não são distribuídos neste repositório; importe downloads permitidos com <code>python scripts/import_assets.py</code>.</p><input className="search" placeholder="Buscar personagens, RPG, animações, florestas..." value={query} onChange={e=>setQuery(e.target.value)}/><div className="catalog">{sources.map(s=><article className="source" key={s.id}><div className="sourcehead"><strong>{s.title}</strong><span>{s.category}</span></div><small>{s.provider} · {s.method}</small><div className="tags">{s.tags.map(tag=><em key={tag}>{tag}</em>)}</div><div className="sourcefoot"><small>Licença: {s.license}</small><a href={s.url} target="_blank" rel="noopener noreferrer">Site oficial ↗</a></div></article>)}</div></section>
   </>}
  </section>
 </main>
}
