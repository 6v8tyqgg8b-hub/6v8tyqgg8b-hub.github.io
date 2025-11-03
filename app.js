
(function(){
  const mint = window.RMC.mint;
  const short = mint.slice(0,4)+'...'+mint.slice(-4);
  const mintShortEl = document.getElementById('mintShort');
  mintShortEl.textContent = short;

  const revealBtn = document.getElementById('revealMint');
  revealBtn.addEventListener('click', ()=>{
    mintShortEl.textContent = mint;
    revealBtn.remove();
  });

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

  // Price ticker from Dexscreener
  const pair = window.RMC.pair;
  const ticker = document.getElementById('ticker');
  async function loadPrice(){
    try{
      const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${pair}`);
      const data = await res.json();
      const p = data?.pairs?.[0];
      if(!p){ throw new Error('No pair'); }
      const price = Number(p.priceUsd||0).toFixed(6);
      const change = Number(p.priceChange?.h24 || 0);
      const arrow = change >= 0 ? '▲' : '▼';
      const cls = change >= 0 ? 'up' : 'down';
      ticker.innerHTML = `<span class="${cls}">RMC ${arrow} ${change.toFixed(2)}%</span>  •  $${price}  •  Dexscreener`;
    }catch(e){
      ticker.textContent = 'RMC — price unavailable';
    }
  }
  loadPrice();
  setInterval(loadPrice, 30000); // refresh every 30s
})();
