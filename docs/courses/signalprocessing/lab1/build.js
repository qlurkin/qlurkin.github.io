import { pandoc, make_zip, strip_ipynb } from 'build_lib'

const notebooks = [
  './1_Dynamic Systems.ipynb',
  './1_1_FT_Manipulation.ipynb',
  './1_2_idf_FT_VDG.ipynb',
  './1_3_sine_wave_sollicitation.ipynb',
  './1_4_AC_Electrical_circuit_2.ipynb',
  './1_5_Nyquist.ipynb',
  './presentation.ipynb',
]

notebooks.forEach(strip_ipynb)

make_zip(
  'lab1.zip',
  notebooks.concat([
    './1_image1.png',
    './1_image2.png',
    './1_image3.png',
    './1_image4.png',
    './1_1_image1.png',
    './1_1_image2.png',
    './1_4.png',
    './data_system_ok.npz',
    './linear_sim_result.svg',
    './pole_zero_map.svg',
    './pole_zero_map_2.svg',
    './step_response_model_system.svg',
    './bode_diagram.svg',
    './steady_state_response.svg',
    './linear_sim_result_2.svg',
    './steady_state_response_one_period.svg',
    './bode_diagram_2.svg',
    './current_inrush_response.svg',
    './step_response.svg',
    './nyquist_plot.svg',
    './convolution_and_laplace.png',
  ]),
)

pandoc('index.md')
