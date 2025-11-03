
(function(){
  const mint = window.RMC.mint;
  const short = mint.slice(0,4)+'...'+mint.slice(-4);
  document.getElementById('mintShort').textContent = short;

  const toast = document.getElementById('toast');
  document.getElementById('copyBtn').addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(mint);
      toast.textContent = '✅ Contract copied';
    }catch(e){
      toast.textContent = 'Copied (clipboard limited)';
    }
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 1600);
  });

  // Price ticker from Dexscreener, live color + pulse on update
  const pair = window.RMC.pair;
  const ticker = document.getElementById('ticker');
  let lastPrice = null;
  async function loadPrice(){
    try{
      const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${pair}`);
      const data = await res.json();
      const p = data?.pairs?.[0];
      if(!p){ throw new Error('No pair'); }
      const price = Number(p.priceUsd||0);
      const priceStr = price.toFixed(6);
      const change = Number(p.priceChange?.h24 || 0);
      const up = (lastPrice !== null && price > lastPrice);
      const down = (lastPrice !== null && price < lastPrice);
      const arrow = change >= 0 ? '▲' : '▼';
      const cls = change >= 0 ? 'up' : 'down';
      ticker.innerHTML = `<span class="${cls}">RMC ${arrow} ${change.toFixed(2)}%</span> • $${priceStr} • Dexscreener`;
      if(up || down){
        ticker.classList.remove('pulse'); void ticker.offsetWidth; ticker.classList.add('pulse');
      }
      lastPrice = price;
    }catch(e){
      ticker.textContent = 'RMC — price unavailable';
    }
  }
  loadPrice();
  setInterval(loadPrice, 10000); // 10s refresh

  // Floating CTA show/hide on scroll
  const floater = document.getElementById('floatCta');
  let lastY = window.scrollY;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(y > lastY && y > 80){ // scrolling down
      floater.style.opacity = '0'; floater.style.pointerEvents = 'none';
    } else {
      floater.style.opacity = '1'; floater.style.pointerEvents = 'auto';
    }
    lastY = y;
  });
})();
