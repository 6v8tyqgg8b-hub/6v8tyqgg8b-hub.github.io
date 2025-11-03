(function(){
  const menuBtn=document.getElementById('menuBtn');
  const nav=document.getElementById('nav');
  if(menuBtn) menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
  function bindCopy(btn){
    btn.addEventListener('click',()=>{
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(()=>{
        btn.textContent='Copied!';
        setTimeout(()=>btn.textContent='Copy Contract',1200);
      });
    });
  }
  const mainCopy=document.getElementById('copyMint');
  if(mainCopy) bindCopy(mainCopy);
  document.querySelectorAll('.btn.copy.small').forEach(bindCopy);
  document.getElementById('year').textContent=new Date().getFullYear();
})();