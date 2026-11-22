export const DURATION=18;
export type Shot={id:string;label:string;start:number;end:number;description:string};
export const SHOTS:Shot[]=[
{id:'arrival',label:'01 · Travessia',start:0,end:5,description:'O aventureiro entra na floresta'},
{id:'encounter',label:'02 · Encontro',start:5,end:10,description:'O monstro aparece na clareira'},
{id:'battle',label:'03 · Combate',start:10,end:15,description:'O guerreiro desfere seu ataque'},
{id:'reward',label:'04 · Recompensa',start:15,end:18,description:'O tesouro lendário surge'}];
export function shotAt(time:number){return SHOTS.find(s=>time>=s.start&&time<s.end)??SHOTS[SHOTS.length-1]}
export function clampTime(t:number){return Math.min(DURATION,Math.max(0,t))}
export function smooth(a:number,b:number,t:number){const x=Math.min(1,Math.max(0,(t-a)/(b-a)));return x*x*(3-2*x)}
