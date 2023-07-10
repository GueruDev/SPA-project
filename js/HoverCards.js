let cards = {};

class card3D {
  constructor(card) {
    this.card = card;
    this.mouseMove();
    this.hover();
  }
  mouseMove() {
    this.card.addEventListener("mousemove", (event) =>{
      // !to get the coordinates of the mouse related to the element.
      let rect = this.card.getBoundingClientRect();
      let mouseX = event.clientX - rect.left;
      let mouseY = event.clientY - rect.top;
      this.card.style.transform = `perspective(400px) rotateX(${
        (mouseX / 484) * 16 - 6
      }deg) rotateY(${(mouseY / 324) * 16 - 6}deg)`;
    });
  }
  async hover() {
    // ! the animation is not smooth, then letting the animation breathe.
    this.card.addEventListener("mouseleave", async () => {
      this.card.style.transition = "all 400ms ease";
      this.card.style.transform = `perspective(400px) rotateX(0) rotateY(0)`;
      await new Promise((resolve) => setTimeout(resolve, 400));
      this.card.style.transition = "none";
      console.log("Hover outside");
    });
  }
}

// if (window.innerWidth >= 768) { // ! If the screen is wider than 768px then apply the Class
//   cards = {
//     card1: new card3D(document.querySelector(".card")),
//   };
// }