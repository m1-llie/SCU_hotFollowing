from urllib.parse import urlencode
import requests
from pyquery import PyQuery as pq
import time
import os
import csv
import json
import datetime
import pymysql
base_url = 'https://m.weibo.cn/api/container/getIndex?'


server = 'cd-cdb-6sbfm2hw.sql.tencentcdb.com'
user = 'root'
password = 'Mrsnow@0'


headers = {
    'Host': 'm.weibo.cn',
    'Referer': 'https://m.weibo.cn/u/2830678474',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
}

def get_page(page,title): #得到页面的请求，params是我们要根据网页填的，就是下图中的Query String里的参数
    params = {
        'containerid': '100103type=1&q='+title,
        'page': page,#page是就是当前处于第几页，是我们要实现翻页必须修改的内容。
        'type':'all',
        'queryVal':title,
        'featurecode':'20000320',
        'luicode':'10000011',
        'lfid':'106003type=1',
        'title':title
    }
    url = base_url + urlencode(params)
    print(url)
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            print(page) 
            return response.json()
    except requests.ConnectionError as e:
        print('Error', e.args)

# 解析接口返回的json字符串
def parse_page(json , label):
    res = []
    if json:
        items = json.get('data').get('cards')
        time = datetime.datetime.fromtimestamp(json.get('data').get('cardlistInfo').get('starttime'))
        for i in items:
            if i == None:
                continue
            url = i.get('scheme')
            item = i.get('mblog')
            if item == None:
                continue
            weibo = {}
            weibo['id'] = item.get('id')
            weibo['label'] = label
            weibo['time'] = time
            weibo['url'] = url
            weibo['text'] = pq(item.get('text')).text().replace(" ", "").replace("\n" , "")
            weibo['comments__count'] = item.get('comments_count')
            weibo['attitudes_count'] = item.get('attitudes_count')
            weibo['reposts_count'] = item.get('reposts_count')
            sql = ("INSERT INTO `20200612`(`id`, `label`, `time`, `url`, `text`, `comments__count`, `attitudes_count`, `reposts_count`)"\
                   "values('%s','%s','%s','%s','%s','%s','%s','%s')" %\
                   (weibo['id'],weibo['label'],weibo['time'],weibo['url'],weibo['text'],weibo['comments__count'],weibo['attitudes_count'],weibo['reposts_count']))
            cursor.execute(sql)
            db.commit()
            res.append(weibo)
            print("插入成功")
    return res

if __name__ == '__main__':
    try:
        db = pymysql.connect(host=server, user=user, password=password, port=62423, db='spider')
        print("连接成功")
    except Exception as e:
        print(e.message)
    cursor = db.cursor()

    title = input("请输入搜索关键词：")
    for page in range(10,20):#循环页面
        try:
            time.sleep(1)         #设置睡眠时间，防止被封号
            json = get_page(page , title )
            results = parse_page(json , title)
            if requests == None:
                continue
            for result in results:
                if result == None:
                    continue
                print(result)
        except TypeError:
            print("完成")
            continue


