  async function fetchApiData() {
    try {
      const response = await fetch("https://explorer.zent.cash/api/getinfo");
      if (!response.ok) throw new Error("Error en la API");
      const data = await response.json();
      return data; // devolvemos todo el JSON
    } catch (error) {
      console.error("Error fetchApiData:", error);
      return null;
    }
  }


  function updateElementsWithData(data) {
    if (!data) return; 

    if (data.synced === true) {
      document.getElementById("networkStatus").style.backgroundColor = "#00da00";
      document.getElementById("networkStatus").style.borderColor = "#00ff00";
    } else if (data.synced === false) {
      document.getElementById("networkStatus").style.backgroundColor = "#ff0000";
      document.getElementById("networkStatus").style.borderColor = "#ca0303";
    } else {
      document.getElementById("networkStatus").style.backgroundColor = "#606060";
      document.getElementById("networkStatus").style.borderColor = "#606060";
    }
    
    document.getElementById("height").textContent = data.height;

    document.getElementById("mempool").textContent = data.tx_pool_size;
   
    document.getElementById("txsCount").textContent = data.tx_count;
   
    document.getElementById("peersCount").textContent = data.white_peerlist_size;
    
  }

 
  (async function () {
    const apiData = await fetchApiData(); 
    updateElementsWithData(apiData);            
  })();




const getCurrentYear = ()=>{
    return new Date().getFullYear();
}
document.getElementById('currentyear').textContent = getCurrentYear()