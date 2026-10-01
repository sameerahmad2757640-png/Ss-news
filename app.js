const stories=[
{id:1,cat:"news",tag:"COMMUNITY",title:"What people are talking about today",body:"A demo local-news story showing how SS News can combine reporting with community discussion.",author:"SS Desk",time:"8 min ago",likes:124,comments:31,saved:false},
{id:2,cat:"tech",tag:"TECH",title:"The practical future of AI tools",body:"A technology discussion about how new AI tools are changing everyday digital work.",author:"A. Khan",time:"24 min ago",likes:287,comments:54,saved:false},
{id:3,cat:"world",tag:"WORLD",title:"Five global stories worth following",body:"A concise overview card designed for international news and explainers.",author:"SS World",time:"41 min ago",likes:412,comments:88,saved:false},
{id:4,cat:"sport",tag:"SPORT",title:"Weekend sports: moments to watch",body:"A community-friendly sports roundup layout with reactions and discussion.",author:"SS Sports",time:"1 hr ago",likes:193,comments:42,saved:false},
{id:5,cat:"news",tag:"EXPLAINER",title:"How to verify a viral claim online",body:"Simple verification habits can help readers distinguish reporting, opinion and unverified posts.",author:"SS Verify",time:"2 hrs ago",likes:356,comments:71,saved:false}
];
const trends=[["01","Most discussed","How AI is changing digital work"],["02","Community","What should our next local story cover?"],["03","Explainer","How to verify a viral claim"]], topics=["Pakistan","Technology","AI","World","Sports","Education","Business","Entertainment"];
let filter="all";
const $=s=>document.querySelector(s);
function renderTrends(){ $("#trendCards").innerHTML=trends.map(x=>`<div class="trend" onclick="showToast('Opening ${x[2]}')"><small>${x[0]} • ${x[1]}</small><b>${x[2]}</b><small>Tap to explore →</small></div>`).join(""); $("#chips").innerHTML=topics.map(x=>`<span class="chip" onclick="searchTopic('${x}')">#${x}</span>`).join("")}
function renderFeed(list=stories){let q=($("#search")?.value||"").toLowerCase();let arr=list.filter(s=>(filter==="all"||s.cat===filter)&&(!q||(s.title+" "+s.body+" "+s.author).toLowerCase().includes(q)));$("#feed").innerHTML=arr.length?arr.map(s=>`<article class="story"><div class="story-top"><div class="avatar">${s.author.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><b>${s.author}</b><br><small>${s.time} • ${s.tag}</small></div></div><h3>${s.title}</h3><p>${s.body}</p><div class="story-actions"><button onclick="react(${s.id},this)">♥ ${s.likes}</button><button onclick="comment(${s.id})">💬 ${s.comments}</button><button onclick="save(${s.id})">🔖 ${s.saved?"Saved":"Save"}</button><button onclick="shareStory(${s.id})">↗ Share</button></div></article>`).join(""):`<div class="empty">No stories found. Try another search or category.</div>`}
function setFilter(f){filter=f;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===f));renderFeed()}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>setFilter(b.dataset.filter));
function react(id,b){let s=stories.find(x=>x.id===id);s.likes++;b.textContent=`♥ ${s.likes}`;showToast("Reaction added")}
function comment(id){let s=stories.find(x=>x.id===id);let c=prompt("Write your comment:");if(c?.trim()){s.comments++;showToast("Comment posted");renderFeed()}}
function save(id){let s=stories.find(x=>x.id===id);s.saved=!s.saved;renderFeed();renderSaved();showToast(s.saved?"Saved for later":"Removed from saved")}
function renderSaved(){let a=stories.filter(x=>x.saved);$("#savedList").innerHTML=a.length?a.map(x=>`<div class="story"><small>${x.tag}</small><h3>${x.title}</h3><button class="secondary" onclick="save(${x.id})">Remove</button></div>`).join(""):`No saved stories yet. Tap the bookmark on any story.`}
function shareStory(id){let s=stories.find(x=>x.id===id);if(navigator.share)navigator.share({title:s.title,text:s.body});else{navigator.clipboard?.writeText(s.title);showToast("Story title copied")}}
function runSearch(){renderFeed();document.querySelector("#feed").scrollIntoView({behavior:"smooth",block:"start"})}
function searchTopic(t){$("#search").value=t;runSearch()}
function scrollToFeed(){$("#feed").scrollIntoView({behavior:"smooth"})}
function openComposer(){$("#composer").classList.add("show")}
function closeComposer(){$("#composer").classList.remove("show")}
function createPost(){let title=$("#postTitle").value.trim(),body=$("#postBody").value.trim(),cat=$("#postCategory").value.toLowerCase();if(!title||!body)return showToast("Add a title and message");stories.unshift({id:Date.now(),cat,tag:"COMMUNITY",title,body,author:"SS Reader",time:"Just now",likes:0,comments:0,saved:false});closeComposer();$("#postTitle").value="";$("#postBody").value="";renderFeed();showToast("Post published")}
function subscribe(){showToast("Thanks — newsletter demo subscription received")}
function showToast(t){let e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");
$("#themeBtn").onclick=()=>{document.documentElement.classList.toggle("light");localStorage.setItem("ss-theme",document.documentElement.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("ss-theme")==="light")document.documentElement.classList.add("light");
$("#search").addEventListener("input",renderFeed);
renderTrends();renderFeed();renderSaved();