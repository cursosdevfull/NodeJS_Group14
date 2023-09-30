function tratamientoPersona(genero) {
  if (genero === "hombre") {
    return "señor";
  } else {
    return "señora";
  }
}

module.exports = { tratamientoPersona };
