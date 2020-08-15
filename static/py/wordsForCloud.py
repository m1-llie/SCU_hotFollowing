# -*- coding: utf-8 -*-
import pymysql
import json


def countNum(string):
    # 打开数据库连接
    db = pymysql.connect("cd-cdb-6sbfm2hw.sql.tencentcdb.com", "root", "Mrsnow@0", "spider")
    # 使用cursor()方法创建一个可以执行SQL语句的游标对象cursor
    cursor = db.cursor()

    # 确定建多少个txt
    sql = "SELECT COUNT(*) FROM date20200610 WHERE text like '%"+ string +"%'"
    cursor.execute(sql)
    number_row = cursor.fetchone()[0]  # number_row是指定表中包含关键词的记录总条数

    # 关闭数据库连接
    db.close()

    return number_row

if __name__ == "__main__":
    numList = []
    # 根据数据库中数据返回一串结果到本地，以json格式返回给echarts图表
    for word in ["川大","强基","毕业","江安","成都","研究"]:
        numList.append(countNum(word))
    
    json.dumps(numList)
