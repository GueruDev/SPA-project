let cards = {};

class card3D {
  constructor(card) {
    this.card = card;
    this.mouseMove();
    this.hover();
  }
  mouseMove() {
    this.card.addEventListener("mousemove", (event) =>{
      // Obtener la posición del mouse en relación con el elemento
      let rect = this.card.getBoundingClientRect();
      let mouseX = event.clientX - rect.left;
      let mouseY = event.clientY - rect.top;
      this.card.style.transform = `perspective(400px) rotateX(${
        (mouseX / 484) * 16 - 6
      }deg) rotateY(${(mouseY / 324) * 16 - 6}deg)`;

      // Hacer algo con las coordenadas del mouse
      // console.log(
      //   "Posición del mouse:",
      //   Math.round(mouseX),
      //   Math.round(mouseY)
      // );
    });
  }
  async hover() {
    this.card.addEventListener("mouseleave", async () => {
      this.card.style.transition = "all 400ms ease";
      this.card.style.transform = `perspective(400px) rotateX(0) rotateY(0)`;
      await new Promise((resolve) => setTimeout(resolve, 400));
      this.card.style.transition = "none";
      console.log("Hover outside");
    });
  }
}

if (window.innerWidth >= 768) {
  cards = {
    card1: new card3D(document.querySelector(".card")),
  };
}