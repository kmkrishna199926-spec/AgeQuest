const DOCS=[
{n:"Aadhaar Card",e:"🆔",hd:"Unique Identification Authority",ttl:"AADHAAR",c1:"#e8590c",c2:"#c92a2a",min:0,d:"Universal ID for every resident. Baal Aadhaar is issued for children.",u:"https://myaadhaar.uidai.gov.in/",b:"Apply on UIDAI",ms:[5,15],mt:"Mandatory biometric update"},
{n:"Birth Certificate",e:"👶",hd:"Registrar of Births & Deaths",ttl:"BIRTH CERT.",c1:"#1098ad",c2:"#0b7285",min:0,d:"Issued at birth – the base proof of your age. Register via the Civil Registration System.",u:"https://crsorgi.gov.in/",b:"Open CRS portal"},
{n:"Passport",e:"🛂",hd:"Republic of India · Passport",ttl:"PASSPORT",c1:"#1c3f94",c2:"#0b1f5c",min:0,d:"Available at any age. Validity is 5 years for minors (under 18) and 10 years for adults.",u:"https://www.passportindia.gov.in/",b:"Apply on Passport Seva",x:a=>a<18?"📘 Minor passport · 5-year validity":"📗 Adult passport · 10-year validity"},
{n:"PAN Card",e:"💳",hd:"Income Tax Department",ttl:"PAN",c1:"#3b5bdb",c2:"#5f3dc4",min:0,d:"Minor PAN (under 18) is managed by a parent/guardian with no live photo or signature. 18+ gets Major PAN with live photo & signature.",u:"https://onlineservices.proteantech.in/paam/endUserRegisterContact.html",b:"Apply for PAN (NSDL)",x:a=>a<18?"👪 Minor PAN · parent/guardian applies":"✍️ Major PAN · live photo + signature, full autonomy"},
{n:"Learner's Licence – Scooters",e:"🛵",hd:"Driving Licence · Parivahan",ttl:"DL · 2-WHEELER",c1:"#2f9e44",c2:"#087f5b",min:16,d:"Gearless motorcycles/scooters under 50cc. Needs parental consent.",u:"https://sarathi.parivahan.gov.in/",b:"Apply on Sarathi",x:()=>"👪 Parental consent required"},
{n:"Driving Licence – Private",e:"🚗",hd:"Driving Licence · Parivahan",ttl:"DL · LMV",c1:"#0ca678",c2:"#099268",min:18,d:"Cars, geared motorcycles and Light Motor Vehicles for private use.",u:"https://sarathi.parivahan.gov.in/",b:"Apply on Sarathi"},
{n:"Driving Licence – Commercial",e:"🚛",hd:"Driving Licence · Parivahan",ttl:"DL · HEAVY",c1:"#f08c00",c2:"#e8590c",min:20,d:"Commercial and heavy transport vehicles like trucks and buses.",u:"https://sarathi.parivahan.gov.in/",b:"Apply on Sarathi"},
{n:"Voter ID (EPIC)",e:"🗳️",hd:"Election Commission of India",ttl:"EPIC",c1:"#e64980",c2:"#a61e4d",min:18,d:"Your power to vote! 18 is the strict minimum age for voter eligibility.",u:"https://voters.eci.gov.in/",b:"Apply on Voters' Portal"},
{n:"Armed Forces / Canteen ID",e:"🎖️",hd:"Armed Forces · CSD",ttl:"DEPENDENT ID",c1:"#5c7a29",c2:"#364d14",min:17.5,d:"Aligns with military recruitment minimums (17.5 to 18 years). Canteen (CSD) & dependent benefits.",u:"https://www.csdindia.gov.in/",b:"Visit CSD India",u2:"https://joinindianarmy.nic.in/"},
{n:"OCI Card",e:"🌍",hd:"Overseas Citizen of India",ttl:"OCI",c1:"#7048e8",c2:"#4263eb",min:0,d:"For persons of Indian origin living abroad. Needs a fresh photo & biometrics update at ages 20 and 50.",u:"https://ociservices.gov.in/",b:"Apply for OCI",ms:[20,50],mt:"Photo/biometric update"},
{n:"Senior Citizen Card",e:"🧓",hd:"State Government · Welfare",ttl:"SENIOR CITIZEN",c1:"#c2255c",c2:"#862e9c",min:60,d:"Concessions in state transport, healthcare and welfare schemes. Process varies by state.",u:"https://services.india.gov.in/",b:"Open India Services"}
];
const $=id=>document.getElementById(id);let birth=null,filter='all',iv;
const fmt=n=>Math.floor(n).toLocaleString('en-IN');
function diff(b,n){let y=n.getFullYear()-b.getFullYear(),m=n.getMonth()-b.getMonth(),d=n.getDate()-b.getDate();
 if(d<0){m--;d+=new Date(n.getFullYear(),n.getMonth(),0).getDate()}if(m<0){y--;m+=12}return{y,m,d}}
function left(a,min){let t=Math.ceil((min-a)*12-1e-9),y=Math.floor(t/12),m=t%12;return (y?y+" yr ":"")+(m?m+" mo":"")||"soon"}
function status(doc,a){
 const ok=a>=doc.min,x=[];
 if(doc.x&&ok)x.push(doc.x(a));
 if(doc.ms){const nx=doc.ms.find(v=>v>a);x.push(nx?`🔔 ${doc.mt} due at age ${nx} (in ${left(a,nx)})`:`✅ Milestones ${doc.ms.join(" & ")} passed – keep it updated`)}
 return{ok,note:ok?(x.join(" · ")||"🎉 You're eligible – apply now!"):`🔒 Unlocks in ${left(a,doc.min)} (at age ${doc.min})`}}
function mock(d){return `<div class="idc" style="--c1:${d.c1};--c2:${d.c2}"><div class="idh">${d.e} ${d.hd}</div><div class="idb"><div class="ph">👤</div><div class="ln"><i></i><i></i><i class="s"></i></div></div><div class="idf">${d.ttl}</div><span class="chip"></span></div>`}
function render(a){
 let u=0;const html=DOCS.map((d,i)=>{const s=status(d,a);if(s.ok)u++;
  const btn=s.ok?`<a class="btn" href="${d.u}" target="_blank" rel="noopener noreferrer">🚀 ${d.b}</a>`:`<span class="btn dis">🔒 Locked until ${d.min}</span>`;
  return `<article class="dc ${s.ok?'open':'lock'}" style="animation-delay:${i*70}ms"><span class="tag">${s.ok?'UNLOCKED':'LOCKED'}</span>${mock(d)}<h3>${d.n}</h3><p>${d.d}</p><div class="note">${s.note}</div>${btn}</article>`}).join("");
 $('grid').innerHTML=html;$('tc').textContent=DOCS.length;count($('uc'),u);
 setTimeout(()=>$('xp').style.width=(u/DOCS.length*100)+"%",100);
 $('xpt').textContent=u===DOCS.length?"Max level! Every document is available 👑":`${DOCS.length-u} more unlock${DOCS.length-u>1?'s':''} as you grow older`;
 applyFilter()}
function count(el,to){let c=0;const t=setInterval(()=>{el.textContent=++c;if(c>=to)clearInterval(t)},60);if(!to)el.textContent=0}
function applyFilter(){document.querySelectorAll('.dc').forEach(c=>c.style.display=(filter==='all'||c.classList.contains(filter))?'':'none')}
function tick(){const ms=Date.now()-birth.getTime();
 $('sDays').textContent=fmt(ms/864e5);$('sHrs').textContent=fmt(ms/36e5);$('sMin').textContent=fmt(ms/6e4);$('sSec').textContent=fmt(ms/1e3);$('sWk').textContent=fmt(ms/6048e5)}
function rankOf(y){return y<13?"🌱 Rookie":y<18?"⚡ Teen Hero":y<30?"🔥 Young Pro":y<60?"🦁 Seasoned Citizen":"👑 Elder Legend"}
function burst(){const E=["🎉","🎂","✨","🎈","⭐","🥳"];for(let i=0;i<34;i++){const s=document.createElement('span');s.className='emo';s.textContent=E[i%E.length];s.style.left=Math.random()*100+'vw';s.style.animationDuration=(2+Math.random()*2.5)+'s';s.style.animationDelay=Math.random()*.8+'s';document.body.appendChild(s);setTimeout(()=>s.remove(),5500)}}
$('go').onclick=()=>{
 const v=$('dob').value;$('err').textContent="";
 if(!v){$('err').textContent="Please pick your birth date first 🙂";return}
 const [y,m,d]=v.split('-').map(Number),[h,mi]=($('tob').value||"00:00").split(':').map(Number);
 birth=new Date(y,m-1,d,h,mi);
 if(birth>new Date()){$('err').textContent="Birth date can't be in the future! ⏳";return}
 if(y<1900){$('err').textContent="Please enter a year after 1900.";return}
 const now=new Date(),a=diff(birth,now),dec=a.y+a.m/12+a.d/365;
 $('res').style.display='block';$('ageY').textContent=a.y;$('rank').textContent=rankOf(a.y);
 $('ageD').textContent=`${a.y} years, ${a.m} months & ${a.d} days`;
 let nb=new Date(now.getFullYear(),m-1,d);if(nb<=now)nb=new Date(now.getFullYear()+1,m-1,d);
 const dl=Math.ceil((nb-now)/864e5);
 $('bday').textContent=dl>=365&&now.getMonth()===m-1&&now.getDate()===d?"🎉 Happy Birthday!!":`🎁 Next birthday in ${dl} day${dl>1?'s':''} – you'll turn ${a.y+1}`;
 render(dec);tick();clearInterval(iv);iv=setInterval(tick,1000);burst();
 $('res').scrollIntoView({behavior:'smooth'})};
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));t.classList.add('on');filter=t.dataset.f;applyFilter()});
$('dob').max=new Date().toISOString().split('T')[0];
$('th').onclick=()=>{const r=document.documentElement,dk=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dk?'light':'dark'};
