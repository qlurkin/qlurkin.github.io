export function observable(value) {
    const observers = []
    return {
        setValue: newValue => {
            if(newValue === value) return
            value = newValue
            for(const observer of observers) {
                observer(value)
            }
        },
        getValue: () => {
            return value
        },
        observe: observer => {
            observers.push(observer)
            observer(value)
        },
        forget: observer => {
            const index = observers.findIndex(elem => elem === observer)
            observers.splice(index, 1)
        },
        clear: () => {
            observers.splice(0, observers.length)
        }
    }
}
