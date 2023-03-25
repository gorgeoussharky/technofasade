export interface Option {
    label: string
    value: string
    color?:string
}

export interface UpperLayer {
    color: string
    texture: string
}

export interface BottomLayer {
    active: boolean
    color: string
    texture: string
}

export interface CentralParts {
    active: boolean
    color: string
    texture: string
}

export interface HorizontalParts {
    color: string
    active: boolean
}

export interface LockPart {
    active: boolean
    color: string
    texture: string
}

export interface PlugPart {
    active: boolean
    color: string
}

export interface Fastener {
    color: string
}

export interface PreviewData {
    upperLayer: UpperLayer
    bottomLayer: BottomLayer
    centralParts: CentralParts
    horizontalParts: HorizontalParts
    lockPart: LockPart
    plugPart: PlugPart
    fastener: Fastener
}
