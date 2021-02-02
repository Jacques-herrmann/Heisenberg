
/**
 * UUID generator
 */
function textWidth(text) {
  const p = document.createElement("p");
  const editor = document.getElementById('MDEditor');
  document.body.appendChild(p);
  console.log(text);
  p.style.font = "Rubik";
  p.style.height = 'auto';
  p.style.width = 'auto';
  p.style.fontSize = '16px';
  p.style.position = 'absolute';
  p.innerHTML = text;

  const width = Math.ceil(p.clientWidth);
  document.body.removeChild(p);
  return width + editor.offsetLeft
}

export {
  textWidth,
}