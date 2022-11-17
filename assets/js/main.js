window.addEventListener("DOMContentLoaded", function () {
  let scene = document.getElementsByClassName("scene")[0];
  let pokedex = document.getElementsByClassName("pokedex")[0];

  let startX;
  let startY;
  let diffX;
  let diffY;
  let rotateStartX = 0;
  let rotateStartY = 0;
  let rotateX = 0;
  let rotateY = 0;
  let scale = -200;
  let originX = scene.offsetLeft + scene.offsetWidth / 2;
  let originY = scene.offsetTop + scene.offsetHeight / 2;

  function zoom(event) {
    event.preventDefault();
    scale += event.deltaY * -0.5;
    scale = Math.min(Math.max(-600, scale), 500);
    pokedex.style.transform = `translateZ(${scale}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg`;
    console.log(scale);
  }

  function updatePosition(e) {
    e.preventDefault();
    diffX = e.pageX - originX - startX;
    diffY = originY - e.pageY - startY;
    rotateY = rotateStartY + diffX / 2;
    rotateX = rotateStartX + diffY / 2;
    pokedex.style.transform = `translateZ(${scale}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    if (
      originX + scene.offsetWidth / 2 - 15 < e.pageX ||
      originX - scene.offsetWidth / 2 + 15 > e.pageX ||
      originY + scene.offsetHeight / 2 - 15 < e.pageY ||
      originY - scene.offsetHeight / 2 + 15 > e.pageY
    ) {
      scene.removeEventListener("mousemove", updatePosition);
    }
  }

  scene.addEventListener("mousedown", function (e) {
    startX = e.pageX - originX;
    startY = originY - e.pageY;

    const pokedex_rotate = pokedex.style.transform.split(" ");
    if (pokedex_rotate.length > 1) {
      rotateStartX = +pokedex_rotate[2].replace(/[^-?\d.]/g, "");
      rotateStartY = +pokedex_rotate[1].replace(/[^-?\d.]/g, "");
    }
    scene.addEventListener("mousemove", updatePosition);
  });

  scene.addEventListener("mouseup", function (e) {
    scene.removeEventListener("mousemove", updatePosition);
  });

  scene.addEventListener("mouseover", function (e) {
    scene.addEventListener("wheel", zoom, { passive: false });
  });
  
});
