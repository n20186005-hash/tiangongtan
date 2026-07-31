export {};

const storageKey = 'tiangongtan-itinerary-v1';
const root = document.querySelector<HTMLElement>('[data-itinerary]');

function readSaved(): string[] {
  try {
    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function writeSaved(items: string[]): void {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  } catch {
    // LocalStorage may be disabled in private mode; the UI still works for this session.
  }
}

if (root) {
  const checkboxes = Array.from(root.querySelectorAll<HTMLInputElement>('[data-itinerary-checkbox]'));
  const status = root.querySelector<HTMLElement>('[data-itinerary-status]');
  const clearButton = root.querySelector<HTMLButtonElement>('[data-clear-itinerary]');

  const updateStatus = () => {
    const selected = checkboxes.filter((box) => box.checked).map((box) => box.value);
    writeSaved(selected);
    if (status) status.textContent = `已收藏 ${selected.length} 個點。`;
  };

  const saved = new Set(readSaved());
  checkboxes.forEach((box) => {
    box.checked = saved.has(box.value);
    box.addEventListener('change', updateStatus);
  });
  clearButton?.addEventListener('click', () => {
    checkboxes.forEach((box) => {
      box.checked = false;
    });
    updateStatus();
  });
  updateStatus();
}
