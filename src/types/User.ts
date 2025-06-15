export type User = {
    error?: string
    code : string
    id : string
    timestamps : {
        id : string
        createdAt : string
        type: string
    }[]
}