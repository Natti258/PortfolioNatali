// простая утилита: вставляет текущий год
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;
});