export interface BottombarConfig {
  backgroundColor: string,
  highlightColor: string,
  height: number
}

export interface Tab {
  image: string
}

export interface Tabs extends Array<Tab> {}
