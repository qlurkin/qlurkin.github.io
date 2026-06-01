## Build

```bash
odin build . -extra-linker-flags:"-L<path_to_lua5.4_dynamic_lib>"
```

You can avoid the `-extra-linker-flags` by adding the path to the `LIBRARY_PATH`
env variable
