package build

import "base:runtime"
import "core:c"
import "core:fmt"
import "core:os"
import "core:strings"
import lua "vendor:lua/5.4"

state: ^lua.State

markdown :: proc(path: string) {
	//process, err := os.process_start(os.Process_Desc{command = {"touch", "caca.prout"}})
	//state, err2 := os.process_wait(process)
	fmt.printfln("MD {}", path)
}


build_one :: proc(path: string) {
	script_path, join_err := os.join_path({path, "build.lua"}, context.allocator)
	defer delete(script_path)
	fmt.printfln("LUA {}", script_path)

	script_bytes, read_err := os.read_entire_file(script_path, context.allocator)
	if read_err != nil {
		fmt.printfln("Cannot open `{}`", script_path)
		return
	}

	script := string(script_bytes)
	defer delete(script)

	cs := strings.clone_to_cstring(script)
	defer delete(cs)
	if lua.L_dostring(state, cs) != 0 {
		error := lua.tostring(state, -1)
		fmt.println(error)
		lua.pop(state, 1)
	}
}

build :: proc(paths: []string) {
	for path in paths {
		build_one(path)
	}
}

md_from_lua :: proc "c" (L: ^lua.State) -> c.int {
	path := string(lua.tostring(L, 1))
	context = runtime.default_context()
	markdown(path)
	return 0
}

build_from_lua :: proc "c" (state: ^lua.State) -> c.int {
	context = runtime.default_context()

	lua.L_checktype(state, 1, i32(lua.TTABLE)) // raise a Lua Error if type don't match
	size := lua.L_len(state, 1)
	paths := make([]string, size)
	defer delete(paths)
	for i in 1 ..= size {
		lua.geti(state, 1, i)
		paths[i - 1] = string(lua.L_checkstring(state, -1))
	}
	build(paths)

	return 0
}

main :: proc() {
	if len(os.args) < 2 {
		fmt.println("Usage: build <path_to_dir>")
		return
	}

	state = lua.L_newstate()
	defer lua.close(state)

	lua.open_base(state)
	lua.newtable(state)
	lua.pushcfunction(state, md_from_lua)
	lua.setfield(state, -2, "md")
	lua.pushcfunction(state, build_from_lua)
	lua.setfield(state, -2, "build")
	lua.setglobal(state, "xyz")

	path := os.args[1]
	build({path})
}
