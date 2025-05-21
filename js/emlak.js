// Arama fonksiyonu: Kullanıcının girdiği kelimeye göre ilanları filtreler
function aramaYap() {
    // Arama kutusundaki değeri küçük harfe çevirerek al
    const input = document.getElementById("searchInput").value.toLowerCase();

    // Tüm ilan kartlarını seç
    const ilanlar = document.querySelectorAll(".ilan-karti");

    // Her ilanı tek tek kontrol et
    ilanlar.forEach(ilan => {
        // Başlığı küçük harfe çevirerek al
        const baslik = ilan.querySelector("h3").textContent.toLowerCase();

        // Arama ifadesini içeriyorsa göster, içermiyorsa gizle
        ilan.style.display = baslik.includes(input) ? "block" : "none";
    });
}

// Filtreleme fonksiyonu: Oda sayısı ve maksimum fiyata göre ilanları filtreler
function filtrele() {
    // Seçilen oda tipini ve maksimum fiyatı al
    const oda = document.getElementById("odaSelect").value;
    const fiyatMax = parseInt(document.getElementById("fiyatMax").value);

    // Tüm ilanları al
    const ilanlar = document.querySelectorAll(".ilan-karti");

    // Her ilanı kontrol et
    ilanlar.forEach(ilan => {
        const baslik = ilan.querySelector("h3").textContent; // Oda bilgisi başlıkta varsayılıyor
        const fiyatText = ilan.querySelector("p").textContent; // Fiyat metni örn: "Fiyat: 1.000.000 TL"

        // Fiyatın sadece sayısal kısmını al
        const fiyat = parseInt(fiyatText.replace(/\D/g, ''));

        // Oda uyumu: "hepsi" seçiliyse tümü, değilse başlıkta oda bilgisi aranır
        const odaUyumlu = (oda === "hepsi" || baslik.includes(oda));

        // Fiyat uyumu: Maksimum fiyat yoksa tümü geçerli, varsa belirtilen değerin altında olanlar
        const fiyatUyumlu = (isNaN(fiyatMax) || fiyat <= fiyatMax);

        // Her iki koşulu da sağlayan ilanlar gösterilir, diğerleri gizlenir
        ilan.style.display = (odaUyumlu && fiyatUyumlu) ? "block" : "none";
    });
}

// Sayfa yüklendiğinde yorum formunu ve yorumları yöneten kod
document.addEventListener("DOMContentLoaded", function () {
    const yorumForm = document.getElementById("yorumForm"); // Form elemanı
    const yorumListesi = document.getElementById("yorumListesi"); // Listeleme alanı

    // Yorumları localStorage'dan alıp ekrana yazdıran fonksiyon
    function yorumlariYukle() {
        const yorumlar = JSON.parse(localStorage.getItem("yorumlar")) || []; // Yorumları al veya boş dizi
        yorumListesi.innerHTML = ""; // Önceki yorumları temizle

        // Her yorumu ekrana yaz
        yorumlar.forEach(yorum => {
            const yorumDiv = document.createElement("div");
            yorumDiv.innerHTML = `<strong>${yorum.ad}</strong><br>${yorum.metin}`;
            yorumListesi.appendChild(yorumDiv);
        });
    }

    // Form gönderildiğinde çalışan olay
    yorumForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

        // Kullanıcıdan alınan yorum verilerini al
        const ad = document.getElementById("kullaniciAdi").value;
        const metin = document.getElementById("yorumMetni").value;

        // Var olan yorumları al ve yeni yorumu ekle
        const yorumlar = JSON.parse(localStorage.getItem("yorumlar")) || [];
        yorumlar.push({ ad, metin });

        // Yeni yorum listesini localStorage'a kaydet
        localStorage.setItem("yorumlar", JSON.stringify(yorumlar));

        // Formu temizle ve yorumları yeniden yükle
        yorumForm.reset();
        yorumlariYukle();
    });

    // Sayfa yüklendiğinde yorumları göster
    yorumlariYukle();
});
