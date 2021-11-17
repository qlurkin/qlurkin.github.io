from markdown.inlinepatterns import InlineProcessor
from markdown.extensions import Extension
import xml.etree.ElementTree as etree
from tex2svg import tex2svg
from tex2html import tex2html
import re

shitFinder = re.compile('\x0292\x03')

class MathInlineProcessor(InlineProcessor):
    def handleMatch(self, m, data):
        formula = self.unescape(m.group(1))

        for shit in shitFinder.findall(formula):
            formula = formula.replace(shit, r'\\')

        display = False
        if formula[0] == '$':
            formula = formula[1:]
            display = True
        
        return self.md.htmlStash.store(tex2html(formula, display)), m.start(0), m.end(0) + (1 if display else 0)

class MathExtension(Extension):
    def extendMarkdown(self, md):
        PATTERN = r'\$(.+?)\$'  # like $formula$
        md.inlinePatterns.register(MathInlineProcessor(PATTERN, md), 'math', 175)