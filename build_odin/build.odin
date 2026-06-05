package build

import "base:runtime"
import "core:c"
import "core:fmt"
import "core:os"
import "core:path/filepath"
import "core:strings"
import lua "vendor:lua/5.4"


markdown :: proc(path: string) {
	dest := fmt.aprintf("{}{}", path[0:len(path) - 2], "html")
	defer delete(dest)

	process, err := os.process_start(
		os.Process_Desc {
			command = {
				"pandoc",
				"-f",
				"markdown",
				"-t",
				"html",
				"-o",
				dest,
				"-s",
				"--template",
				"/Users/lur/Program/qlurkin.github.io/pandoc/template.html",
				"--section-divs",
				"-M",
				"document-css=false",
				"--mathml",
				path,
			},
		},
	)
	state, err2 := os.process_wait(process)
	fmt.printfln("MD {} -> {}", path, dest)
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

	state := create_lua_state(path)
	defer lua.close(state)

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

md_from_lua :: proc "c" (state: ^lua.State) -> c.int {
	context = runtime.default_context()
	basename := string(lua.tostring(state, 1))
	workdir := get_workdir_from_lua_state(state)
	path, join_err := os.join_path({workdir, basename}, context.allocator)
	if join_err != nil {
		fmt.println(join_err)
		return 0
	}
	markdown(path)
	return 0
}

build_from_lua :: proc "c" (state: ^lua.State) -> c.int {
	context = runtime.default_context()

	workdir := get_workdir_from_lua_state(state)

	lua.L_checktype(state, 1, i32(lua.TTABLE)) // raise a Lua Error if type don't match
	size := lua.L_len(state, 1)
	paths := make([]string, size)
	defer delete(paths)
	for i in 1 ..= size {
		lua.geti(state, 1, i)
		basename := string(lua.L_checkstring(state, -1))
		path, join_err := os.join_path({workdir, basename}, context.allocator)
		if join_err == nil {
			paths[i - 1] = path
		} else {
			fmt.println(join_err)
		}
	}
	build(paths)

	return 0
}

create_lua_state :: proc(workdir: string) -> ^lua.State {
	state := lua.L_newstate()
	lua.open_base(state)
	lua.newtable(state)
	lua.pushcfunction(state, md_from_lua)
	lua.setfield(state, -2, "md")
	lua.pushcfunction(state, build_from_lua)
	lua.setfield(state, -2, "build")
	lua.pushstring(state, strings.clone_to_cstring(workdir))
	lua.setfield(state, -2, "workdir")
	lua.setglobal(state, "xyz")
	return state
}

get_workdir_from_lua_state :: proc(state: ^lua.State) -> string {
	lua.getglobal(state, "xyz")
	lua.getfield(state, -1, "workdir")
	workdir := string(lua.L_checkstring(state, -1))
	return workdir
}

main :: proc() {
	if len(os.args) < 2 {
		fmt.println("Usage: build <path_to_dir>")
		return
	}

	basename := os.args[1]
	path, err := filepath.abs(basename)
	defer delete(path)
	if err != nil {
		fmt.println(err)
		return
	}
	build({path})
}
