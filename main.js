//!HTML'den Gelenler
const addBtn = document.getElementById("add-btn");
const priceInp = document.getElementById("price-inp");
const titleInp = document.querySelector("#title-inp");
const list = document.querySelector("#list");
const checkBox = document.querySelector("#checked");
const totalSpan = document.querySelector("#price-info");
const select = document.querySelector("select");
const userInp = document.querySelector('#user-inp');

//!Olay izleyicileri
addBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleUpdate);
select.addEventListener("change", handleFilter);
userInp.addEventListener("change",saveUser);
document.addEventListener("DOMContentLoaded",getUser)

//Toplam Fiyat Bilgisi
let totalPrice = 0;

//!Fonksiyonlar
//Hem toplam değişkeni hem arayüzü güncelleyen fonksiyon
function updateTotal(price) {
  //JS'de tutulan değişkeni günceller
  totalPrice += price;
  //HTML'deki toplam alanını günceller
  totalSpan.innerText = totalPrice;
}
//Yeni harcama ekler
function addExpense(event) {
  //sayfayı yenilemeyi engelle
  event.preventDefault();
  //inputların değerlerine erişme
  const title = titleInp.value;
  const price = priceInp.valueAsNumber;
  //!1 - inputlarda biri dahi boşsa alert ver ve fonksiyonu durdur
  if (!title || !price) {
    alert("Lütfen formda boş alan bırakmayınız");
    return;
  }
  //! 2- inputlar doluysa bir kart oluştur ve HTMLe gönder
  // a - Div oluşturma
  const expenseDiv = document.createElement("div");
  //b- class ekleme
  expenseDiv.classList.add("expense");
  if (checkBox.checked === true) {
    expenseDiv.classList.add("paid");
  }
  //c - div'in içeriğini belirleme
  expenseDiv.innerHTML = `
<h2 id="title">${title}</h2>
<h2 id="price">${price}</h2>
<div class="btns">
    <img id="update" src="images/payment.png" alt="">
    <img id="delete" src="images/delete.png" alt="">
</div>
`;
  //d - oluşan kartı HTML'e gönderme
  list.appendChild(expenseDiv);
  //e- toplamı güncelleme
  updateTotal(price);
  //!3 - imputları temizle
  titleInp.value = "";
  priceInp.value = "";
  checkBox.checked = false;
}
//Harcamayı günceller
function handleUpdate(event) {
  //Tıklanılan eleman
  const ele = event.target;
  //Tıklanılan butonun kapsayıcısına ulaşma
  const parent = ele.parentElement.parentElement;
  //Tıklanılan elemanın id'si delete ise çalışır
  if (ele.id === "delete") {
    //Sildiğimiz elemanın fiyatına erişme
    const price = Number(parent.children[1].innerText);
    //Toplamdan sildiğimiz fiyatı çıkarma
    updateTotal(-price);
    //Elemanı HTML'den kaldırma
    parent.remove();
  }
  //Tıklanılan eleman güncelle ise
  if (ele.id === "update") {
    parent.classList.toggle("paid");
  }
}
//Notları filtreler
function handleFilter(event) {
  const selected = event.target.value;
  //Listedeki elemanlara erişme
  const items = list.childNodes;
  //Listedeki her bir eleman için switch  ile yapacağımız sorgu
  //elemanını gözükeceğine karar verecek.
  items.forEach((item) => {
    //Seçilen değere göre yapılacak işleme karar verme
    switch (selected) {
      case "all":
        //   Hepsi seçilecek
        item.style.display = "flex";
        break;
      case "paid":
        //Ödenenler Seçilecek
        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-paid":
        //   Ödenmeyenler seçilecek
        if (!item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}
//Kullanıcıyı kaydeder
function saveUser(event){
  localStorage.setItem("username",event.target.value);
}
//Kullanıcıyı localden alıp inputa yazar
function getUser(){
  //Local storageden ismi al
 const username = localStorage.getItem("username") || '';
 //Kkullanıcı ismini inputa aktar
 userInp.value = username;
}