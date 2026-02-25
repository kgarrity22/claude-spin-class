export const CATALOG = {
  tech: {
    label: "Tech",
    description:
      "HTTP status codes, VS Code shortcuts, terminal commands, regex, Big O notation",
    themes: {
      http: {
        label: "HTTP Status Codes",
        file: "tech/http.json",
        subtypes: ["1xx", "2xx", "3xx", "4xx", "5xx"],
      },
      vscode: {
        label: "VS Code Shortcuts",
        file: "tech/vscode.json",
        subtypes: ["navigation", "editing", "search"],
      },
      terminal: {
        label: "Terminal Commands",
        file: "tech/terminal.json",
        subtypes: ["navigation", "history", "power"],
      },
      regex: {
        label: "Regex",
        file: "tech/regex.json",
        subtypes: [
          "anchors",
          "character-classes",
          "quantifiers",
          "groups",
          "patterns",
        ],
      },
      bigo: {
        label: "Big O Notation",
        file: "tech/bigo.json",
        subtypes: ["concepts", "sorting", "searching", "data-structures"],
      },
    },
  },
  languages: {
    label: "Languages",
    description: "Foreign language vocabulary and phrases",
    themes: {
      spanish: {
        label: "Spanish",
        file: "languages/spanish.json",
        subtypes: [
          "greetings",
          "verbs",
          "travel",
          "food",
          "sports",
          "numbers",
          "time",
        ],
      },
    },
  },
  trivia: {
    label: "Trivia",
    description: "Oscar winners, collective nouns, and general knowledge",
    themes: {
      oscars: {
        label: "Oscar Best Picture Winners",
        file: "trivia/oscars.json",
        subtypes: ["classics", "1960s-70s", "1980s-90s", "2000s-10s", "2020s"],
      },
      collectives: {
        label: "Collective Nouns",
        file: "trivia/collectives.json",
        subtypes: ["animals", "birds", "ocean", "people"],
      },
    },
  },
};
