from markdown.inlinepatterns import InlineProcessor
from markdown.extensions import Extension
import xml.etree.ElementTree as etree
from tex2svg import tex2svg

class MathInlineProcessor(InlineProcessor):
    def handleMatch(self, m, data):
        formula = m.group(1)
        display = False
        if formula[0] == '$':
            formula = formula[1:]
            display = True
        el = etree.Element("div" if display else "span")
        el.set("class", "latex")
        el.text = self.md.htmlStash.store(tex2svg(formula))
        return el, m.start(0), m.end(0) + (1 if display else 0)

class MathExtension(Extension):
    def extendMarkdown(self, md):
        PATTERN = r'\$(.+?)\$'  # like $formula$
        md.inlinePatterns.register(MathInlineProcessor(PATTERN, md), 'math', 175)