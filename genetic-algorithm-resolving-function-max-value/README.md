# 使用遗传算法来求解函数的最大值

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

