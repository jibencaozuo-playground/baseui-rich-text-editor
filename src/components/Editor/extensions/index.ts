export const extensions = {
  bold: async () => (await import("./bold")).default(),
  code: async () => (await import("./code")).default(),
  h1: async () => (await import("./h1")).default(),
  h2: async () => (await import("./h2")).default(),
  h3: async () => (await import("./h3")).default(),
  hr: async () => (await import("./hr")).default(),
  image: async () => (await import("./image")).default(),
  italic: async () => (await import("./italic")).default(),
  link: async () => (await import("./link")).default(),
  ol: async () => (await import("./ol")).default(),
  quote: async () => (await import("./quote")).default(),
  strike: async () => (await import("./strike")).default(),
  sub: async () => (await import("./sub")).default(),
  sup: async () => (await import("./sup")).default(),
  ul: async () => (await import("./ul")).default()
};
