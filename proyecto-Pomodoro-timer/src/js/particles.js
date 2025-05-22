particlesJS("particles-js", {
  particles: {
    number: {
      value: 150, // Mayor cantidad para simular arena o flujo de tiempo
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: ["#FFD700", "#FFA500", "#FFFFFF"], // Amarillo dorado, naranja y blanco (colores relacionados con el tiempo y relojes)
    },
    shape: {
      type: ["circle"], // Solo círculos para efecto de arena
    },
    opacity: {
      value: 0.8,
      random: true,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.2,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.3,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 1.5, // Movimiento lento para dar sensación de flujo
      direction: "bottom", // Fluye hacia abajo (como arena en reloj de arena)
      random: false,
      straight: false,
      out_mode: "out", // Sale por abajo de la pantalla y desaparece
      bounce: false,
    },
    line_linked: {
      enable: false, // No conectamos partículas, para un efecto más limpio
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse", // Se alejan al pasar el mouse, como si el usuario tocara el tiempo
      },
      onclick: {
        enable: true,
        mode: "push", // Al hacer clic, se generan más partículas
      },
    },
    modes: {
      repulse: {
        distance: 120,
        duration: 0.4,
      },
      push: {
        particles_nb: 5,
      },
    },
  },
  retina_detect: true,
});
