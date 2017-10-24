# `typeof` 运算符的优先级

先来猜一猜：`typeof 1/0` 的结果是什么？
<br/>
👇下方有答案👇
<br/>
<div style="height:80vh"></div>
<br/>
<br/>
<br/>
<br/>
<br/>
<b>揭晓答案：</b>
`typeof` 是一个一元运算符，其优先级比大多二元运算符的优先级要高：
`typeof 1/0` 的结果并不是 `'number'`， 而是 `'NaN'`.

不信，请打开F12看看控制台~

<br/>


**附：** js中完整的[运算符优先级表](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)：

<table class="fullwidth-table">
 <tbody>
  <tr>
   <th>优先级</th>
   <th>运算类型</th>
   <th>关联性</th>
   <th>运算符</th>
  </tr>
  <tr>
   <td>20</td>
   <td><a title="圆括号运算符( )&nbsp;用来控制表达式中的运算优先级." href="/zh-CN/docs/Web/JavaScript/Reference/Operators/Grouping"><code>圆括号</code></a></td>
   <td>n/a</td>
   <td><code>( … )</code></td>
  </tr>
  <tr>
   <td rowspan="4">19</td>
   <td><a title="属性访问器提供了两种方式用于访问一个对象的属性，它们分别是点符号和括号。" href="/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors#点符号表示法"><code>成员访问</code></a></td>
   <td>从左到右</td>
   <td><code>… . …</code></td>
  </tr>
  <tr>
   <td><a title="属性访问器提供了两种方式用于访问一个对象的属性，它们分别是点符号和括号。" href="/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors#括号表示法"><code>需计算的成员访问</code></a></td>
   <td>从左到右</td>
   <td><code>… [ … ]</code></td>
  </tr>
  <tr>
   <td><a title="new&nbsp;运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一。" href="/zh-CN/docs/Web/JavaScript/Reference/Operators/new"><code>new</code></a> (带参数列表)</td>
   <td>n/a</td>
   <td><code>new … ( … )</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Special_Operators/function_call" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions">函数调用</a></td>
   <td>从左到右</td>
   <td><code>… (&nbsp;<var>…&nbsp;</var>)</code></td>
  </tr>
  <tr>
   <td rowspan="1">18</td>
   <td><a title="JavaScript/Reference/Operators/Special_Operators/new_Operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new">new</a>&nbsp;(无参数列表)</td>
   <td>从右到左</td>
   <td><code>new …</code></td>
  </tr>
  <tr>
   <td rowspan="2">17</td>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment">后置递增</a>(运算符在后)</td>
   <td>n/a</td>
   <td><code>… ++</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Decrement">后置递减</a>(运算符在后)</td>
   <td>n/a</td>
   <td><code>… --</code></td>
  </tr>
  <tr>
   <td rowspan="9">16</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_NOT">逻辑非</a></td>
   <td>从右到左</td>
   <td><code>! …</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Bitwise_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT">按位非</a></td>
   <td>从右到左</td>
   <td><code>~ …</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus">一元加法</a></td>
   <td>从右到左</td>
   <td><code>+ …</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_negation">一元减法</a></td>
   <td>从右到左</td>
   <td><code>- …</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment">前置递增</a></td>
   <td>从右到左</td>
   <td><code>++ …</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Decrement">前置递减</a></td>
   <td>从右到左</td>
   <td><code>-- …</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Special_Operators/typeof_Operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a></td>
   <td>从右到左</td>
   <td><code>typeof …</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Special_Operators/void_Operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void">void</a></td>
   <td>从右到左</td>
   <td><code>void …</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Special_Operators/delete_Operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete">delete</a></td>
   <td>从右到左</td>
   <td><code>delete …</code></td>
  </tr>
  <tr>
   <td>15</td>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation">幂</a></td>
   <td>从右到左</td>
   <td><code>…&nbsp;**&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="3">14</td>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Multiplication">乘法</a></td>
   <td>从左到右</td>
   <td><code>… *&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Division">除法</a></td>
   <td>从左到右</td>
   <td><code>… /&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder">取模</a></td>
   <td>从左到右</td>
   <td><code>… %&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="2">13</td>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Addition">加法</a></td>
   <td>从左到右</td>
   <td><code>… +&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Arithmetic_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Subtraction">减法</a></td>
   <td>从左到右</td>
   <td><code>… -&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="3">12</td>
   <td><a title="JavaScript/Reference/Operators/Bitwise_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">按位左移</a></td>
   <td>从左到右</td>
   <td><code>… &lt;&lt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Bitwise_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">按位右移</a></td>
   <td>从左到右</td>
   <td><code>… &gt;&gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Bitwise_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">无符号右移</a></td>
   <td>从左到右</td>
   <td><code>… &gt;&gt;&gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="6">11</td>
   <td><a title="JavaScript/Reference/Operators/Comparison_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Less_than_operator">小于</a></td>
   <td>从左到右</td>
   <td><code>… &lt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Comparison_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Less_than__or_equal_operator">小于等于</a></td>
   <td>从左到右</td>
   <td><code>… &lt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Comparison_Operators" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Greater_than_operator">大于</a></td>
   <td>从左到右</td>
   <td><code>… &gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Comparison_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Greater_than_or_equal_operator">大于等于</a></td>
   <td>从左到右</td>
   <td><code>… &gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Special_Operators/in_Operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in">in</a></td>
   <td>从左到右</td>
   <td><code>… in&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Special_Operators/instanceof_Operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof">instanceof</a></td>
   <td>从左到右</td>
   <td><code>… instanceof&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="4">10</td>
   <td><a title="JavaScript/Reference/Operators/Comparison_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality">等号</a></td>
   <td>从左到右</td>
   <td><code>… ==&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Comparison_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Inequality">非等号</a></td>
   <td>从左到右</td>
   <td><code>… !=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Comparison_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity">全等号</a></td>
   <td>从左到右</td>
   <td><code>… ===&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/Comparison_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Nonidentity">非全等号</a></td>
   <td>从左到右</td>
   <td><code>… !==&nbsp;…</code></td>
  </tr>
  <tr>
   <td>9</td>
   <td><a title="JavaScript/Reference/Operators/Bitwise_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND">按位与</a></td>
   <td>从左到右</td>
   <td><code>… &amp;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>8</td>
   <td><a title="JavaScript/Reference/Operators/Bitwise_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR">按位异或</a></td>
   <td>从左到右</td>
   <td><code>… ^&nbsp;…</code></td>
  </tr>
  <tr>
   <td>7</td>
   <td><a title="JavaScript/Reference/Operators/Bitwise_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_OR">按位或</a></td>
   <td>从左到右</td>
   <td><code>… |&nbsp;…</code></td>
  </tr>
  <tr>
   <td>6</td>
   <td><a title="JavaScript/Reference/Operators/Logical_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_AND">逻辑与</a></td>
   <td>从左到右</td>
   <td><code>… &amp;&amp;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>5</td>
   <td><a title="JavaScript/Reference/Operators/Logical_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_OR">逻辑或</a></td>
   <td>从左到右</td>
   <td><code>… ||&nbsp;…</code></td>
  </tr>
  <tr>
   <td>4</td>
   <td><a title="JavaScript/Reference/Operators/Special_Operators/Conditional_Operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator">条件运算符</a></td>
   <td>从右到左</td>
   <td><code>… ? … : …</code></td>
  </tr>
  <tr>
   <td rowspan="12">3</td>
   <td rowspan="12"><a title="JavaScript/Reference/Operators/Assignment_Operators" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators">赋值</a></td>
   <td rowspan="12">从右到左</td>
   <td><code>… =&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… +=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… -=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… *=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… /=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… %=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &lt;&lt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &gt;&gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &gt;&gt;&gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &amp;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… ^=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… |=&nbsp;…</code></td>
  </tr>
  <tr>
   <td colspan="1" rowspan="2">2</td>
   <td><a title="JavaScript/Reference/Operators/yield" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield">yield</a></td>
   <td>从右到左</td>
   <td><code>yield&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a title="JavaScript/Reference/Operators/yield" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*">yield*</a></td>
   <td>从右到左</td>
   <td><code>yield*&nbsp;…</code></td>
  </tr>
  <tr>
   <td>1</td>
   <td><a title="JavaScript/Reference/Operators/Spread_operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator">展开运算符</a></td>
   <td>n/a</td>
   <td><code>...</code>&nbsp;…</td>
  </tr>
  <tr>
   <td>0</td>
   <td><a title="JavaScript/Reference/Operators/Comma_Operator" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comma_Operator">逗号</a></td>
   <td>从左到右</td>
   <td><code>… ,&nbsp;…</code></td>
  </tr>
 </tbody>
</table>
