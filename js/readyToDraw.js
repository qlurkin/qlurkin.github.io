import { mathReady } from "./math"
import { codeReady } from "./code"
import fontReady from "./fontready"

export const readyToDraw = Promise.all([mathReady, codeReady, fontReady]).then(() => {
    console.log("Ready To Draw")
})

export default readyToDraw

