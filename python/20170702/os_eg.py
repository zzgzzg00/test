import os
path=os.path.join('d://','workspace','open_m_train')
print(path)
print(os.path.isdir(path),os.path.isfile(path),os.path.exists(path),sep='|')
print(os.listdir(path))
