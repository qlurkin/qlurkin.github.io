export function draggable(obj) {
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

        obj.on('click', startDrag)
        obj.off('click', stopDrag)

        event.stopPropagation()
    }

    function start(x, y) {
        obj.off('click', startDrag)
        obj.on('click', stopDrag)

        rx = obj.x() - x
        ry = obj.y() - y

        window.addEventListener('mousemove', move)
    }

    function startDrag(event) {
        start(event.offsetX, event.offsetY)
        event.stopPropagation()
    }

    obj.on('click', startDrag)
    obj.startDrag = () => {
        start(obj.x(), obj.y())
    }
}