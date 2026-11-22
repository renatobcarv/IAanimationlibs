/** Asset registry: external files are optional, scene demo uses procedural geometry. */
export type Asset={id:string;kind:'character'|'environment'|'animation'|'prop'|'effect';source:string;license:string;file?:string};
export const ASSETS:Asset[]=[
{id:'hero-placeholder',kind:'character',source:'Procedural demo mesh',license:'Original'},
{id:'monster-placeholder',kind:'character',source:'Procedural demo mesh',license:'Original'},
{id:'forest-placeholder',kind:'environment',source:'Procedural demo meshes',license:'Original'},
{id:'mixamo',kind:'animation',source:'https://www.mixamo.com/',license:'Check Adobe terms'},
{id:'quaternius',kind:'character',source:'https://quaternius.com/',license:'Check individual pack'},
{id:'kenney',kind:'environment',source:'https://kenney.nl/assets',license:'Check individual pack'}];
export const externalAssetPath=(name:string)=>'/assets/'+name;
