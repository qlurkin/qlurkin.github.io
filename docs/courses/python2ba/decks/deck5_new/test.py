

import pypdf

with open("apprendre_python3_5.pdf", "rb") as file:
  pdfreader = pypdf.PdfReader(file)
  pdfwriter = pypdf.PdfWriter()
  for i in range(min(10, pdfreader.get_num_pages())):
    pdfwriter.add_page(pdfreader.get_page(i))
  with open("summary.pdf", "wb") as output:
    pdfwriter.write(output)