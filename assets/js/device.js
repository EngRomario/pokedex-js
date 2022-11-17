const width = document.getElementsByClassName("pokedex")[0].offsetWidth;
const height = document.getElementsByClassName("pokedex")[0].offsetHeight;
function half_cylinder(
  parent,
  width_cylinder,
  height_cylinder,
  orientation,
  half_num_strip
) {
  switch (orientation) {
    case "vertical":
      for (let i = 1; i <= 2 * half_num_strip; i++) {
        let strip = document.createElement("div");
        strip.className = `half-cylinder-strip`;
        strip.style.position = "absolute";
        const width_strip =
          width_cylinder *
          0.5 *
          Math.sqrt(2 - 2 * Math.cos(Math.PI / 2 / half_num_strip));
        strip.style.width = `${width_strip + 1}px`;
        strip.style.height = `${height_cylinder}px`;
        strip.style.background = "rgb(220, 10, 45)";
        const ang = Math.PI / 4 / half_num_strip;
        let string_transform = `rotateY(${
          ang * (1 + 2 * (i - 1)) - Math.PI / 2
        }rad)
    translateZ(${
      width_strip * 0.5 * Math.sin(Math.PI / 2 - ang * (1 + 2 * (i - 1)))
    }px)  
    translateX(${
      width_strip * 0.5 * (1 - Math.cos(Math.PI / 2 - ang * (1 + 2 * (i - 1))))
    }px)`;

        for (let j = 1; j < i; j++) {
          string_transform += `translateZ(${
            width_strip *
            Math.sin(ang * (1 + 2 * (i - 1)) - ang * (1 + 2 * (j - 1)))
          }px) 
      translateX(${
        width_strip *
        Math.cos(ang * (1 + 2 * (i - 1)) - ang * (1 + 2 * (j - 1)))
      }px)`;
        }
        strip.style.transform = string_transform;
        parent.appendChild(strip);
      }
      break;
    case "horizontal":
      for (let i = 1; i <= 2*half_num_strip; i++) {
        let strip = document.createElement("div");
        strip.className = `half-cylinder-strip`;
        strip.style.position = "absolute";
        const width_strip = 
          width_cylinder *
          0.5 *
          Math.sqrt(2 - 2 * Math.cos(Math.PI / 2 / half_num_strip));
        strip.style.width = `${width_strip + 1}px`;
        strip.style.height = `${height_cylinder}px`;
        strip.style.background = "rgb(220, 10, 45)";
        const ang = Math.PI / 4 / half_num_strip;
        let string_transform = `rotateZ(${-Math.PI / 2}rad)
        translateX(${-width_cylinder}px)
        rotateY(${ang * (1 + 2 * (i - 1)) - Math.PI / 2}rad)
        `;
        for (let j = 1; j < i; j++) {
          string_transform += `translateZ(${
            width_strip *
            Math.sin(ang * (1 + 2 * (i - 1)) - ang * (1 + 2 * (j - 1)))
          }px) 
          translateX(${
            width_strip *
            Math.cos(ang * (1 + 2 * (i - 1)) - ang * (1 + 2 * (j - 1)))
          }px)`;
        }

        strip.style.transformOrigin = "top left";
        strip.style.transform = string_transform;
        parent.appendChild(strip);
      }
      break;
  }
}

(() => {
  half_cylinder(
    document.getElementsByClassName("pokedex-device--right")[0],
    document.getElementsByClassName("pokedex-device--right")[0].offsetWidth,
    document.getElementsByClassName("pokedex-device--right")[0].offsetHeight,
    "vertical",
    5
  );
  half_cylinder(
    document.getElementsByClassName("pokedex-device--left")[0],
    document.getElementsByClassName("pokedex-device--left")[0].offsetWidth,
    document.getElementsByClassName("pokedex-device--left")[0].offsetHeight,
    "vertical",
    5
  );
  half_cylinder(
    document.getElementsByClassName("pokedex-device--top")[0],
    document.getElementsByClassName("pokedex-device--top")[0].offsetHeight,
    document.getElementsByClassName("pokedex-device--top")[0].offsetWidth,
    "horizontal",
    5
  );

  half_cylinder(
    document.getElementsByClassName("pokedex-device--bottom")[0],
    document.getElementsByClassName("pokedex-device--bottom")[0].offsetHeight,
    document.getElementsByClassName("pokedex-device--bottom")[0].offsetWidth,
    "horizontal",
    5
  );
})();
