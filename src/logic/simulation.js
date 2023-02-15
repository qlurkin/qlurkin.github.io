const event_handlers = {}

export function on(eventType, handler) {
    if(event_handlers[eventType] === undefined)
        event_handlers[eventType] = []
    event_handlers[eventType].push(handler)
}

export function emit(eventType, ...data) {
    if(!event_handlers[eventType]) return
    
    for(const handler of event_handlers[eventType]) {
        handler(...data)
    }
}