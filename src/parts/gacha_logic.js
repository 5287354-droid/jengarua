/* ----- ガチャ・流星石・デイリー・星界の塔 ----- */
const GACHA={c1:100,c10:1000,rate:[[8,.03],[7,.15],[6,.82]],pity:100};
const gachaPool=r=>SPL.filter(s=>s.gacha&&s.rank===r&&r<=8);
const dexList=()=>SPL.filter(s=>!s.gacha);
const isGacha=m=>!!(m&&SP[m.sp]&&SP[m.sp].gacha);
const tmaxOf=m=>isGacha(m)?25:TMAX;
const capFor=(spId,plus)=>SP[spId].gacha?Math.min(GACHA_LV[SP[spId].rank]||120,60+plus*5):Math.min(99,30+plus*4);
function dayKey(off=0){const d=new Date(Date.now()+off*864e5);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function weekPickup(){const w=Math.floor((Date.now()/864e5+3)/7),ps=gachaPool(8);const end=new Date((w*7-3+7)*864e5);return {sp:ps[w%ps.length].id,end};}
function addStars(n,why){state.stars=(state.stars||0)+n;if(why)ui.starNote=`★${n} ${why}`;}
function firstOwn(id){if(!state.owned[id]&&SP[id]&&!SP[id].gacha)addStars(10,'はじめてなかまにした種族');}
function dailyRoll(){const t=dayKey();if(!state.daily||state.daily.d!==t)state.daily={d:t,ex:0,win:0,br:0,got:{}};}
function dailyInc(k){if(!state||!state.started)return;dailyRoll();state.daily[k]=(state.daily[k]||0)+1;}
const MISSIONS=[{k:'ex',n:'探索する',goal:10,rw:50},{k:'win',n:'戦闘で勝つ',goal:5,rw:50},{k:'br',n:'配合する',goal:1,rw:50},{k:'all',n:'上の3つをすべて受け取る',goal:3,rw:100}];
const missionVal=k=>k==='all'?['ex','win','br'].filter(x=>state.daily.got[x]).length:(state.daily[k]||0);
const missionReady=()=>{dailyRoll();return MISSIONS.filter(x=>!state.daily.got[x.k]&&missionVal(x.k)>=x.goal).length;};
function loginBonus(){
  if(!state.started)return null;
  const t=dayKey(),y=dayKey(-1),L=state.login||{last:'',streak:0};
  if(L.last===t)return null;
  const streak=L.last===y?L.streak+1:1;state.login={last:t,streak};
  const g=100+(streak%7===0?500:0);addStars(g);dailyRoll();save();
  return {g,streak};
}
function loginCheck(){const r=loginBonus();if(r&&!B){ui.toast=`ログインボーナス ★${r.g}(${r.streak}日連続${r.streak%7===0?' ・ 7日ごとのボーナス！':''})`;render();}}
function gachaRetro(){
  if(state.flags.gacha||!state.started)return;
  state.flags.gacha=true;
  const own=dexList().filter(s=>state.owned[s.id]).length,boss=Object.keys(state.boss).length,cups=Object.keys(state.cups).length,req=Object.keys(state.reqDone).length,dm=Object.keys(state.dexClaim).length;
  const g=1000+own*10+boss*300+cups*200+req*30+dm*100;
  addStars(g);state.gpity=state.gpity||0;save();
  talk([['ハザマ所長','たいへんじゃ！ 研究所の裏の祠に、夜空から星が降ってきおった。'],['ハザマ所長','「星降りの祠」に流星石をそなえると、星座や四神の力をもつ魔生物が降りてくるらしい。'],['ハザマ所長','これまでのきみの冒険をたたえて、流星石を'+g.toLocaleString()+'個わたそう。「ガチャ」の画面からためしてみなさい。'],['ハザマ所長','流星石は、毎日のログインやデイリーミッション、はじめて仲間にした種族、ぬしの初撃破、それに新しく見つかった「星界の塔」でも手に入るぞ。']]);
}
function rollRank(guar){
  state.gpity=(state.gpity||0)+1;
  if(state.gpity>=GACHA.pity){state.gpity=0;return {r:8,pity:true};}
  const x=Math.random();let acc=0,r=6;for(const [rk,p] of GACHA.rate){acc+=p;if(x<acc){r=rk;break;}}
  if(guar&&r<7)r=7;if(r===8)state.gpity=0;return {r};
}
function gachaPull(n){
  const cost=n===10?GACHA.c10:GACHA.c1;if((state.stars||0)<cost)return;
  state.stars-=cost;const pu=weekPickup().sp,out=[];
  for(let i=0;i<n;i++){
    const {r,pity}=rollRank(n===10&&i===9&&!out.some(o=>o.r>=7));
    let sp;if(r===8&&(pity||Math.random()<.5))sp=pu;else sp=pick(gachaPool(r)).id;
    const tl={6:[6,13],7:[9,15],8:[12,17]}[r];
    const isNew=!state.owned[sp];
    const m=newMon(sp,10,{talent:randTalent(tl[0],tl[1])});m.gen=0;
    if(Math.random()<1/40){m.shiny=true;STATS.forEach(k=>m.talent[k]=Math.min(17,m.talent[k]+1));}
    addMon(m);out.push({uid:m.uid,r,isNew});
  }
  const mx=Math.max(...out.map(o=>o.r));
  ui.gacha={list:out,mx,n};state.gpulls=(state.gpulls||0)+n;save();sfx(mx>=8?'shiny':'breed');render();
}
function renderGachaResult(){
  const g=ui.gacha,sc={6:'#7fc3f2',7:'#ff9ad8',8:'#ffd36a'}[g.mx];
  const title=g.mx>=8?'SSS 神話降臨！！':g.mx>=7?'SS 銀河級 確定！':'S 星級';
  const cards=g.list.map((o,i)=>{const m=findMon(o.uid);if(!m)return '';const sp=SP[m.sp];return `<div class="gcard r${o.r}" style="--i:${i}">${seal(m.sp,'lg',true,m.shiny)}<b class="gname">${esc(sp.name)}</b><span class="grank">${RANKS[o.r]} ${RANK_TITLE[o.r]}</span>${o.isNew?'<i class="mk nw">NEW</i>':''}</div>`;}).join('');
  return `<div class="gmodal" role="dialog" aria-label="ガチャの結果" style="--sc:${sc}"><div class="gsky"></div><i class="gstar"></i><i class="gstar g2"></i><i class="gflash"></i>
    <h2 class="gtitle r${g.mx}">${title}</h2><div class="gres">${cards}</div>
    <div class="row center gbtns"><button class="btn primary" data-act="gpull" data-n="${g.n}" ${(state.stars||0)>=(g.n===10?GACHA.c10:GACHA.c1)?'':'disabled'}>もう一度(★${g.n===10?GACHA.c10:GACHA.c1})</button><button class="btn" data-act="gview">なかまを見る</button><button class="btn" data-act="gclose">とじる</button></div></div>`;
}
function renderGacha(){
  dailyRoll();const pu=weekPickup(),ps=SP[pu.sp],st=state.stars||0;
  const rows=[8,7,6].map(r=>`<div class="glist"><span class="grank r${r}">${RANKS[r]} ${RANK_TITLE[r]} ・ ${Math.round(GACHA.rate.find(x=>x[0]===r)[1]*1000)/10}%</span><div class="minis">${gachaPool(r).map(s=>`<span class="mini" title="${s.name}">${seal(s.id,'xs',state.seen[s.id]||state.owned[s.id]?true:'sil')}</span>`).join('')}</div></div>`).join('');
  const L=state.login||{streak:0};
  const ms=MISSIONS.map(x=>{const v=missionVal(x.k),got=state.daily.got[x.k],ok=v>=x.goal;return `<div class="ms ${ok&&!got?'ok':''}"><span class="small">${x.n} <span class="num muted">${Math.min(v,x.goal)}/${x.goal}</span></span><b class="num hl">★${x.rw}</b>${got?'<span class="badge good">受取済み</span>':`<button class="btn sm ${ok?'primary':''}" data-act="mission" data-k="${x.k}" ${ok?'':'disabled'}>受け取る</button>`}</div>`;}).join('');
  return `<section class="stack">
    <div class="panel gshrine stack"><span class="eyebrow">ガチャ限定 ・ ステータス上限なし</span><div class="row between"><h2>星降りの祠</h2><b class="stars num">★ ${st.toLocaleString()}</b></div>
      <div class="gpick"><div class="gpick-sp">${seal(pu.sp,'xl',true)}</div><div class="stack tight"><span class="tag warn">今週のピックアップ</span><h3>${ps.name}</h3><span class="small">SSS ${RANK_TITLE[8]} ・ ${FAM[ps.fam].n} ・ ${pu.end.getMonth()+1}月${pu.end.getDate()}日まで</span><p class="small muted">${ps.desc}</p><p class="small hl">SSSが出たときの半分は、ピックアップの${ps.name}。</p></div></div>
      <div class="row center"><button class="btn primary big" data-act="gpull" data-n="1" ${st>=GACHA.c1?'':'disabled'}>1回 ★${GACHA.c1}</button><button class="btn danger-fill big" data-act="gpull" data-n="10" ${st>=GACHA.c10?'':'disabled'}>10連 ★${GACHA.c10}</button></div>
      <p class="small center-t">10連は<b class="hl">SS以上1体確定</b> ・ 天井まであと<b class="hl num">${GACHA.pity-(state.gpity||0)}回</b>(${GACHA.pity}回でピックアップSSS確定)</p>
      <details class="rules"><summary>排出される魔生物と確率</summary><div class="stack" style="margin-top:8px">${rows}
        <p class="small muted">ガチャ産の魔生物はLv10で生まれる。ランクごとにレベル上限が高く(S 120・SS 150・SSS 200・創世 250)、能力値の上限999もなくなる。才能は25(SSS)まで伸ばせる。+値1ごとにレベル上限が5上がる(+0で60)。</p>
        <p class="small muted">創世ランクはガチャからは出ない。四神(SSS)をLv80以上にして「覚醒の宝珠」を使うと「真」の姿に覚醒する。四神どうしの特殊配合からは「コウリュウ」が生まれる。</p></div></details></div>
    <div class="panel stack"><div class="row between"><h3>デイリーミッション</h3><span class="small muted">ログイン ${L.streak||0}日連続(毎日★100、7日ごとに★500)</span></div><div class="mslist">${ms}</div></div>
    <div class="panel stack"><h4>流星石の手に入れかた</h4><ul class="small" style="margin:0;padding-left:1.2em">
      <li>毎日のログイン ★100(7日連続ごとに +★500)</li><li>デイリーミッション 1日 最大★250</li><li>はじめて仲間にした種族 ★10 ・ 依頼の達成 ★30 ・ 図鑑の記念品 ★100</li>
      <li>ぬしの初撃破 ★300(裏のぬし ★500)・ 配合杯の初優勝 ★200</li><li>星界の塔の初踏破 1階ごと★30(5階ごとのボス★200)</li><li>コンビニの交換所(10,000円で★20、1日5回まで)</li></ul></div></section>`;
}
/* ----- 星界の塔 ----- */
const towerOpen=()=>!!state.boss.tengu;
const towerLv=n=>30+n*4;
function towerFoes(n){
  const boss=n%5===0,lv=towerLv(n),plus=Math.floor(n/3);
  const rlo=Math.min(6,3+Math.floor(n/6)),rhi=Math.min(7,4+Math.floor(n/5));
  const norm=dexList().filter(s=>s.rank>=rlo&&s.rank<=rhi&&s.fam!=='metal');
  const gr=n<10?[6]:n<20?[6,7]:n<30?[7,8]:[8,9];
  const gp=SPL.filter(s=>s.gacha&&gr.includes(s.rank));
  const gch=Math.min(.6,.1+n*.02);
  const one=()=>[Math.random()<gch?pick(gp).id:pick(norm).id,lv+ri(-1,1),plus];
  const foes=[one(),one(),one()];
  if(boss){const top=Math.max(...gr),bp=SPL.filter(s=>s.gacha&&s.rank===top);foes[1]=[pick(bp).id,lv+2,plus+2];}
  return foes;
}
function startTower(n){
  if(!towerOpen()||n>(state.tower||0)+1||n<1)return;
  startBattle(towerFoes(n),{tower:n,towerBoss:n%5===0,trainer:'星界の番人',field:`星界の塔 ${n}階${n%5===0?' ・ 番人の間':''}`,scene:'tower'});
}
function towerReward(n){return {stars:n%5===0?200:30,kakusei:n%10===0?1:0,tenpu:n%10===0?1:0};}
function renderTower(){
  if(!towerOpen())return `<section class="panel stack"><h2>星界の塔</h2><p class="muted">天狗岳の奥宮のぬしを鎮めると、夜空に塔があらわれる。</p></section>`;
  const best=state.tower||0,next=best+1,pick5=[];for(let i=Math.max(1,next-4);i<=next;i++)pick5.push(i);
  const fl=n=>{const rw=towerReward(n),done=n<=best;return `<div class="cuprow ${done?'won':''}"><span class="rankbadge">${n}</span><div class="stack tight"><b>${n}階${n%5===0?' ・ 番人の間':''}</b><span class="small muted">敵Lv${towerLv(n)}前後 ・ ${done?'踏破済み(再挑戦で★5)':`初踏破 ★${rw.stars}${rw.kakusei?' ・ 覚醒の宝珠':''}${rw.tenpu?' ・ 天賦の宝珠':''}`}</span></div><button class="btn sm ${n===next?'primary':''}" data-act="tower" data-n="${n}" ${state.party.some(m=>m.hp>0)?'':'disabled'}>挑む</button></div>`;};
  const boss=[];for(let i=5;i<=best;i+=5)if(!pick5.includes(i))boss.push(i);
  return `<section class="stack"><div class="hero"><img class="scene" src="${scene('tower',3)}" alt=""><div class="hero-title"><span class="eyebrow">高難易度ダンジョン</span><h1 class="logo">星界の塔</h1></div></div>
    <p class="muted desc">夜空から降りてきた果てしない塔。上の階ほど敵が強くなり、ガチャ限定の魔生物も番人として立ちはだかる。勝つとHPとMPはそのままで次の階へ進める。負けても円は落とさない。</p>
    <div class="panel stack"><div class="row between"><h3>階をえらぶ</h3><span class="lv num">最高 ${best}階</span></div><div class="list">${pick5.reverse().map(fl).join('')}</div>
    ${boss.length?`<h4>番人の間(再挑戦)</h4><div class="list">${boss.slice(-6).reverse().map(fl).join('')}</div>`:''}</div>
    <div class="panel stack"><h4>報酬</h4><p class="small">初めて踏破した階: ★30。5階ごとの番人の間: ★200。10階ごとに「覚醒の宝珠」と「天賦の宝珠」。経験値もたっぷりもらえる。</p></div></section>`;
}
