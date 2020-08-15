# SCU_hotFollowing
云环境下的微博平台川大风评分析系统

01 系统运行思路框图
---------------
![](https://github.com/m1-llie/SCU_hotFollowing/blob/master/readmeIMG/1.png)

02 （伪）创新点
--------------
* [川大](http://www.scu.edu.cn/)相关，受众明确，有针对性</br>
* 基于自然语言处理技术NLP进行词云绘制、情感分析，确定舆论热点关键词，效率、准确率高</br>
* 大屏展示基于响应式网页设计的数据图表，效果直观</br>
* 数据云存储，节省本地资源</br>

03 系统效果展示
------------
主要的大屏展示界面为三个。图表使用[ECharts](https://echarts.baidu.com/theme-builder/zh/index.html)进行设计。</br>
1. 打开系统首页，会自动连接到数据库并刷新数据。设定了每隔10s与后端云数据库进行一次交互，后端如有数据更改，前端这页的图表展示也会变化。</br>
![](https://github.com/m1-llie/SCU_hotFollowing/blob/master/readmeIMG/4.png)</br>
2. 词云图一页中，我们展示了基于云数据库得到的本周新词的信息及它在数据库中出现的次数等；此外，本页还统计了参与讨论的用户数量和对应微博数量。</br>
同样，如果后端数据库的数据更新，那么词云图及右侧排行榜也会变化。</br>
![](https://github.com/m1-llie/SCU_hotFollowing/blob/master/readmeIMG/6.png)</br>
（严正声明：词云图中出现的“川大统领”是误入，与中国成都四川大学无关，狗头emoji护体）
3. 为了实现热点词组相关的微博内容来源的溯源，设计了这最后一个页面：</br>
![](https://github.com/m1-llie/SCU_hotFollowing/blob/master/readmeIMG/5.png)</br>
在这一页中，可以直观地看到与热点词组相关联的微博ID、内容、发博时间等信息，实现URL溯源功能。在前端中可以实现换序功能，如点击第一行的“下移”，前两行的位置会置换；如果点击“导出excel”，管理员能够得到excel表格，将信息下载到本地；此外，还提供了与数据库交互的“增删改查”配套功能，比如在此页中增加一行，数据也会写入到云数据库中。</br>

04 应用程序设计
----------
![](https://github.com/m1-llie/SCU_hotFollowing/blob/master/readmeIMG/7.png)</br>
其中pages是html的代码实现，有三个页面。static的文件夹下是js、css、Python代码的功能性支持——这其中assets放的是引用的既有js库，css是对前端界面的样式设定，img放的是引用到的图片文件，js用于对前端操作的响应，py代码实现了前端与后端数据库的连接、其他后端功能的实现等等。</br>
* 在index.html界面中，我们将展示从微博平台的“川大”相关微博内容分析后的结果，包括川大舆情量、本周热门联想词、整体风评走向、整体情感分析、参与讨论用户地域分布、参与账户注册时长等信息。</br>
* 在map2d.html界面中，我们把川大目前TOP关联词制作成了词语图（与上个界面相同，同样把数据从云数据库中读取出来，然后以json格式传入echarts图表中），并将排名前五的舆论热点词及参与讨论用户数、相关微博数以表格形式展示出来。</br>
* 在globe3d.html界面中，我们展示了最热门关键词及对应的微博内容、发博用户、微博对应URL，做到根据热点反溯源其界面。在本页面中，管理员除了对数据库进行“查看”，还可以增添信息、修改信息，与数据库深度交互。

05 数据库设计
--------------
首先介绍一下EER图：</br>
![](https://github.com/m1-llie/SCU_hotFollowing/blob/master/readmeIMG/2.png)</br>
在上面的ERR概念模型到逻辑模型最后到物理模型，如下所示：</br>
![](https://github.com/m1-llie/SCU_hotFollowing/blob/master/readmeIMG/3.png)</br>
