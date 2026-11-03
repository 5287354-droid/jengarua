Object.assign(SONGS,{
  gacha:{bpm:128,ch:[
    {w:'p12',v:.04,o:6,m:'c8 e8 g8 >c8 <b8 g8 e8 g8 a8 >c8 e8 c8 <a4 r4 f8 a8 >c8 f8 e8 c8 <a8 >c8 <g4 b4 >d4 r4 <c8 e8 g8 >c8 <b8 g8 e8 g8 a8 >c8 e8 c8 <a4 g4 f8 e8 d8 f8 e8 d8 c8 <b8 >c2 r2'},
    {w:'tri',v:.08,o:3,m:'c4 g4 e4 g4 f4 a4 f4 a4 d4 f4 g4 b4 c4 g4 c2'},
    {w:'nz',v:.03,m:'k8 h8 s8 h8'}]},
  tower:{bpm:112,ch:[
    {w:'p25',v:.04,o:5,m:'a8 >c8 e8 a8 g8 e8 c8 <b8 a4 e4 a2 f8 a8 >c8 f8 e8 c8 <a8 g8 f4 c4 f2 d8 f8 a8 >d8 c8 <a8 f8 e8 d4 a4 >d2 <e8 g+8 b8 >e8 d8 <b8 g+8 e8 e2 r2'},
    {w:'tri',v:.1,o:2,m:'a4 a4 a4 a4 f4 f4 f4 f4 d4 d4 d4 d4 e4 e4 e4 e4'},
    {w:'nz',v:.035,m:'k4 h8 h8 s4 h8 k8'}]},
});
Object.assign(SONG_NAME,{gacha:'星降りの祠',tower:'星界の塔'});
SCENES.tower=s=>{s.L(0,0,192,72,'#070a1c');for(let i=0;i<70;i++)s.L((i*53)%192,(i*29)%72,1,1,i%4?'#b8c4f0':'#ffffff');
  s.x.fillStyle='rgba(154,138,242,.25)';for(let i=0;i<192;i+=2){const y=20+Math.sin(i/20)*8;s.x.fillRect(i,y,2,10);}
  s.L(78,8,36,64,'#2a2e48');s.L(82,8,28,64,'#363a5a');for(let y=12;y<72;y+=10){s.L(78,y,36,1,'#1a1e34');s.L(92,y+3,8,5,'#f6d27a');}
  s.L(74,4,44,5,'#4a4e70');s.L(94,0,4,4,'#ffe08a');s.L(0,64,192,8,'#1a1e34');};
