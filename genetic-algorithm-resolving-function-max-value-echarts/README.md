# 使用遗传算法来求解函数的最大值(使用echarts绘图)

## 效果

<div>
    <label>函数：f(x) = <input id=func value="x + 10 * sin(5 * x) + 7 * cos(4 * x)" style="width: 30em" /></label>
    <br/>
    <label>
        求解范围：<input type=number id=min value=0 style="width: 3em" />
    </label> ~ <input type=number id=max value=9 style="width: 3em" />
    <br/>
    <label>
        求解精度：<input type=number id=length value=17 style="width: 3em" />
    </label>
    <br/>
    <label>
        种群大小：<input type=number id=count value=300 style="width: 3em" />
    </label>
    <br/>
    <label>
        进化轮数：<input type=number id=evolves value=200 style="width: 3em" />
    </label>
    <br/>
    <button id=go type=button>开始求解</button>
    <div id=histories></div>
</div>

## 说明

遗传算法（英语：genetic algorithm (GA) ）是计算数学中用于解决最佳化的搜索算法，是进化算法的一种。进化算法最初是借鉴了进化生物学中的一些现象而发展起来的，这些现象包括遗传、突变、自然选择以及杂交等。

本页面采用的流程比较简单：

- 初始化种群(genPopulation)
- 进化循环：
    - 计算个体适应度(fitness)
    - 自然选择(selection)，其中适应度高的个体存活率高，适应度低的个体以小概率存活
    - 交叉(crossover)和变异(mutation)
- 进化到一定轮数则停止

