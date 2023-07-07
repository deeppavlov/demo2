export type TSnippets = Snippets.cli | Snippets.python | Snippets.restApi
export enum Snippets {
  cli = "CLI",
  python = "Python",
  restApi = "RestAPI",
}

export type Tab = Tabs.INTEGRATION | Tabs.EXAMPLES
export enum Tabs {
  INTEGRATION = "integration",
  EXAMPLES = "examples",
}



