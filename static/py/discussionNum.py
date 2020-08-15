# -*- coding: utf-8 -*-
import pymysql
import json


def countNum(table):
    # 打开数据库连接
    db = pymysql.connect("cd-cdb-6sbfm2hw.sql.tencentcdb.com", "root", "Mrsnow@0", "spider")
    # 使用cursor()方法创建一个可以执行SQL语句的游标对象cursor
    cursor = db.cursor()

    sql = "SELECT COUNT(*) FROM" + table + "WHERE text like '%川大%'"
    cursor.execute(sql)
    number_row = cursor.fetchone()[0]  # number_row是指定表中包含关键词的记录总条数

    # 关闭数据库连接
    db.close()

    return number_row

if __name__ == "__main__":
    numList = []
    # 根据数据库中数据返回一串结果到本地，以json格式返回给echarts图表
    for day in ["date20200606","date20200607","date20200608","date20200609","date20200610","date20200611","date20200612"]:
        numList.append(countNum(day))
    
    print(numList)
    # json.dumps(numList)
