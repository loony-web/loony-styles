# Security Policy

## Supported versions

Loony is pre-alpha and unreleased. Security fixes are made on `main` only.

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Report it privately through GitHub's [private vulnerability reporting](https://github.com/loony-web/loony-styles/security/advisories/new). Include:

- the affected package (`@loony/ui`, `@loony/cli`, …) and commit
- steps to reproduce or a proof of concept
- the impact you expect

You should receive an acknowledgement within a week. Once a fix is ready we'll publish an advisory crediting you, unless you'd rather stay anonymous.

## Scope

In scope:

- the component library
- the CLI. Note that `loony add` writes files into your project and runs your package manager.
- the docs and playground apps
- the CI/release workflows

Vulnerabilities in third-party dependencies should be reported upstream. Tell us too if Loony's usage makes them exploitable.
