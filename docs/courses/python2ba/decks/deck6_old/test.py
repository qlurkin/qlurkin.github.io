import numpy as np
import pandas as ps

dataframe = ps.read_excel("students.xlsx")
print(dataframe)

dataframe["total"] = (dataframe["project"] + dataframe["exam"] + dataframe["labs"]) / 3
print(dataframe)

dataframe.to_excel("students_with_total.xlsx")
dataframe.to_json("students_with_total.json")
