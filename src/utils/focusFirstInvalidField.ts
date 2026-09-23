/**
 * Move focus to the first field the form marked invalid (`aria-invalid="true"`).
 *
 * Call it from a submit handler after running validation. Validation errors
 * are React state, so they only reach the DOM on the next commit; waiting one
 * animation frame lets that render land before we look for the field.
 */
export function focusFirstInvalidField(form: HTMLFormElement | null): void {
  if (!form || typeof window === 'undefined') return;
  window.requestAnimationFrame(() => {
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  });
}
