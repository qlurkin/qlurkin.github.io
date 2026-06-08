from build_py import markdown, dot, plantuml, zip

dot("graph.dot")
plantuml("diag.puml")
zip("svgs.zip", "./diag.svg", "./graph.svg")
markdown("index.md")
