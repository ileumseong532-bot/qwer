# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static Korean login page with no build tools or package manager. Open `index.html` directly in a browser to run it.

## Architecture

Three-file flat structure:

- `index.html` — Login form (email + password) and social login buttons (Naver, Google, GitHub). All text is in Korean.
- `style.css` — Styles scoped to `.login-container`, `.input-group`, `.social-btn`, `.message`, and `.divider`.
- `script.js` — Form submit handler (client-side only, no real auth) and social login stub (alert placeholder).

## Key Behaviors

- Form validation in `script.js` is front-end only — no backend or API exists.
- Social login buttons (`data-provider` attribute) show an alert; actual OAuth integration is not implemented.
- Success/error states are toggled via `message.className = 'message error'` / `'message success'` on the `#message` `<p>` element.
