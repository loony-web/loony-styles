## Summary

<!-- What does this PR do? Link the related issue if applicable. Fixes #123 -->

## Type of change

- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation
- [ ] Tooling / CI
- [ ] Refactor

## Changes

<!-- List the key changes made -->

## Checklist

### Code
- [ ] TypeScript strict — no `any` without documented justification
- [ ] No unused exports or dead code

### Testing
- [ ] Unit tests added / updated
- [ ] Accessibility tests pass (axe)
- [ ] Keyboard navigation verified manually
- [ ] Tests pass locally (`pnpm test`)

### Accessibility
- [ ] Component reviewed against WCAG 2.1 AA
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Space, Escape, Arrows as applicable)
- [ ] Screen reader tested (or rationale for skip)
- [ ] Focus management is correct
- [ ] `aria-*` attributes are correct
- [ ] `data-state`, `data-disabled` etc. are set where needed

### Design
- [ ] Uses CSS variables (`--loony-color-*`, `--loony-radius-*`, etc.) — no raw colors
- [ ] Works in light and dark mode
- [ ] Respects `prefers-reduced-motion`
- [ ] Respects `prefers-contrast: more`

### Documentation
- [ ] Storybook stories added / updated
- [ ] Component props documented
- [ ] Changeset added (`pnpm changeset`)

## Screenshots / Screen recordings

<!-- For UI changes, include before/after or a screen recording -->
