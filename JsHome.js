let immagini = document.querySelectorAll("img[data-url]");


immagini.forEach(img => {

    img.addEventListener("mouseenter", () => {
        document.body.style.cursor = 'pointer';
    });

    img.addEventListener("mouseleave", () => {
        document.body.style.cursor = 'default';
    });
    // Quando si clicca sull'immagine
    img.addEventListener("click", (e) => {
        e.preventDefault();
        // Previene l'azione predefinita (evita il cambio pagina immediato)
       
        let url = img.getAttribute("data-url");
        
        document.body.classList.add("fade-out");

        localStorage.setItem("tipo", url);

        setTimeout(() => {
            window.location.href = "Scelta.html";
        }, 500);
    });

});
