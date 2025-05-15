function aramaYap() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const ilanlar = document.querySelectorAll(".ilan-karti");
  
    ilanlar.forEach(ilan => {
      const baslik = ilan.querySelector("h3").textContent.toLowerCase();
      ilan.style.display = baslik.includes(input) ? "block" : "none";
    });
  }
  
  function filtrele() {
    const oda = document.getElementById("odaSelect").value;
    const fiyatMax = parseInt(document.getElementById("fiyatMax").value);
    const ilanlar = document.querySelectorAll(".ilan-karti");
  
    ilanlar.forEach(ilan => {
      const baslik = ilan.querySelector("h3").textContent;
      const fiyatText = ilan.querySelector("p").textContent;
      const fiyat = parseInt(fiyatText.replace(/\D/g, ''));
  
      const odaUyumlu = (oda === "hepsi" || baslik.includes(oda));
      const fiyatUyumlu = (isNaN(fiyatMax) || fiyat <= fiyatMax);
  
      ilan.style.display = (odaUyumlu && fiyatUyumlu) ? "block" : "none";
    });
  }
  