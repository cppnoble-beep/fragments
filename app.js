const $=s=>document.querySelector(s),esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const pages=['home','journal','poetry','about','notes'];
function route(){const h=(location.hash||'#home').slice(1);const p=pages.includes(h)?h:'home';
 pages.forEach(id=>$('#'+id).hidden=id!==p);const el=$('#'+p);el.classList.remove('in');void el.offsetWidth;el.classList.add('in');scrollTo(0,0);
 document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.hash==='#'+p));}
addEventListener('hashchange',route);
function showWord(w){$('#wotd').innerHTML=`<b>${esc(w[0])}</b>${esc(w[1])}`;try{localStorage.setItem('frag_word',JSON.stringify(w))}catch(e){}}
let saved;try{saved=JSON.parse(localStorage.getItem('frag_word'))}catch(e){}
showWord(saved||pick(WORDS));
$('#embrace').onclick=()=>showWord(pick(WORDS));
let favs=[];try{favs=JSON.parse(localStorage.getItem('frag_fav'))||[]}catch(e){}let favOnly=false;
const vr=v=>`<div class="v"><b>${esc(v[0])}</b><p>${esc(v[1])}</p><button class="fav" data-r="${esc(v[0])}" aria-pressed="${favs.includes(v[0])}" aria-label="Save verse">${favs.includes(v[0])?'♥':'♡'}</button></div>`;
function showVerse(v){$('#vtext').textContent='“'+v[1]+'”';$('#vref').textContent=v[0]}
showVerse(pick(VERSES));$('#vnext').onclick=()=>showVerse(pick(VERSES));
function render(q=''){q=q.toLowerCase().trim();
 const wf=WORDS.filter(w=>!q||(w[0]+w[1]).toLowerCase().includes(q)),vf=VERSES.filter(v=>(!q||(v[0]+v[1]).toLowerCase().includes(q))&&(!favOnly||favs.includes(v[0])));
 $('#words').innerHTML=wf.map(w=>`<button class="w" data-i="${WORDS.indexOf(w)}"><b>${esc(w[0])}</b><span>${esc(w[1])}</span></button>`).join('')||'<div class="empty">nothing found.</div>';
 $('#verses').innerHTML=vf.map(vr).join('')||'<div class="empty">nothing found.</div>';}
render();
$('#words').onclick=e=>{const b=e.target.closest('.w');if(b){showWord(WORDS[b.dataset.i]);location.hash='#home'}};
$('#srchBtn').onclick=()=>{const s=$('#searchbar');s.hidden=!s.hidden;if(!s.hidden)$('#q').focus()};
$('#q').oninput=e=>{render(e.target.value);if(e.target.value&&!['poetry','notes'].includes(location.hash.slice(1)))location.hash='#poetry'};
const MOODS=['😊','😌','😐','😔','😢','😰','😡'];let mood='😌';
$('#moods').innerHTML=MOODS.map(m=>`<button type="button" aria-label="mood ${m}" aria-pressed="${m===mood}">${m}</button>`).join('');
$('#moods').onclick=e=>{const b=e.target.closest('button');if(!b)return;mood=b.textContent;[...$('#moods').children].forEach(x=>x.setAttribute('aria-pressed',x===b))};
let entries=[];try{entries=JSON.parse(localStorage.getItem('frag_journal'))||[]}catch(e){}
const store=()=>{try{localStorage.setItem('frag_journal',JSON.stringify(entries))}catch(e){}};
function drawJ(){$('#jcount').textContent=entries.length;stats();
 $('#jlist').innerHTML=entries.length?entries.map(x=>`<article class="entry"><h4>${x.mood} ${esc(x.title||'untitled')}</h4><small>${new Date(x.id).toLocaleString('en-US',{dateStyle:'medium',timeStyle:'short'})}</small><p>${esc(x.text)}</p><button class="del" data-id="${x.id}">delete</button></article>`).join(''):'<div class="empty">no entries yet. write your first one. 🌱</div>';}
$('#jsave').onclick=()=>{const text=$('#jtext').value.trim();if(!text){$('#jmsg').textContent='Write at least one line first.';return}
 entries.unshift({id:Date.now(),mood,title:$('#jtitle').value.trim(),text});store();drawJ();
 $('#jtext').value='';$('#jtitle').value='';$('#jmsg').textContent='Saved. Proud of you. ♥';setTimeout(()=>$('#jmsg').textContent='',2500)};
$('#jprompt').onclick=()=>{$('#jtext').placeholder=pick(PROMPTS);$('#jtext').focus()};
$('#jlist').onclick=e=>{const b=e.target.closest('.del');if(b&&confirm('Delete this entry?')){entries=entries.filter(x=>x.id!=b.dataset.id);store();drawJ()}};
$('#jclear').onclick=()=>{if(entries.length&&confirm('Delete ALL entries? This cannot be undone.')){entries=[];store();drawJ()}};
drawJ();route();

function stats(){$('#sE').textContent=entries.length;$('#sF').textContent=favs.length}
$('#verses').onclick=e=>{const b=e.target.closest('.fav');if(!b)return;const r=b.dataset.r;favs=favs.includes(r)?favs.filter(x=>x!==r):[...favs,r];try{localStorage.setItem('frag_fav',JSON.stringify(favs))}catch(x){}render($('#q').value);stats()};
$('#favonly').onclick=e=>{favOnly=!favOnly;e.currentTarget.setAttribute('aria-pressed',favOnly);e.currentTarget.textContent=favOnly?'♥ showing saved':'♡ show saved only';render($('#q').value)};
$('#jtext').oninput=e=>{const n=e.target.value.trim().split(/\s+/).filter(Boolean).length;$('#wc').textContent=n+(n===1?' word':' words')};
stats();
const root=document.documentElement;let th='light';try{th=localStorage.getItem('frag_theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){}
function setTh(t){root.dataset.theme=t;$('#theme').textContent=t==='dark'?'☀':'☾';try{localStorage.setItem('frag_theme',t)}catch(e){}}
setTh(th);$('#theme').onclick=()=>setTh(root.dataset.theme==='dark'?'light':'dark');
const orb=$('#orb'),ot=$('#orbt');let g=0,on=false;const sl=ms=>new Promise(r=>setTimeout(r,ms));
orb.onclick=async()=>{if(on){on=false;g++;orb.classList.remove('big');ot.textContent='tap to breathe';return}
 on=true;const my=++g;while(g===my){ot.textContent='breathe in';orb.style.transitionDuration='4s';orb.classList.add('big');await sl(4000);if(g!==my)break;ot.textContent='hold';await sl(4000);if(g!==my)break;ot.textContent='breathe out';orb.style.transitionDuration='6s';orb.classList.remove('big');await sl(6000)}};
(()=>{const c=$('#petals'),x=c.getContext('2d');if(matchMedia('(prefers-reduced-motion:reduce)').matches){c.remove();return}
let W,H;const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight};rs();addEventListener('resize',rs);
const n=Math.min(24,Math.floor(innerWidth/50)),P=[],C=['#f6b3a8','#fbd0c4','#f9c6d3','#ffe0b8'];
for(let i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:5+Math.random()*7,s:.3+Math.random()*.6,a:Math.random()*6,v:.01+Math.random()*.02,c:C[i%4]});
(function f(){x.clearRect(0,0,W,H);for(const p of P){p.y+=p.s;p.a+=p.v;p.x+=Math.sin(p.a)*.6;if(p.y>H+20){p.y=-20;p.x=Math.random()*W}
x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.globalAlpha=.6;x.beginPath();x.ellipse(0,0,p.r,p.r*.55,0,0,7);x.fill();x.restore()}requestAnimationFrame(f)})()})();
