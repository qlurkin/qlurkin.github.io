import { pandoc } from 'build_lib'

// redirect('https://docs.docker.com/get-started/', {title: 'Labo 1: Getting Started with Docker'})
pandoc('index.md')
