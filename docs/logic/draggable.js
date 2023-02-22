import { canvas } from "./canvas.js"
import { dirty } from "./current.js"

export function draggable(obj, addClickListener) {
    if(addClickListener === undefined) addClickListener = true

    let rx
    let ry

    function move(event) {
        const x = rx + event.offsetX
        const y = ry + event.offsetY
        obj.move(x, y)
    }

    function stopDrag(event) {
        window.removeEventListener('mousemove', move)

        move(event)

        canvas.off('mouseup', stopDrag)
        event.stopImmediatePropagation()

        setTimeout(() => {
            if(addClickListener) obj.on('click', startDrag)
            obj.afterDrop()
            dirty()
        }, 1)
    }

    function start(x, y) {
        obj.off('click', startDrag)
        canvas.on('mouseup', stopDrag)

        rx = obj.x() - x
        ry = obj.y() - y

        window.addEventListener('mousemove', move)
    }

    function startDrag(event) {
        start(event.offsetX, event.offsetY)
        event.stopPropagation()
    }

    if(addClickListener) obj.on('click', startDrag)
    obj.startDrag = () => {
        obj.onStartDrag()
        start(obj.x(), obj.y())
    }
    obj.onStartDrag = () => {}
    obj.afterDrop = () => {}
}
