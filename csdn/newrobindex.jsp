<%@ page import="com.qunar.common.admin.constant.WebConstants" %>
<%@ page import="com.qunar.train.hcs.qm.constant.RobAgentEnum" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>订单统计</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <% final String PATH = WebConstants.PATH; %>
    <c:set var="PATH" value="<%=PATH%>"/>
    <link type="text/css" rel="stylesheet"
        href="http://qunarzz.com/train_tts/prd/styles/admin/common@<jsp:include page="/ver/styles/admin/common.css.ver" flush="true"/>.css"/>
    <link type="text/css" rel="stylesheet"
        href="http://qunarzz.com/train_tts/prd/styles/admin/ui_admin@<jsp:include page="/ver/styles/admin/ui_admin.css.ver" flush="true"/>.css"/>
    <link type="text/css" rel="stylesheet"
        href="http://qunarzz.com/train_tts/prd/styles/admin/qdatepicker@<jsp:include page="/ver/styles/admin/qdatepicker.css.ver" flush="true"/>.css"/>
    <link type="text/css" rel="stylesheet"
        href="${PATH}resources/css/jquery-ui-1.8.13.custom.css"/>
    <!--
    <link type="text/css" rel="stylesheet"
          href="http://qunarzz.com/train_tts/prd/styles/admin/common@dev.css"/>
    <link type="text/css" rel="stylesheet"
          href="http://qunarzz.com/train_tts/prd/styles/admin/ui_admin@dev.css"/>
    <link type="text/css" rel="stylesheet"
          href="http://qunarzz.com/train_tts/prd/styles/admin/qdatepicker@dev.css"/>
    <link type="text/css" rel="stylesheet"
           href="http://l-trainhcs.qm1.t.cn6.qunar.com:9001/resources/css/jquery-ui-1.8.13.custom.css"/>
    -->
    <style type="text/css">
        .content {
            float: none;
            clear: both;
            width: 98%;
            margin: 5px;
            background: none;
        }

        .content .gray_box {
            background: #e7f5fe;
            border-top: #cae4f7 1px solid;
            border-bottom: #cae4f7 1px solid;
        }

        .order_list .gay_bg {
            background: #ecf7fe;
        }

        .title h3 {
            border: #cae4f7 1px solid;
            border-top: 0px;
            color: #077AC7;
        }

        .content .white_box {
            border: #cae4f7 1px solid;
        }

        .order_list {
            border: #cae4f7 1px solid;
        }

        .order_list td {
            border-top: #cae4f7 1px solid;
            border-bottom: #cae4f7 1px solid;
        }

        .order_list .c1 {
            width: 185px;
            text-align: center;
        }

        .order_list .c2 {
            width: 64px;
        }

        .order_list .c3 {
            width: 95px;
        }

        .order_list .c4 {
            width: 64px;
        }

        .order_list .c5 {
            width: 102px;
        }

        .order_list .c6 {
            width: 110px;
        }
        .oderAdmin{
            margin:18px 32px 0;
        }
        .checks input{
            vertical-align: middle;
        }
        .search,.export{
            font-size: 14px;
            padding: 2px 10px;
            border: 1px solid currentColor;
        }
        .search{
            float: right;
            margin-right: 5px;
        }
        .export{
            float: left;
            margin-left: 5px;
        }
        .disabled{
            color: lightgray;
        }
        .disabled:hover{
            color: lightgray;
        }
    </style>
</head>
<body>
<div class="content">
    <div class="gray_box">
        <div class="title">
            <h3>订单统计</h3>
        </div>
        <div class="white_box">
            <form method="post" id="orderForm" action="${PATH}stat/robIndex.htm">
                <table cellspacing="0" cellpadding="0" class="oderAdmin">
                    <tbody>
                    <tr style="position:relative; z-index:10;">
                        <td class="c1">开始时间：</td>
                        <td class="c2">
                            <input
                                id="startTime"
                                name="startTime"
                                type="text"
                                class="textInputN"
                                value="2017-05-10"
                            />
                        </td>
                        <td class="c1">结束时间：</td>
                        <td colspan="3" class="c2">
                            <input
                                id="endTime"
                                name="endTime"
                                type="text"
                                class="textInputN"
                                value="2017-05-11"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="c1">业务类型：</td>
                        <td colspan="3" class="c2 checks">
                            <input
                                type="checkbox"
                                name="busstype"
                                value="hascount"
                                id="hascount"
                                checked
                            />
                            <label for="hascount">有账号</label>
                            <input
                                type="checkbox"
                                name="busstype"
                                value="nocount"
                                id="nocount"
                                checked
                            />
                            <label for="nocount">无账号</label>
                            <input
                                type="checkbox"
                                name="busstype"
                                value="manydate"
                                id="manydate"
                                checked
                            />
                            <label for="manydate">多日期</label>
                            <input
                                type="checkbox"
                                name="busstype"
                                value="manycar"
                                id="manycar"
                                checked
                            />
                            <label for="manycar">多车次</label>
                            <input
                                type="checkbox"
                                name="busstype"
                                value="manysear"
                                id="manysear"
                                checked
                            />
                            <label for="manysear">多坐席</label>
                            <input
                                type="checkbox"
                                name="busstype"
                                value="rob"
                                id="rob"
                                checked
                            />
                            <label for="rob">信用抢</label>
                        </td>
                    <tr>
                        <td class="c1">统计周期：</td>
                        <td>
                            <select name="count">
                                <option value="day">天</option>
                                <option value="week">周</option>
                                <option value="month" >月</option>
                            </select>
                        </td>
                        <td class="c1">统计维度：</td>
                        <td>
                            <select name="count">
                                <option value="day">发车时间</option>
                                <option value="week">订单时间</option>
                            </select>
                        </td>
                        <td class="c1">统计渠道：</td>
                        <td>
                            <select name="count">
                                <option value="day">全球</option>
                                <option value="week">去哪儿</option>
                                <option value="week">携程</option>
                            </select>
                        </td>
                        <td>
                            <input
                                style="margin-left: 10px;"
                                type="email"
                                placeholder="请输入邮箱"
                                id="email"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="c1"></td>
                        <td class="c2"></td>
                        <td class="c1"></td>
                        <td class="c2">
                            <a
                                href="#"
                                class="button search"
                                id="search">
                                    <em><em>搜索</em></em>
                            </a>
                        </td>
                        <td class="c1">
                            <a
                                download=""
                                class="button export"
                                id="export"
                                href="">
                                    <em><em>导出</em></em>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            <table cellspacing="0" cellpadding="0" class="oderAdmin">
            </table>
        </div>
    </div>
    <div class="gray_box mt10">
        <div class="title">
            <h3>订单时间</h3>
        </div>
        <table border="0" cellspacing="0" cellpadding="0" class="order_list" id="tb">
            <tr role="head">
                <th class="c2">日期</th>
                <th class="c2">生单单数</th>
                <th class="c2">出票单数</th>
                <th class="c2">预约单数</th>
                <th class="c2">超时取消</th>
                <th class="c2">客观原因未抢到</th>
                <th class="c2">生单张数</th>
                <th class="c2">支付张数</th>
                <th class="c2">出票张数</th>
                <th class="c2">取消率</th>
                <th class="c2">出票率</th>
                <th class="c2">支付率</th>
                <th class="c2">抢票成功率</th>
                <th class="c2">出套餐金额</th>
                <th class="c2">退套餐金额</th>
                <th class="c2">单票收入</th>
                <th class="c2">扣位时间</th>
                <th class="c2">支付-取消时长</th>
                <th class="c2">取消-发车时长</th>
            </tr>
            <tr>
                <td colspan="17">
                    没有符合条件的记录
                </td>
            </tr>
            <tr class="gay_bg">
                <td class="c2">2017-05-11</td>
                <td class="c2">100</td>
                <td class="c2">50</td>
                <td class="c2">50</td>
                <td class="c2">200</td>
                <td class="c2">40</td>
                <td class="c2">50</td>
                <td class="c2">40</td>
                <td class="c2">50</td>
                <td class="c2">20</td>
                <td class="c2">20</td>
                <td class="c2">40</td>
                <td class="c2">30</td>
                <td class="c2">40</td>
                <td class="c2">40</td>
                <td class="c2">50</td>
                <td class="c2">2017-05-05</td>
                <td class="c2">01:20</td>
                <td class="c2">02:20</td>
            </tr>
        </table>
    </div>
</div>
<script src="http://qunarzz.com/js/jquery/build/jquery-1.5.2.min.js"></script>
<script src="http://l-trainhcs.qm1.t.cn6.qunar.com:9001/resources/js/plugins/jquery-ui.js"></script>
<script>
    var CONFIG={
        'duration':60
    }
</script>
<script>
    $(function () {
        var ONE_DAY_MILL=24*3600*1000;
        var maxDay=new Date((new Date()-ONE_DAY_MILL));
        var minDay=new Date(maxDay-CONFIG.duration*ONE_DAY_MILL);
        var buttonsState={
            'search':true,
            'export':true
        }
        var dateSet={
            dateFormat:'yy-mm-dd',
            minDate:minDay,
            maxDate:maxDay
        }
        $("#startTime").datepicker(dateSet);
        $("#endTime").datepicker(dateSet);
        $("#search").click(function (e) {
            e.preventDefault();
            if(buttonsState['search']){
                if(check()){
                    disabledButton($(this),'search');
                    $('orderForm').submit();
                }
            }
        });
        $('#export').click(function(e){
            if(!buttonsState['export']){
                e.preventDefault();
                return false;
            }
            disabledButton($(this),'export');
        });
        function enableButton($dom,stateKey){
            $dom.removeClass('disabled');
            buttonsState[stateKey]=true;
        }
        function disabledButton($dom,stateKey){
            $dom.addClass('disabled');
            buttonsState[stateKey]=false;
            window.setTimeout(function(){
                enableButton($dom,stateKey);
            },3000);
        }
        if (!String.prototype.trim)
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, '')
            };

        var parseDate = function (x) {
            x = x.trim();
            if (x = x.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))
                return new Date(x[1], x[2] - 1, x[3]);
            if (/^\d{8,14}$/.test(x))
                return new Date(x.slice(0, 4), x.slice(4, 6) - 1, x.slice(6, 8));
            return null;
        }
        var emailReg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var email=document.getElementById('email');
        function check() {
            var end = parseDate($('#endTime').val()), start = parseDate($('#startTime').val());
            if(end < start){
                alert('开始时间不得晚于结束时间');
                return false;
            }
            var emailValue=email.value.trim();
            if(emailValue.length>0 && !emailReg.test(emailValue)){
                alert('邮箱格式不正确');
                return false;
            }
            return true;
        }
    });
</script>
</body>
</html>