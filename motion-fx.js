(()=>{try{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const init=()=>{try{
    const bookScript=document.querySelector('#book-script');
    const arm=()=>{try{
      if(!window.Motion)return;
      const {animate,inView}=window.Motion;
      const batch=(y,step,duration,amount)=>{
        let queued=[],frame=0;
        const flush=()=>{try{
          frame=0;
          const items=queued;queued=[];
          items.forEach((el,i)=>{try{
            const motion=animate(el,{opacity:[0,1],y:[y,0]},{delay:i*step,duration,ease:[0.22,1,0.36,1]});
            const clean=()=>{try{el.style.removeProperty('opacity');el.style.removeProperty('transform')}catch(e){}};
            motion.finished.then(clean,clean);
          }catch(e){}});
        }catch(e){}};
        return el=>{let fired=false;try{
          inView(el,()=>{try{if(fired)return;fired=true;queued.push(el);if(!frame)frame=requestAnimationFrame(flush)}catch(e){}},{amount});
        }catch(e){}};
      };
      if(bookScript){
        const reveal=batch(14,0.06,0.5,0.3);
        document.querySelectorAll('.role-card, .ops-card, .project-card, .int-card, .arch-node, .impact-row').forEach(reveal);
        document.querySelectorAll('.hero-metrics .val').forEach(el=>{try{
          const original=el.textContent;
          const match=original.match(/^([^0-9]*)([\d,]+)(.*)$/);
          if(!match)return;
          const prefix=match[1],digits=match[2],suffix=match[3];
          const n=parseInt(digits.replace(/,/g,''),10),grouped=digits.includes(',');
          let fired=false,finalized=false;
          const finalize=()=>{try{if(finalized)return;finalized=true;el.textContent=original}catch(e){}};
          inView(el,()=>{try{
            if(fired)return;fired=true;
            const timer=setTimeout(finalize,1400);
            const motion=animate(0,n,{duration:1,ease:'easeOut',onUpdate:v=>{try{
              if(finalized)return;
              const value=Math.round(v);
              el.textContent=prefix+(grouped?value.toLocaleString('en-US'):String(value))+suffix;
            }catch(e){}}});
            const done=()=>{try{clearTimeout(timer);finalize()}catch(e){}};
            motion.finished.then(done,done);
          }catch(e){}},{amount:0.3});
        }catch(e){}});
      }else{
        const reveal=batch(8,0.02,0.35,0.2);
        document.querySelectorAll('.pill').forEach(reveal);
      }
    }catch(e){}};
    if(!bookScript){arm();return}
    const started=performance.now();
    const ready=()=>{try{
      if(!document.documentElement.classList.contains('bk-preboot')&&typeof window.__bookGoTo==='function'){
        const book=document.querySelector('.bk-book');
        if(!book)return;
        let armed=false,observer;
        const check=()=>{try{
          if(armed||book.classList.contains('bk-sealed')||book.classList.contains('bk-closed'))return;
          armed=true;if(observer)observer.disconnect();arm();
        }catch(e){}};
        observer=new MutationObserver(check);
        observer.observe(book,{attributes:true,attributeFilter:['class']});
        check();return;
      }
      if(performance.now()-started<8000)requestAnimationFrame(ready);
    }catch(e){}};
    requestAnimationFrame(ready);
  }catch(e){}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
}catch(e){}})();
