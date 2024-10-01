export function checkPasswordComplexity(pass, confirmPass) {
  let arr = [];
  const lowerCase = /[a-z]/;
  const upperCase = /[A-Z]/;
  const number = /\d/;
  const punchs = /\W/;
  const spaces = /\s/;
  if (!lowerCase.test(pass)) {
    arr.push("Se requiere una letra minuscula");
  }
  if (!upperCase.test(pass)) {
    arr.push("Se requiere una letra mayuscula");
  }
  if (!number.test(pass)) {
    arr.push("Se requiere un numero");
  }
  if (!punchs.test(pass)) {
    arr.push("Se requiere un simbolo de puntuación");
  }
  if (spaces.test(pass)) {
    arr.push("La constraseña no puede tener espacios en blanco");
  }
  if (pass.length < 8) {
    arr.push("La contraseña necesita 8 o mas caracteres");
  }
  if (pass !== confirmPass) {
    arr.push("Las contraseñas no coinciden");
  }
  return arr;
}
export function checkEmailComplex(email) {
  const regex = /^[^.@]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]+/;
  if (regex.test(email)) {
    return true;
  }
  return false;
}
export function textGenerator(list, date, turn, pastMonthDay, index) {
  if ((date == pastMonthDay || date % pastMonthDay > 7) && index + 1 == 1) {
    return "Mes Pasado";
  } else if (
    (index == 4 || index == 5) &&
    date % pastMonthDay < 7 &&
    date != pastMonthDay
  ) {
    return "Mes Proximo";
  } else {
    if (list[date % pastMonthDay]) {
      if (list[date % pastMonthDay][turn])
        return list[date % pastMonthDay][turn];
      else if (turn <= 3) return "Auto Preparacion";
      else return "Auto Superacion";
    } else if (turn <= 3) return "Auto Preparacion";
    else return "Auto Superacion";
  }
}
