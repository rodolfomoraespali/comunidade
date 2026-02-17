const LINKS = {
  compra: "https://hotmart.com/pt-br/marketplace/produtos/cuidar-ate-o-fim/G101892157N",
  whatsapp: "https://wa.me/5516981902048",
  instagram: "https://instagram.com/rodolfomoraespali"
};

function $(q){ return document.querySelector(q); }

function showToast(msg){
  const toast = $("#toast");
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function wireLinks(){
  const idsCompra = ["#btnComprarTop", "#btnComprarHero", "#btnComprarMid", "#btnComprarBottom"];
  
  idsCompra.forEach((id) => {
    const el = $(id);
    if(el) {
      el.href = LINKS.compra;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });

  const wpp = $("#btnWhatsapp");
  if(wpp) wpp.href = LINKS.whatsapp;

  const ig = $("#btnInstagram");
  if(ig) ig.href = LINKS.instagram;

  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-scroll");
      const el = $(target);
      if(el) {
        const offset = ($(".topbar")?.offsetHeight || 0) + 10;
        window.scrollTo({
          top: el.offsetTop - offset,
          behavior: "smooth"
        });
      }
    });
  });
}

function wireForm(){
  const form = $("#formContato");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const contato = form.contato.value.trim();
    const mensagem = form.mensagem.value.trim();

    if(!nome || !contato || !mensagem) return;

    const txt = `Olá! Me chamo ${nome}.%0AContatos: ${contato}%0A%0A${encodeURIComponent(mensagem)}`;
    window.open(`${LINKS.whatsapp}?text=${txt}`, "_blank");
    showToast("Abrindo WhatsApp...");
    form.reset();
  });
}

function initCarousel() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const indicators = document.querySelectorAll(".indicator");
  const nextBtn = $(".carousel-btn.next");
  const prevBtn = $(".carousel-btn.prev");
  let current = 0;

  if(!slides.length) return;

  function show(index) {
    slides.forEach(s => s.classList.remove("active"));
    indicators.forEach(i => i.classList.remove("active"));
    slides[index].classList.add("active");
    indicators[index].classList.add("active");
  }

  if(nextBtn) nextBtn.onclick = () => { current = (current + 1) % slides.length; show(current); };
  if(prevBtn) prevBtn.onclick = () => { current = (current - 1 + slides.length) % slides.length; show(current); };
  
  indicators.forEach((ind, i) => {
    ind.onclick = () => { current = i; show(current); };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if($("#year")) $("#year").textContent = new Date().getFullYear();
  
  wireLinks();
  wireForm();
  initCarousel();
});
