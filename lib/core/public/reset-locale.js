/**
 * Restore the default locale that was active before any
 * `axe.configure({ locale })` call. No-op if no non-default
 * locale has ever been applied. Does not affect any other
 * configuration; for a full reset, use `axe.reset()`.
 */
function resetLocale() {
  const audit = axe._audit;

  if (!audit) {
    throw new Error('No audit configured');
  }
  audit._resetLocale();
}

export default resetLocale;
