import sys
import pandas as pd #加载pandas
from snownlp import sentiment #加载情感分析模块
from snownlp import SnowNLP


text=pd.read_excel(u'D:/自然语言处理/川大相关微博内容.xlsx',header=0) # 读取文本数据
text0=text.iloc[:,0] # 提取所有数据 
text1=[i.decode('utf-8') for i in text0] # 上一步提取数据不是字符而是object，所以在这一步进行转码为字符

#对语料库进行训练，把路径改成相应的位置
sentiment.train('D:/Anaconda3/Lib/site-packages/snownlp/sentiment/neg.txt', 'D:/Anaconda3/Lib/site-packages/snownlp/sentiment/pos.txt') 
#这一步是对上一步的训练结果进行保存，如果以后语料库没有改变，下次不用再进行训练
sentiment.save('D:/pyscript/sentiment.marshal')

senti = [SnowNLP(i).sentiments for i in text1]  #遍历每条评论进行预测

newsenti = []
for i in senti:
    if (i>=0.6):
        newsenti.append(1)
    else:
        newsenti.append(-1)
text['predict'] = newsenti #将新的预测标签增加为text的某一列，所以现在text的第0列为评论文本，第1列为实际标签，第2列为预测标签
counts = 0
for j in range(len(text.iloc[:,0])):  #遍历所有标签，将预测标签和实际标签进行比较，相同则判断正确。
    if text.iloc[j,2] == text.iloc[j,1]:
        counts+=1
print("准确率为:%f", (float(counts)/float(len(text)))) #输出本次预测的准确率
