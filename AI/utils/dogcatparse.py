from xml.etree import ElementTree
import os
import shutil


Paths = os.listdir('./annotations/xmls')
print(Paths)

for path in Paths:

    tree = ElementTree.parse('./annotations/xmls/'+path)
    FileName = path.split('.')[0]
    textFileName = FileName+'.txt'
    imgFileName = FileName + '.jpg'
    # print(filename)
    #
    iter_element = tree.iter(tag="size") # 이미지파일의 size를 가져온다
    width = 0
    height = 0
    for element in iter_element:
        width = element.find("width").text
        height = element.find("height").text

    width = int(width)
    height = int(height)
    # print(width,height)

    label =0

    checkdog = 0
    checkcat = 0
    iter_element = tree.iter(tag="object")  # 마스크레이블링 지역을 가져온다.
    f = open('./train/labels/'+textFileName, mode='wt', encoding='utf-8')

    for idx,element in enumerate(iter_element): # animal태그를 순회합니다
        if idx != 0:
            f.write('\n')
        name = element.find("name").text
        print('name',name)
        if name == 'dog' and checkdog<200:
            label = 4
            xmin = element.find("bndbox").find("xmin").text
            ymin = element.find("bndbox").find("ymin").text
            xmax = element.find("bndbox").find("xmax").text
            ymax = element.find("bndbox").find("ymax").text
            xmin = int(xmin)
            ymin = int(ymin)
            xmax = int(xmax)
            ymax = int(ymax)
            print(label,((xmin+xmax)/2)/width,((ymin+ymax)/2)/height,abs(xmax-xmin)/width,abs(ymax-ymin)/height)
            data = str(label) + ' ' + str(((xmin+xmax)/2)/width) + ' ' + str(((ymin+ymax)/2)/height) + ' ' + \
                   str(abs(xmax-xmin)/width) + ' ' + str(abs(ymax-ymin)/height)
            f.write(data)
            checkdog +=1
        if name == 'cat' and checkcat<200:
            label = 5
            xmin = element.find("bndbox").find("xmin").text
            ymin = element.find("bndbox").find("ymin").text
            xmax = element.find("bndbox").find("xmax").text
            ymax = element.find("bndbox").find("ymax").text
            xmin = int(xmin)
            ymin = int(ymin)
            xmax = int(xmax)
            ymax = int(ymax)
            print(label, ((xmin + xmax) / 2) / width, ((ymin + ymax) / 2) / height, abs(xmax - xmin) / width,
                  abs(ymax - ymin) / height)
            data = str(label) + ' ' + str(((xmin + xmax) / 2) / width) + ' ' + str(
                ((ymin + ymax) / 2) / height) + ' ' + \
                   str(abs(xmax - xmin) / width) + ' ' + str(abs(ymax - ymin) / height)
            f.write(data)
            checkcat +=1
        if checkcat>=200 and checkcat>=200:
            f.close()
            break
        f.close()
        shutil.copyfile('./images/'+imgFileName,'./train/images/'+imgFileName)

    # print(animals) # 결과를 출력한다