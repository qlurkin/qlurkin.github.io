import { pandoc, make_zip } from 'build_lib'

make_zip('lab4.zip', [
  './12_Dynamic Systems.ipynb',
  './12_Dynamic Systems with sympy.ipynb',
  './12_image1.png',
  './12_image2.png',
  './12_image3.png',
  './12_image4.png',
  './12_1_FT_Manipulation.ipynb',
  './12_1_image1.png',
  './12_1_image2.png',
  './12_2_idf_FT_VDG.ipynb',
  './12_3_sine_wave_sollicitation.ipynb',
  './12_4_AC_Electrical_circuit_2.ipynb',
  './12_4.png',
  './12_5_Nyquist.ipynb',
  './data_system_ok.npz',
])

pandoc('index.md')
