// countdown.js
// Автор: твой скрипт для отсчёта до Нового года
// Работает автоматически для ближайшего следующего 1 января.

(function () {
  'use strict';

  // Получаем DOM-элементы
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');
  const finished = document.getElementById('finishedMessage');
  const subtitle = document.getElementById('subtitle');
  const targetYearEl = document.getElementById('targetYear');

  // Вычисляет следующую дату 1 января (00:00:00)
  function getNextNewYearDate(now = new Date()) {
    const year = now.getFullYear();
    // Если сегодня уже 1 января до полуночи? но логичнее: цель — 1 января следующего года.
    const target = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0));
    return target;
  }

  // Преобразование ms -> D/H/M/S
  function msToTimeParts(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);
    return { days, hours, minutes, seconds };
  }

  // Формат вывода (например чтобы 4 -> "04", если нужно)
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  // Основная функция обновления
  function update() {
    const now = new Date();
    const target = getNextNewYearDate(now);
    // Используем UTC для цели, но вычисления делаем с учётом локального времени;
    // важно: вычислим разницу в миллисекундах корректно:
    const diff = target.getTime() - now.getTime();

    // Показать на какой год идёт отсчёт
    targetYearEl.textContent = `Новый год ${target.getUTCFullYear()}`;

    if (diff <= 0) {
      // Праздничное сообщение, когда счет дошёл до нуля (или отрицательный)
      elDays.textContent = '0';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      finished.style.display = 'block';
      subtitle.textContent = 'Время наступило!';
      // можно остановить интервал, но оставим его, чтобы можно было автоматически переключиться на следующий год через секунду
      return;
    }

    const parts = msToTimeParts(diff);
    elDays.textContent = parts.days;
    elHours.textContent = pad(parts.hours);
    elMinutes.textContent = pad(parts.minutes);
    elSeconds.textContent = pad(parts.seconds);
  }

  // Запускаем обновление каждую секунду
  update(); // немедленный вызов
  setInterval(update, 1000);
})();
