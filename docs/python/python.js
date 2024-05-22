import { asyncRun } from './py-worker.js'

const { results, error } = await asyncRun(`
file = open('coucou')
print(file.read())
`)

console.log(results)
