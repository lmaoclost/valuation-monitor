# Security

## Reporting a Vulnerability

This is a personal investment tool. If you find a security issue, open a private vulnerability report on GitHub:

https://github.com/<user>/valuation-monitor/security/advisories

Please include:
- Description of the issue
- Steps to reproduce
- Affected versions

Do not disclose the issue publicly until it has been addressed.

## Known Security Measures

- API routes require `x-app-secret` header plus matching `origin` (see `proxy.ts`, `auth-validator.ts`)
- Rate limiting on API routes (see `rate-limiter.ts`)
- LGPD compliance: IP anonymization, sanitized logs, privacy notice
- No secrets committed — all via environment variables
