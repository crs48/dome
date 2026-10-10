// Every story remains readable before enhancement. Selection changes only
// visibility and button state; it never starts an animation or saves data.
document.querySelectorAll<HTMLElement>('[data-choice-group]').forEach((group) => {
  const panels = Array.from(group.querySelectorAll<HTMLElement>('[data-choice-panel]'));
  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('[data-choice]'));
  const select = (id: string | undefined) => {
    if (!panels.some((panel) => panel.dataset.choicePanel === id)) return;
    panels.forEach((panel) => { panel.hidden = panel.dataset.choicePanel !== id; });
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.choice === id)));
  };
  select(panels[0]?.dataset.choicePanel);
  group.querySelectorAll<HTMLElement>('.enhancement-controls').forEach((controls) => { controls.hidden = false; });
  group.dataset.enhanced = 'true';
  buttons.forEach((button) => button.addEventListener('click', () => select(button.dataset.choice)));
});
