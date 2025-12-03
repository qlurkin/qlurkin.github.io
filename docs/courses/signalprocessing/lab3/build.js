import {pandoc, make_zip} from 'build_lib'

make_zip("lab3.zip", [
    '2_2_2_2.svg',
    '2_2_2.svg',
    '2_2_4.svg',
    '2_2_5.svg',
    '3_1_sound.ipynb',
    '3_2-01_2022_Exam.ipynb',
    '3_3_1.svg',
    '3_3_3.svg',
    '3_3_5.svg',
    '3_3_6.svg',
    '3_3-08_2022_Exam.ipynb',
    'Data_Signal_2.npz',
    'Signal.npz',
    'White_Noise_8192Hz.npz',
])

pandoc('index.md')