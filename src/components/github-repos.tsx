"use client";
import { useEffect, useState } from "react";
type Repo = {id:number;name:string;description:string|null;html_url:string;language:string|null;stargazers_count:number;forks_count:number;fork:boolean;archived:boolean};
export default function GitHubRepos({username}:{username:string}) {
 const [repos,setRepos]=useState<Repo[]>([]); const [state,setState]=useState<"loading"|"ready"|"error">("loading");
 useEffect(()=>{const controller=new AbortController();setState("loading");
 fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=40`,{signal:controller.signal,headers:{Accept:"application/vnd.github+json"}})
 .then(r=>{if(!r.ok)throw new Error("GitHub API error");return r.json()})
 .then((items:Repo[])=>{setRepos(items.filter(r=>!r.fork&&!r.archived).sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,4));setState("ready")})
 .catch(()=>{if(!controller.signal.aborted)setState("error")});return ()=>controller.abort()},[username]);
 return <section id="github" className="section"><div className="section-label">03 / OPEN SOURCE</div><div className="section-main"><p className="eyebrow">GITHUB / PUBLIC REPOSITORIES</p><h2>Code in <em>public.</em></h2><p className="subtext">Selected public repositories from GitHub.</p><a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-link">@{username} ↗</a>
 {state==="loading"&&<p className="notice">Loading repositories…</p>}
 {state==="error"&&<p className="notice">Repositories are currently unavailable. Visit the GitHub profile above.</p>}
 {state==="ready"&&repos.length===0&&<p className="notice">No public repositories found.</p>}
 <div className="repo-grid">{repos.map(repo=><a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-card" key={repo.id}><div className="repo-top"><strong>{repo.name}</strong><span>↗</span></div><p>{repo.description||"Public repository"}</p><div className="repo-meta">{repo.language||"Code"} <span>★ {repo.stargazers_count} &nbsp;⑂ {repo.forks_count}</span></div></a>)}</div>
 </div></section>
}