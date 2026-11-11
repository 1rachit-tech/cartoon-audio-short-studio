import { chromium } from 'playwright';
import { mkdir, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
const root=dirname(fileURLToPath(import.meta.url)),args=process.argv.slice(2);
function arg(name,fallback){const i=args.indexOf(name);return i>=0?args[i+1]:fallback;}
const duration=Number(arg('--duration','5')),fps=30,out=resolve(arg('--out','out/sample.mp4')),frames=resolve(root,'frames');
if(!Number.isFinite(duration)||duration<=0||duration>60)throw new Error('Duration must be between 0 and 60 seconds for this prototype.');
await rm(frames,{recursive:true,force:true});await mkdir(frames,{recursive:true});await mkdir(dirname(out),{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
try{const page=await browser.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});await page.goto(pathToFileURL(resolve(root,'web/index.html')).href);const total=Math.round(duration*fps);for(let f=0;f<total;f++){await page.evaluate(n=>window.renderFrame(n),f);const name='frame-'+String(f).padStart(5,'0')+'.png';await page.locator('canvas').screenshot({path:resolve(frames,name)});if(f%30===0)process.stdout.write('Rendered '+f+'/'+total+' frames\\n');}}finally{await browser.close();}
const ff=spawn('ffmpeg',['-y','-framerate',String(fps),'-i',resolve(frames,'frame-%05d.png'),'-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',out],{stdio:'inherit'});
const code=await new Promise((res,rej)=>{ff.on('error',rej);ff.on('close',res);});if(code!==0)throw new Error('FFmpeg exited with code '+code);console.log('Created '+out);
