export interface BottombarSlidingColorConfig {
    backgroundColor: string,
    height: number
}

export interface Tab {
    image: string,
    text?: string,
    backgroundColor: string
}

export interface Tabs extends Array<Tab> { }
