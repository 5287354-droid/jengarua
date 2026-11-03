/* ========== BGM(Web Audioのチップチューン。楽譜はMML風の文字列) ========== */
/* 音名 c d e f g a b(+で#、-で♭)・数字は音の長さ(4=4分)・.で付点・r休符・o3など音域・< >で音域を上下・l8で既定の長さ。打楽器は k(低)s(中)h(高) */
const SONGS={
  komorebi:{bpm:96,ch:[
    {w:'p25',v:.045,o:5,m:'e4 g8 a8 g4 e8 d8 c4 d8 e8 g4. r8 a4 g8 e8 d4 c8 d8 e2 r4 r4 e4 g8 a8 >c4 <a8 g8 a4 g8 e8 d4. r8 c4 d8 e8 g4 e8 d8 c2 r2'},
    {w:'tri',v:.08,o:3,m:'c4 g4 c4 g4 a4 e4 a4 e4 f4 c4 f4 c4 g4 d4 g4 d4 c4 g4 c4 g4 f4 c4 f4 c4 a4 e4 g4 d4 c4 g4 c2'},
    {w:'nz',v:.02,m:'k4 r4 h4 r4'}]},
  kasumi:{bpm:132,ch:[
    {w:'p25',v:.04,o:5,m:'a8 r8 a8 >c8 <b8 a8 g8 e8 g4 a8 g8 e4 r4 d8 r8 d8 e8 g8 a8 >c8 d8 e4 d8 c8 <a4 r4 a8 r8 a8 >c8 <b8 a8 g8 e8 g4 a8 b8 >c4 d4 e8 d8 c8 <a8 g8 a8 >c8 <a8 a2 r2'},
    {w:'tri',v:.08,o:3,m:'a8 a8 >a8 <a8 a8 a8 >a8 <a8 f8 f8 >f8 <f8 f8 f8 >f8 <f8 g8 g8 >g8 <g8 g8 g8 >g8 <g8 a8 a8 >a8 <a8 e8 e8 >e8 <e8'},
    {w:'nz',v:.03,m:'k8 h8 s8 h8 k8 k8 s8 h8'}]},
  shiomi:{bpm:108,ch:[
    {w:'p25',v:.045,o:5,m:'c4. a8 g4 f4 g4. a8 f2 a4. >c8 <b-4 a4 g2. r4 c4. a8 g4 f4 d4. e8 f4 a4 g4. f8 e4 g4 f2. r4'},
    {w:'tri',v:.08,o:3,m:'f4 c4 a4 c4 b-4 f4 d4 f4 g4 d4 b-4 d4 c4 g4 e4 g4'},
    {w:'nz',v:.025,m:'k4 h8 h8 s4 h8 h8'}]},
  tengu:{bpm:100,ch:[
    {w:'p25',v:.045,o:5,m:'d4 f8 g8 a4 >c4 <a8 g8 f8 d8 f4 g4 a4 >c8 d8 c4 <a4 g2 a4 r4 d4 f8 g8 a4 >d4 c8 <a8 g8 f8 g4 a4 f8 g8 f8 d8 c4 d4 d2 r2'},
    {w:'tri',v:.09,o:3,m:'d4 r8 d8 a4 d4 c4 r8 c8 g4 c4'},
    {w:'nz',v:.04,m:'k4 r8 k8 s4 k8 k8 k4 r4 s4 r4'}]},
  mayoiga:{bpm:80,ch:[
    {w:'tri',v:.09,o:5,m:'e2 f4 a4 b2. r4 >c4 <b4 a4 f4 e1 a2 b4 >c4 <b4 a4 f4 a4 b2 f4 e4 e1'},
    {w:'p12',v:.025,o:3,m:'e1 e1 f1 e1'},
    {w:'nz',v:.02,m:'h2 r2 r2 s4 r4'}]},
  ryuhyo:{bpm:90,ch:[
    {w:'p12',v:.04,o:6,m:'f+4 a4 >d4 <c+2. e4 g4 b4 a2. f+4 a4 >d4 e4 d4 <b4 a4 g4 e4 d2.'},
    {w:'tri',v:.08,o:3,m:'d4 a4 >f+4 <a4 >c+4 e4 <e4 b4 >g4 <a4 >c+4 e4'},
    {w:'nz',v:.015,m:'h4 r4 h4'}]},
  battle:{bpm:160,ch:[
    {w:'p25',v:.04,o:5,m:'e8 e8 b8 e8 >d8 <e8 b8 a8 g8 a8 b8 g8 e4 r4 e8 e8 b8 e8 >d8 <e8 >e8 d8 c8 <b8 a8 b8 g4 r4 a8 a8 >c8 <a8 >e8 <a8 >c8 <b8 a8 g8 f+8 g8 e4 r4 f+8 g8 a8 b8 >c8 d8 e8 f+8 e4 <b4 e4 r4'},
    {w:'tri',v:.09,o:3,m:'e8 e8 >e8 <e8 e8 e8 >e8 <e8 c8 c8 >c8 <c8 c8 c8 >c8 <c8 a8 a8 >a8 <a8 a8 a8 >a8 <a8 b8 b8 >b8 <b8 b8 b8 >b8 <b8'},
    {w:'nz',v:.035,m:'k8 h8 s8 h8 k8 k8 s8 h8'}]},
  boss:{bpm:144,ch:[
    {w:'saw',v:.03,o:4,m:'d8 d8 d8 d8 f4 e4 d8 d8 d8 d8 a4 g+4 d8 d8 d8 d8 f4 g4 a8 b-8 a8 g8 a2 >d4. c8 <b-4 a4 g4. f8 e4 d4 c+4 d4 e4 f4 e2 a2'},
    {w:'tri',v:.1,o:2,m:'d8 d8 d8 d8 d8 d8 d8 d8 b-8 b-8 b-8 b-8 a8 a8 a8 a8'},
    {w:'nz',v:.04,m:'k8 k8 s8 k8 k8 k8 s8 s16 s16'}]},
  rival:{bpm:150,ch:[
    {w:'p25',v:.04,o:5,m:'g8 b8 >d4 <b8 >d8 g4 f+8 e8 d8 c8 <b4 a4 g8 b8 >d4 c8 e8 g4 f+8 g8 a8 f+8 g2 e8 f+8 g4 d8 e8 f+4 c8 d8 e4 <b8 >c8 d4 <a8 b8 >c8 d8 e8 f+8 g8 a8 g2 d2'},
    {w:'tri',v:.09,o:3,m:'g4 d4 g4 d4 c4 g4 d4 a4 e4 b4 c4 g4 d4 a4 g4 d4'},
    {w:'nz',v:.035,m:'k8 h8 s8 h8 k8 k8 s8 h8'}]},
  kyuubi:{bpm:152,ch:[
    {w:'p25',v:.04,o:5,m:'a8 b8 >c8 e8 f4 e4 c8 <b8 a8 b8 >c4 <a4 >e8 f8 e8 c8 <b4 a4 b8 >c8 <b8 a8 f4 e4 a8 b8 >c8 e8 f4 a4 g+8 f8 e8 c8 <b4 >c4 <a8 >c8 e8 f8 e4 c4 <a2 r4 e4'},
    {w:'tri',v:.09,o:3,m:'a8 a8 e8 a8 a8 a8 e8 a8 f8 f8 c8 f8 e8 e8 b8 e8'},
    {w:'nz',v:.045,m:'k8 k8 s8 r8 k8 r8 s8 s8'}]},
  nue:{bpm:138,ch:[
    {w:'saw',v:.03,o:4,m:'e8 f8 e8 b-8 a4 f4 e8 f8 e8 b8 >c4 <b-4 a8 b-8 a8 e8 f4 e4 d+8 e8 f8 b-8 a2 e8 f8 e8 b-8 >c4 d4 e8 f8 e8 c8 <b-4 a4 f8 e8 f8 a8 b-4 >c+4 d2 <e2'},
    {w:'tri',v:.1,o:2,m:'e8 e8 b-8 e8 e8 e8 b-8 e8 f8 f8 b8 f8 e8 e8 b-8 e8'},
    {w:'nz',v:.04,m:'k8 s8 k8 k8 s8 k8 s8 s8'}]},
  sorakujira:{bpm:96,ch:[
    {w:'p25',v:.045,o:5,m:'c2 g4 e4 f2 a4 >c4 <b2 g4 d4 e2. r4 c2 g4 >c4 <b-2 a4 f4 g4 a4 b4 >d4 c1'},
    {w:'tri',v:.1,o:3,m:'c2 e2 f2 a2 g2 d2 c2 e2 a2 e2 b-2 f2 g2 g2 c2 g2'},
    {w:'nz',v:.035,m:'k2 s2'}]},
  sakamata:{bpm:156,ch:[
    {w:'p25',v:.04,o:5,m:'b8 b8 >d8 <b8 >f+8 <b8 >e8 d8 c+8 d8 e8 c+8 <b4 a4 b8 b8 >d8 <b8 >g8 f+8 e8 d8 e8 f+8 d8 c+8 <b2 g8 a8 b8 >d8 e4 d4 c+8 d8 e8 f+8 g4 f+4 e8 d8 c+8 <b8 a8 b8 >c+8 d8 c+4 <f+4 b4 r4'},
    {w:'tri',v:.1,o:2,m:'b8 b8 >b8 <b8 b8 b8 >b8 <b8 g8 g8 >g8 <g8 a8 a8 >a8 <a8'},
    {w:'nz',v:.04,m:'k8 h8 s8 h8 k8 k8 s8 s8'}]},
  amanotsuru:{bpm:120,ch:[
    {w:'p25',v:.045,o:5,m:'d4 g4 b4 >d4 c4 <b8 a8 b2 a4 b8 >c8 d4 e4 d2. r4 e4 d4 c4 <b4 a4 g8 a8 b4 >d4 e4 f+4 g4 a4 g2 d2'},
    {w:'tri',v:.1,o:3,m:'g2 d2 e2 b2 c2 d2 g2 d2 c2 g2 d2 b2 c2 d2 g2 d2'},
    {w:'nz',v:.035,m:'k4 h4 s4 h4'}]},
};
const TOWN_BGM={komorebi:'komorebi',kasumi:'kasumi',shiomi:'shiomi',tengu:'tengu',mayoiga:'mayoiga',ryuhyo:'ryuhyo'};
const BOSS_BGM={tengu:'kyuubi',mayoiga:'nue',mayoiga_ura:'sorakujira',ryuhyo:'sakamata',ryuhyo_ura:'amanotsuru'};
const SONG_NAME={komorebi:'こもれび町',kasumi:'霞ヶ丘',shiomi:'潮見浜',tengu:'天狗岳',mayoiga:'マヨイガ',ryuhyo:'流氷岬',battle:'戦闘',boss:'ぬし戦',rival:'ライバル戦',kyuubi:'奥宮の九尾',nue:'迷い家の鵺',sorakujira:'雲海のソラクジラ',sakamata:'流氷の王者',amanotsuru:'オーロラのアマノツル'};
function parseMML(m,o0){
  const ev=[];let o=o0||4,l=4,t=0;const re=/([a-grksh])([+#-]?)(\d*)(\.?)|o(\d)|l(\d+)|([<>])/g;let x;
  const SEMI={c:0,d:2,e:4,f:5,g:7,a:9,b:11};
  while((x=re.exec(m))){
    if(x[5]){o=+x[5];continue;}if(x[6]){l=+x[6];continue;}if(x[7]){o+=x[7]==='>'?1:-1;continue;}
    let d=4/(x[3]?+x[3]:l);if(x[4])d*=1.5;
    const n=x[1];
    if(n==='r'){t+=d;continue;}
    if('ksh'.includes(n))ev.push({t,d,k:n});
    else{const s=SEMI[n]+(x[2]==='+'||x[2]==='#'?1:x[2]==='-'?-1:0),midi=12*(o+1)+s;ev.push({t,d,f:440*Math.pow(2,(midi-69)/12)});}
    t+=d;
  }
  return {ev,len:t};
}
const BGM={cur:null,song:null,chs:null,timer:null,gain:null,waves:{},noise:null};
function bgmCtx(){AC=AC||new (window.AudioContext||window.webkitAudioContext)();return AC;}
function pulseWave(ctx,duty){const n=32,re=new Float32Array(n),im=new Float32Array(n);for(let i=1;i<n;i++)im[i]=2/(i*Math.PI)*Math.sin(i*Math.PI*duty);return ctx.createPeriodicWave(re,im);}
function bgmNote(ctx,ch,e,at,spb){
  const dur=e.d*spb;
  if(e.k){
    if(!BGM.noise){const b=ctx.createBuffer(1,ctx.sampleRate*.3,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;BGM.noise=b;}
    const g=ctx.createGain(),v=ch.v*(e.k==='k'?1.6:e.k==='s'?1:.5);
    if(e.k==='k'){const o=ctx.createOscillator();o.type='sine';o.frequency.setValueAtTime(140,at);o.frequency.exponentialRampToValueAtTime(40,at+.12);g.gain.setValueAtTime(v*2.2,at);g.gain.exponentialRampToValueAtTime(.0001,at+.15);o.connect(g);g.connect(BGM.gain);o.start(at);o.stop(at+.17);return;}
    const s=ctx.createBufferSource();s.buffer=BGM.noise;const f=ctx.createBiquadFilter();f.type=e.k==='h'?'highpass':'bandpass';f.frequency.value=e.k==='h'?7000:1800;
    const len=e.k==='h'?.04:.11;g.gain.setValueAtTime(v,at);g.gain.exponentialRampToValueAtTime(.0001,at+len);s.connect(f);f.connect(g);g.connect(BGM.gain);s.start(at);s.stop(at+len+.02);return;
  }
  const o=ctx.createOscillator(),g=ctx.createGain();
  if(ch.w==='p25'||ch.w==='p12'){const k=ch.w;BGM.waves[k]=BGM.waves[k]||pulseWave(ctx,k==='p25'?.25:.125);o.setPeriodicWave(BGM.waves[k]);}
  else o.type=ch.w==='tri'?'triangle':ch.w==='saw'?'sawtooth':'square';
  o.frequency.setValueAtTime(e.f,at);
  const rel=Math.min(.08,dur*.3),end=at+dur*.92;
  g.gain.setValueAtTime(.0001,at);g.gain.linearRampToValueAtTime(ch.v,at+.008);g.gain.setValueAtTime(ch.v*.85,Math.max(at+.01,end-rel));g.gain.linearRampToValueAtTime(.0001,end);
  o.connect(g);g.connect(BGM.gain);o.start(at);o.stop(end+.02);
}
function bgmTick(){
  const ctx=AC;if(!ctx||!BGM.chs)return;const spb=60/SONGS[BGM.cur].bpm,ahead=ctx.currentTime+.3;
  for(const c of BGM.chs){
    if(!c.ev.length)continue;
    while(true){const e=c.ev[c.i],at=c.base+e.t*spb;if(at>ahead)break;if(at>=ctx.currentTime-.05)bgmNote(ctx,c.def,e,at,spb);c.i++;if(c.i>=c.ev.length){c.i=0;c.base+=c.len*spb;}}
  }
}
function bgmStop(){
  clearInterval(BGM.timer);BGM.timer=null;BGM.chs=null;
  if(BGM.gain&&AC){const g=BGM.gain;try{g.gain.setTargetAtTime(0,AC.currentTime,.08);setTimeout(()=>g.disconnect(),600);}catch(e){}}
  BGM.gain=null;
}
function bgmPlay(id){
  if(BGM.cur===id&&BGM.timer)return;
  bgmStop();BGM.cur=id;
  if(!id||!SONGS[id]||!state||!state.bgm)return;
  try{
    const ctx=bgmCtx();if(ctx.state==='suspended')ctx.resume().catch(()=>{});
    BGM.gain=ctx.createGain();BGM.gain.gain.value=state.bgmVol==null?.8:state.bgmVol;BGM.gain.connect(ctx.destination);
    const start=ctx.currentTime+.12;
    BGM.chs=SONGS[id].ch.map(def=>{const p=parseMML(def.m,def.o);return {def,ev:p.ev,len:p.len,i:0,base:start};});
    BGM.timer=setInterval(bgmTick,60);bgmTick();
  }catch(e){}
}
function bgmWanted(){
  if(!state||!state.started)return 'komorebi';
  if(B){
    if(B.boss){const k=B.ura?B.town+'_ura':B.town;return BOSS_BGM[k]||'boss';}
    if(B.rival)return 'rival';
    return 'battle';
  }
  return TOWN_BGM[state.town]||'komorebi';
}
function bgmUpdate(){const w=state&&state.bgm?bgmWanted():null;if(w!==BGM.cur||(w&&!BGM.timer))bgmPlay(w);}
document.addEventListener('pointerdown',()=>{if(AC&&AC.state==='suspended'&&state&&state.bgm)AC.resume().catch(()=>{});if(state&&state.bgm&&!BGM.timer)bgmUpdate();},true);
document.addEventListener('visibilitychange',()=>{if(!AC)return;if(document.visibilityState==='hidden')AC.suspend().catch(()=>{});else if(state&&(state.bgm||state.sound))AC.resume().catch(()=>{});});
