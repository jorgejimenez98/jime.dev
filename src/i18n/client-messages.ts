import type { Messages } from "next-intl"

// Namespaces read by Client Components. Everything else stays on the server,
// so pages don't ship the whole message catalogue to the browser.
const CLIENT_NAMESPACES = [
  "header",
  "language-selector",
  "theme-toggle",
  "not-found"
] as const satisfies readonly (keyof Messages)[]

type ClientMessages = Pick<Messages, (typeof CLIENT_NAMESPACES)[number]>

export function pickClientMessages(messages: Messages): ClientMessages {
  return Object.fromEntries(
    CLIENT_NAMESPACES.map(namespace => [namespace, messages[namespace]])
  ) as ClientMessages
}
